process.env['NODE_DEV'] = 'TEST'

const app = require("./server.js"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const dbConfig = require("./config/db.config");
const db = require("./models");

beforeAll(async () => {
    //connection to mongoDB database

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


// Basic connection test
test("Gets the root endpoint", async () => {
  // Sends GET Request to / endpoint
  const res = await request.get("/");
  //console.log(res);
  expect(res.body.message).toEqual("Welcome to login/registration page.")
  // ...
}, 8000);

// Test user creatoion; make a user whos email is the current datetime
var myemail
test('Make new user', async () => {
    myemail = new Date().getTime() + '@test.com.sg'
    const res = await request.post("/register").send({
        email:myemail,
        password:"password",
        company:"ichigo",
        name:"ruby"
    });
    console.log(res);
    expect(res.status).toEqual(201);

});
// and maybe delete this user later
// Test signing up with duplicate email: use the same email used as above
test('Make new user with duplicate email', async () => {
    const res = await request.post("/register").send({
        email:myemail,
        password:"password",
        company:"ichigo",
        name:"ruby"
    });
    expect(res.status).toEqual(500); // should return an error

}); 

/// Test signin
// Signin successful
test('Successful signin', async () => {
    const res = await request.post("/signin").send({
        email:myemail,
        password:"password"
    });
    expect(res.status).toEqual(200);
    expect(Boolean(res.body.token)).toEqual(true); // check that a random token is generated
});

// email does not exist
test('No such email found', async() => {
    const res = await request.post("/signin").send({
        email:"ThisEmailDoesNotExist@test.com",
        password:"password"
    });
    expect(res.status).toEqual(404);
});
    
// password does not match
test('No such email found', async() => {
    const res = await request.post("/signin").send({
        email:myemail,
        password:"passwordddddd"
    });
    expect(res.status).toEqual(400);
});

// close the mongoose connection
afterAll(async () => {
    await db.mongoose.connection.close();
    //await request.post('/close-mongoose-connection');
    console.log('connection closed');
});
