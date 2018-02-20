const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const requestID = require('./controllers/requestID');
const image = require('./controllers/entries');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'viwnj',
    password : '1234',
    database : 'smart-brain-api'
	 }
})

const app = express();


app.use(bodyParser.json());
app.use(cors())

app.get('/',(req,res)=>{
	res.json(database.users)
})

app.post('/signin',(req,res)=>{signin.signinHandler(req,res, db,bcrypt)})

app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {requestID.requestID(req,res,db)})

app.put('/image', (req,res) => {image.entriesHandler(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleAPICall(req,res)})

 

app.listen(3000,()=>{
	console.log('Server is listening to port 3000')
})

/*
/sigunin --> POST = sucess/fail
/register --> POST = user
/profile/:userId --> GET == user
/image --> PUT -->user
*/	
