const { MongoClient } = require("mongodb");
const client = new MongoClient("mongodb://127.0.0.1:27017");
const dbName = "angular-project";
const collName = "user-credentials";

async function registerUser(query) {
    // {'name':'abc','mail':'abc@gmail.com','username':'abc1','password':'hel'}
    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection(collName);
    if (query.password == query.cpassword) {
        const res1 = await coll.find({ mail: query.mail }).toArray();
        if (res1.length == 0) {
            const res2 = await coll.find({ username: query.username }).toArray();
            if (res2.length > 0) {
                return { 'message': "Username already Exits" };
            } else {
                const res3 = await coll.insertOne(query);
                return { 'message': "User Registration Successful" };
            }
        } else {
            return { 'message': "Already Exits" };
        }
    } else {
        return { 'message': "password not match!" };
    }
}


async function loginUser(query) {
    // {'username':'abc1','password':'hel'}
    await client.connect();
    const db = client.db(dbName);
    const coll = db.collection(collName);
    const res1 = await coll.find({ username: query.username }).toArray();
    if (res1.length > 0) {
        if (res1[0].password == query.password) {
            return { message: "Login Successfull" };
        } else {
            return { message: "Invalid Login" };
        }
    } else {
        return { message: "No users found, Please Register" };
    }
}

module.exports = {
    registerUser,
    loginUser,
};
