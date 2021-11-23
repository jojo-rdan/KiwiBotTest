# Project - KiwiBot Devilery Control System test

## About the project:

  I made this project as a technical test for a private company. I built a complete website from Back to Front and using Firebase for the DB.

  - Database:
      - Firebase service

  - Back-end:
      - Node.js
      - Express

  - Front-end:
      - React.js
      - Axios
        
  - Functionality:
      - The user will be able to keep track of the various deliveries, see their creation date, change their status and create new deliveries.
      - The user will also have a fleet of KiwiBots to be able to assign them to the deliveries that you have pending shipments and will also be able to create new Kiwibots if necessary.
      - There is also a boton that filters deliveries by creation date, ascending or descending.
      - There is also an option to filter deliveries by the status of the shipment.
      - In case of orders that have been in a "pending" state for more than 5 minutes, a warning will be displayed.
      - If the shipment has already been made, the update status button will be deactivated, because the order has already been shipped.
      - 
  - Things to improve(having more time):
      - Implement unit tests on the back and front.
      - A route to get the information of all kiwibots in the database (however, you are able to watch it from the DB of firebase, just in case).
      - Rewrite all this project with TypeScript, to improve myself and the code.
      - Make it responsive.

 ## Test Checklist:

  - Create an API in Node with an endpoint to create new deliveries and store them in a firebase collection this is the structure of the delivery document: DONE.
  - Create a collection of bots and a endpoit to create them: DONE.
  - Create a collection of bots and a endpoit to create them: DONE.
  - Create an interface in React to see the created deliveries in a list ordered by the creation date: DONE.
  - Add a button to toggle the order between ASC and DESC: DONE.
  - Add the option to filter the list by the different statuses: DONE.
  - Create an action to assign a bot to a delivery: DONE.
  - Create an action to update the status of the delivery, assigned to in_transit, in_transit to delivered(this was the most tricky one hehe): DONE.
  - In the same interface create alerts for deliveries that were created more than 5 minutes ago and are not assigned(second tricky haha): DONE.
  - Add unit testing to the backend and end to end testing to the frontend: UNDONE.
  - Create a diagram of all the processes you designed: UNDONE.
  
 ## How to start the project:
 
   - Clone the repo and open it with your code editor.
   - Open a terminal over the client folder and the api folder.
   - Run npm install over the client and the api folders.
   - Run nodemon index.js over the api folder in your terminal to run the server.
   - Run npm start over the client folder in your terminal to run the client.

 ## If something is not right after these steps or you want to contact me:
 
   - email: jordan.olaves91@gmail.com
   - LinkedIn: https://www.linkedin.com/in/jojordan1991/

 ## Thank you for stopping by to see our project ;)
