import { useState } from "react";
import axios from "axios";

export default function CreateBot () {
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [zone, setZone] = useState('');
    const bots = async() => {
        try{
            await axios.post('http://localhost:3000/bots', {
            location: {
                dropoff_lat: lat,
                dropoff_lon: lon
            },
            zone_id: zone
           });
           alert('Your Kiwi is up and ready to go!')
        } catch(err){
            console.log(err)
        }
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
        if(!lat || !lon || !zone){
           return alert('You must complete the form')
        }
        bots()
    }
    return ( 
        <div>
            <label htmlFor="">Enter a latitud coordinate</label>
            <input onChange={handleChangeLat} value={lat} type="number" placeholder='Ex: 38.8951'/>
            <label htmlFor="">Enter a longitude coordinate</label>
            <input onChange={handleChangeLon} value={lon} type="number" placeholder='Ex: -77.0364'/>
            <label htmlFor="">Place a zone</label>
            <input onChange={handleChangeZone} value={zone} type="text" placeholder='Ex: 742 Evergreen Terrace'/>
            <button onClick={handleClick}>Create a Kiwi</button>
        </div>
     );
}