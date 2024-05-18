import express from 'express';
import dotenv from 'dotenv';
import {db} from './config/db/db.js';
import middleWares from './middleware/index.js';
// import router from './routes/index.js'
import rootRoute from './routes/root.js';


dotenv.config()
const app = express();

db()

app.use(express.json())
app.use(rootRoute)
// app.use(router);

middleWares(app)

const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`server listening at http://localhost:${PORT}`)
});