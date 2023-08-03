const app = require("../app.js"); 
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose')
const url = 'mongodb+srv://reenee1601:QNbeHPQLj8pwP7UC@cluster0.i4ee9cb.mongodb.net/project_data?retryWrites=true&w=majority';


beforeAll(async () => {
    //connection to mongoDB database

    await mongoose
      .connect(url,{
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


// Test user creatoion; make a user whos email is the current datetime
var myemail
test('Make new user', async () => {
    myemail = new Date().getTime() + '@test.com.sg'
    const res = await request.post("/users/register").send({
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
    const res = await request.post("/users/register").send({
        email:myemail,
        password:"password",
        company:"ichigo",
        name:"ruby"
    });
    expect(res.status).toEqual(400); 

}); 

/// Test signin
// Signin successful
test('Successful signin', async () => {
    const res = await request.post("/users/signin").send({
        email:myemail,
        password:"password"
    });
    expect(res.status).toEqual(200);
    expect(Boolean(res.body.token)).toEqual(true); // check that a random token is generated
});

// email does not exist
test('No such email found', async() => {
    const res = await request.post("/users/signin").send({
        email:"ThisEmailDoesNotExist@test.com",
        password:"password"
    });
    expect(res.status).toEqual(404);
});
    
// password does not match
test('Password does not match', async() => {
    const res = await request.post("/users/signin").send({
        email:myemail,
        password:"passwordddddd"
    });
    expect(res.status).toEqual(400);
});

// close the mongoose connection
afterAll(async () => {
    await mongoose.connection.close();
    //await request.post('/close-mongoose-connection');
    console.log('connection closed');
});
