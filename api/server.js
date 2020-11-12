const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
res.status(200).json({message: 'connected'})
});

server.get('/accounts', async (req, res, next) => {
try {
const accounts = await db.select("*").from("accounts")
res.json(accounts)
} catch (err) {
    next(err)
}
});

 server.get('/accounts/:id', async (req, res, next) => {
 try {
const [account] = await db
.select("*")
.from("accounts")
.where("id", req.params.id)

res.json(account);
 } catch (err){
next(err)
 }
 });

 server.post('/accounts', async (req, res, next) => {
    try {
    const payload = {
name: req.body.name,
budget: req.body.budget
    }
    let newAccount;
!req.body.name ?
res.status(400).json({message: "account name is required"})
:
!req.body.budget ? 
res.status(400).json({message: "budget is required"})
:
newAccount =  await db.insert(payload).into("accounts");

res.json(newAccount);
    } catch (err) {
    next(err)
    }
});

server.put('/accounts/:id', async (req, res, next) => {
try {

} catch (err) {
next(err)
}
});



server.delete('/:id', async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err)
    }
});
module.exports = server;
