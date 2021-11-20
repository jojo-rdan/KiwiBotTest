import axios from 'axios';
import styles from '../styles/CreateBot.module.css'

export default function BotAssign ({id, list, state, cleaner}) {
    const assignBot = async()=> {
        try{
            const action = state === 'pending' ? 'bot' : 'delivery';
            await axios.put(`http://localhost:3000/delivery/${id}?action=${action}`);
            if(action === 'bot') cleaner(id);
            list();
        } catch(err){
            console.log(err)
        }
    }
    const handleClick = () =>{
        assignBot();
    }
    return ( 
        <div>
            <button className={styles.btn} onClick={handleClick} disabled={state === 'delivered'}>{state === 'pending' ? 'Assing a Kiwi' : 'Update Status'}</button>
        </div>
     );
}