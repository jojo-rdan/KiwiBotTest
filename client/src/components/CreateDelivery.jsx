import { useState } from "react";
import axios from "axios";

export default function CreateDelivery ({list}) {
    const [latPick, setLatPick] = useState(0);
    const [lonPick, setLonPick] = useState(0);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [zone, setZone] = useState('');
    const delivery = async() => {
        try{
            await axios.post('http://localhost:3000/delivery', {
            pickup: {
                pickup_lat: latPick,
                pickup_lon: lonPick
            },
           dropoff: {
                dropoff_lat: lat,
                dropoff_lon: lon
            },
            zone_id: zone
           });
           list();
           alert('Your delivery is created!')
        } catch(err){
            console.log(err)
        }
    }
    const handleChangeLatPick = (e) =>{
        setLatPick(Number(e.target.value));
    }
    const handleChangeLonPick = (e) =>{
        setLonPick(Number(e.target.value));
    }
    const handleChangeLat = (e) =>{
        setLat(Number(e.target.value));
    }
    const handleChangeLon = (e) =>{
        setLon(Number(e.target.value));
    }
    const handleChangeZone = (e) =>{
        setZone(e.target.value)
    }
    const handleClick = () =>{
        if(!lat || !lon || !latPick || !lonPick || !zone){
           return alert('You must complete the form')
        }
        delivery();
    }
    return ( 
        <div>
            <label htmlFor="">Enter a latitud pickup coordinate</label>
            <input onChange={handleChangeLatPick} value={latPick} type="number" placeholder='Ex: 38.8951'/>
            <label htmlFor="">Enter a longitude pickup coordinate</label>
            <input onChange={handleChangeLonPick} value={lonPick} type="number" placeholder='Ex: -77.0364'/>
            <label htmlFor="">Enter a latitud dropoff coordinate</label>
            <input onChange={handleChangeLat} value={lat} type="number" placeholder='Ex: 38.8951'/>
            <label htmlFor="">Enter a longitude dropoff coordinate</label>
            <input onChange={handleChangeLon} value={lon} type="number" placeholder='Ex: -77.0364'/>
            <label htmlFor="">Place a zone</label>
            <input onChange={handleChangeZone} value={zone} type="text" placeholder='Ex: 742 Evergreen Terrace'/>
            <button onClick={handleClick}>Create a Delivery</button>
        </div>
     );
}