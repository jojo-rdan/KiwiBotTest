import { useState } from "react";
import axios from "axios";
import styles from "../styles/CreateDelivery.module.css"

export default function CreateDelivery ({list}) {
    const [latPick, setLatPick] = useState(0);
    const [lonPick, setLonPick] = useState(0);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [zone, setZone] = useState('');
    const delivery = async() => {
        try{
            await axios.post('http://localhost:3001/delivery', {
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
        <div className={styles.form}>
            <label htmlFor="">Enter a latitud pickup coordinate:</label>
            <input className={styles.input} onChange={handleChangeLatPick} value={latPick} type="number" placeholder='Ex: 38.8951'/>
            <br />
            <label htmlFor="">Enter a longitude pickup coordinate:</label>
            <input className={styles.input} onChange={handleChangeLonPick} value={lonPick} type="number" placeholder='Ex: -77.0364'/>
            <br />
            <label htmlFor="">Enter a latitud dropoff coordinate:</label>
            <input className={styles.input} onChange={handleChangeLat} value={lat} type="number" placeholder='Ex: 38.8951'/>
            <br />
            <label htmlFor="">Enter a longitude dropoff coordinate:</label>
            <br />
            <input className={styles.input} onChange={handleChangeLon} value={lon} type="number" placeholder='Ex: -77.0364'/>
            <br />
            <label htmlFor="">Place a zone:</label>
            <input className={styles.input} onChange={handleChangeZone} value={zone} type="text" placeholder='Ex: 742 Evergreen Terrace'/>
            <button className={styles.btn} onClick={handleClick}>Create a Delivery</button>
        </div>
     );
}