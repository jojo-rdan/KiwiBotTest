//Trabajé sobre Firebase por pedido de la prueba.

//Permisos de Admin para firebase.
var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccountKey.json");

//Inicializo mi base de datos.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kiwi-bot-b2511-default-rtdb.firebaseio.com"
});
//Decidí trabajr con firestore y crear dos coleciones, Deliveries y Bots.
const db = admin.firestore();
const Deliveries = db.collection("Deliveries");
const Bots = db.collection("Bots");

module.exports = {
    Deliveries,
    Bots
};
