import React, { useEffect, useState } from "react"
import './App.scss';
import DialogBlock from "./components/Dialog"
import Map from "./components/Map"
import axios from "axios";

function App() {
  const [Ip, setIp] = useState("")
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [items, setItems] = useState();

  useEffect(() => {
      axios.get('https://geolocation-db.com/json/')
            .then(res => {
              setIp(res.data.IPv4)
            })
            .catch(e => {
              setOpenError(true)
            })
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenSecond = () => {
    setOpenSecond(true);
    axios.get('https://dev-sso.transparenterra.com/api/location-list')
      .then(res => {
        setItems(res.data.data.filter(item => item.ip == Ip))
      })
      .catch(e => {
        setOpenError(true)
      })
  };

  const handleCloseSecond = () => {
    setOpenSecond(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const saveMarkers = (newMarkerCoords) => {
    setDataArr(newMarkerCoords);
  };

  const onSave = () => {
    axios.post('https://dev-sso.transparenterra.com/api/save-location', {ip: Ip, coord_x: dataArr[0], coord_y: dataArr[1]})
      .then(res => {
        console.log(res)
      }).catch(e => {
        setOpenError(true)
      })
    setOpen(false)
    setDataArr([])
  }

  return (
    <div className="mainWrapper">
      <div className='buttonsBlock'>
        <button onClick={handleClickOpen}>Open map</button>
        <button onClick={handleClickOpenSecond}>Show locations</button>
      </div>
      <DialogBlock open={open} handleClose={handleClose} onButtonClick={onSave} title={"Transparenterra community map"} buttonText="Save">
        <Map saveMarkers={saveMarkers}/>
      </DialogBlock>
      <DialogBlock open={openSecond} handleClose={handleCloseSecond} onButtonClick={onSave} title={"List of locations"}>
        {items ?
            <table>
            <tr>
              <th align="left">Ip</th>
              <th align="left">Coord_x</th>
              <th align="left">Coord_y</th>
            </tr>
            {items.map(item => {
              return(
                <tr>
              <td>{item.ip}</td>
              <td>{item.coord_x.substr(0, 6)}</td>
              <td>{item.coord_y.substr(0, 6)}</td>
            </tr>
              )
            })}
          </table> :
          <div className="emptyContent">
            <p>Empty</p>
          </div>
          }
      </DialogBlock>
      <DialogBlock open={openError} handleClose={handleCloseError} onButtonClick={handleCloseError} title={"Error"} buttonText="Ok">
          <div className="emptyContent">
            <p>Something went wrong try again</p>
          </div>
      </DialogBlock>
    </div>
  );
}

export default App;
