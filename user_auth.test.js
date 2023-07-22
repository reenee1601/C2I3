process.env['NODE_DEV'] = 'TEST'

const app = require("./server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const dbConfig = require("./config/db.config");

beforeAll(async () => {
    //connection to mongoDB database
    const db = require("./models");

    await db.mongoose
      .connect(dbConfig.URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log("Successfully connect to MongoDB.");
      })
      .catch(err => {
        console.error("Connection error", err);
        process.exit();
      });
});

test("Gets the root endpoint", async () => {
  // Sends GET Request to / endpoint
  const res = await request.get("/");
  //console.log(res);
  expect(res.body.message).toEqual("Welcome to login/registration page.")
  // ...
}, 8000);



// close the mongoose connection
afterAll(async () => {
    await request.post('/close-mongoose-connection');
    console.log('connection closed');
});
