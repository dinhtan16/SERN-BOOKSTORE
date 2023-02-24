// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import initWebRoutes from './src/routes/initWebRoutes.js'
import bodyParser from 'body-parser'
import {testConnect} from '../server/connectionDb.js'
import { v4 } from 'uuid';


testConnect()

dotenv.config()
const app = express()
const port = process.env.PORT|| 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['GET','POST','DELETE','PUT']
}))
app.use(cors({
  origin:process.env.ADMIN_URL,
  methods:['GET','PUT','DELETE','POST']
}))
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
initWebRoutes(app)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})