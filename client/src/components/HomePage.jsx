//import "./HomePage.css";
import CreateBot from "./CreateBot";
import DeliveryList from "./DeliveryList";
import styles from "../styles/HomePage.module.css"

export default function HomePage () {
    return ( 
        <div>
            <div className={styles.letters}>
                <h1>KiwiBot Control Center</h1>
                <h2>Manage your deliveries and Kiwis, easily!</h2>
            </div>
            <CreateBot/>
            <DeliveryList/>
        </div>
     );
}