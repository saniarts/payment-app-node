# payment-app-node
This is a simple payment web application that has APIs that integrate with a third party.
The third party I used was a fake URL.

Tools:
- **Node.js**
- **Express.js**
- **Sequelize**
- **Mysql**
- **Ejs**

## Documentation
Here's the documentation:
- [Flowchart](https://github.com/saniarts/payment-app-node/blob/f938769e5bc0e5d66ed188e53795d15ccce1e632/documentation/Flowchart%20Simple%20Payment.png)
- [ERD](documentation/ERD.png)
- [Postman](https://github.com/saniarts/payment-app-node/blob/f938769e5bc0e5d66ed188e53795d15ccce1e632/documentation/Simple%20Payment%20Node.postman_collection.json)
- Example Database

## Clone
1. Clone it
   `git clone https://github.com/saniarts/payment-app-node.git`
2. Install the dependencies
   `npm install`
3. Change the `.env` with your preferences.
4. Connect to Mysql. I used XAMPP.
5. You can use the example database or migrating and seeding by yourself
   - migrate `npx sequelize-cli db:migrate:all`
   - seed `npx sequelize-cli db:seed:all`
6. Start your application:
   `nodemon` or `npm start`
7. Modify the features as you want to
