import { useState, useEffect } from 'react';
import axios from 'axios';
import BotAssign from './BotAssign';
import CreateDelivery from './CreateDelivery';
import styles from '../styles/DeliveryList.module.css';

export default function DeliveryList () {
    const [lists, setList] = useState([]);
    const [filter, setFilter] = useState('');
    const [delayed, setDelayed] = useState({});
    const list = async()=> {
        try{
            let list  = await axios.get('http://localhost:3000/delivery');
            let dataList = list.data;
            setList(dataList);
        } catch(err){
            console.log(err)
        }
    }
    useEffect(() =>{
        const interval = setInterval( async() => {
            const newDelay = {...delayed};
            for (const list of lists) {
                if(list.state === 'pending' && Number(Date.now().toString()) - Date.parse(list.creation_date) > 300000){
                    newDelay[list.id] = true;
                }
            }
            setDelayed(newDelay);
        }, 10000);
        return function(){
            clearInterval(interval);
        }
    },[lists])
    useEffect(() =>{
        list();
    }, [])
    const handleClick = () =>{
        lists.reverse();
        setList([...lists]);
    }
    const handleChange = (e)=>{
        setFilter(e.target.value);
    }
    const cleanDelay = (id)=>{
        const newDelay = {...delayed};
        delete newDelay[id];
        setDelayed(newDelay)
    }
    return ( 
        <div>
            <CreateDelivery list={list}/>
            <h2>Orders</h2>
            <button onClick={handleClick}>Order by date</button>
            <label htmlFor="state">Filter by...</label>
            <select onChange={handleChange} name="" id="state">
                <option value="" selected></option>
                <option value="pending">Pending</option>
                <option value="assigned">Assigned</option>
                <option value="in_transit">In Transit</option>
                <option value="delivered">Delivered</option>
            </select>
            <ul className={styles.ulStl}>
                {
                    lists?.filter(e => {
                        if(!filter){
                            return e;
                        }
                        else{
                            return e.state === filter;
                        }
                    }).map((e) => (
                        <>
                        <li> Date: {e.creation_date} - Id: {e.id} State: {e.state}</li>
                        <BotAssign cleaner={cleanDelay} state={e.state} list={list} id={e.id}/>
                        {delayed[e.id] && <p className={styles.warning}>Delayed Delivery</p>}
                        </>
                    ))
                }
            </ul>
        </div>
     );
}