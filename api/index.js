const express = require('express');
const {Deliveries, Bots} = require('./fireBase')
const app = express();
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
app.use(express.json());

//Acá seteo los headers
app.use(cors());
app.use(express.urlencoded({extended : true, limit: '50mb'}));

//Post para crear Deliveries
app.post('/delivery', async (req, res) => {
        let {
            pickup: {
                pickup_lat,
                pickup_lon
            },
            dropoff: {
                dropoff_lat,
                dropoff_lon
            },
            zone_id
        } = req.body;
        if(typeof pickup_lat !== 'number' || typeof pickup_lon !== 'number' || typeof dropoff_lat !== 'number' || typeof dropoff_lon !== 'number' || typeof zone_id !== 'string'){
           return res.status(400).json({error: "The data don´t match with the especified requirements"})
        }
        let data = {
            id: uuidv4(),
            creation_date: new Date(),
            state: "pending",
            pickup: {
                pickup_lat,
                pickup_lon 
            },
            dropoff: {
                dropoff_lat,
                dropoff_lon 
            },
            zone_id
        }
        try{
            await Deliveries.add(data);
            res.json(data)
        } catch(err){
            console.log(err)
        }
})
app.post('/bots', async(req, res) => {
    let {
        location: {
            dropoff_lat,
            dropoff_lon
        },
        zone_id
    } = req.body;
    if(typeof dropoff_lat !== 'number' || typeof dropoff_lon !== 'number' || typeof zone_id !== 'string'){
        return res.status(400).json({error: "The data don´t match with the especified requirements"})
    }
    let data = {
        id: uuidv4(),
        status: "available",
        location: {
            dropoff_lat,
            dropoff_lon
        },
        zone_id
    }
        try{
            await Bots.add(data)
            res.json(data);
        } catch(err){
            console.log(err);
        }
})
app.get('/delivery', async(req, res) => {
        try{
            const delivery = await Deliveries.get();
            const response = delivery.docs.map(e => {
                const element = e.data();
                const obj = {
                    ...element,
                    creation_date: element.creation_date.toDate(),
                    pickup: {
                        ...element.pickup
                    },
                    dropoff: {
                        ...element.dropoff
                    }
                }
                return obj;
            })
            return res.json(response.sort((a, b) => {
                return a.creation_date - b.creation_date
            }));
        } catch(err){
            console.log(err);
        }
})
app.get('/delivery/:id', async(req, res) => {
        const {id} = req.params;
        try{
            const delivery = await Deliveries.where('id', '==', id).get();
            const response = delivery.docs.map(e => e.data())
            res.json(response);
        } catch(err){
            console.log(err);
        }
})
app.put('/delivery/:id', async(req, res) => {
    const {id} = req.params;
    const {action} = req.query;
    try{
        const document = await Deliveries.where('id', '==', id).get();
        const response = document.docs.map(e => {
            return {
                id: e.ref.id,
                state: e.data().state,
                bot_id: e.data().bot_id
            }
        });
        let states = {
            "pending":"assigned",
            "assigned":"in_transit",
            "in_transit":"delivered"
        }
        let statusBots = {
            "available":"reserved",
            "assigned":"busy",
            "in_transit":"available"
        }
        if(action === "delivery"){
            if(response[0].state === "pending"){
                return res.status(400).json({error: "This delivery doesn´t have any bot assign yet."})
            }
            if(response[0].state === "delivered"){
                return res.status(400).json({error: "The package was already delivered."})
            }
            console.log(response[0])
            await Bots.doc(response[0].bot_id).update({
                status: statusBots[response[0].state]
            })
            const changue = await Deliveries.doc(response[0].id).update({
                state: states[response[0].state]
            })
            return res.json(changue)
        }
        if(action === "bot"){
            const document = await Bots.where('status', '==', 'available').get();
            const responseBot = document.docs.map(e => {
                return {
                    id: e.ref.id,
                    status: e.data().status
                }
            });
            if(responseBot.length === 0) return res.status(404).json({error: "No bots available"})
            else{
                if(response[0].state !== "pending") return res.status(400).json({error: "This delivery has a bot assigned"})
                await Deliveries.doc(response[0].id).update({
                    state: states[response[0].state],
                    bot_id: responseBot[0].id
                })
                const changueBot = await Bots.doc(responseBot[0].id).update({
                    status: statusBots[responseBot[0].status]
                })
                return res.json(changueBot)
            }
        }
    } catch(err){
        console.log(err)
    }
})

app.listen(3000, () => console.log("Runing on port 3000"))