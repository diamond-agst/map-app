import React from "react"
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import L from "leaflet";

const position = [51.505, -0.09]

const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
  });
  
function MyComponent({ saveMarkers }) {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], { icon }).addTo(map);
        saveMarkers([lat, lng]);
      }
    });
    return null;
}

const Map = ({saveMarkers}) => {
    return(
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent saveMarkers={saveMarkers} />
        </MapContainer>
    )
}

export default Map;