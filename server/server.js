import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connetDB } from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// connect to database
await connetDB()

// Middlewares
app.use(cors())

// Routes
app.get('/',(req,res)=> res.send("api working"))

app.post('/clerk',express.json(), clerkWebhooks)

const   PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})