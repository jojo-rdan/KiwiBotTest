//import "./HomePage.css";
import CreateBot from "./CreateBot";
import DeliveryList from "./DeliveryList";

export default function HomePage () {
    return ( 
        <div>
            <h1>Delivery Control Center</h1>
            <CreateBot/>
            <DeliveryList/>
        </div>
     );
}