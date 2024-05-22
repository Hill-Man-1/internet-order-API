import express from 'express';
import dotenv from 'dotenv';
import { db } from './config/db/db.js';
import middleWares from './middleware/index.js';
import router from './routes/index.js';
import rootRoute from './routes/root.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';
import swaggerSetup from './swagger.js';

dotenv.config();
const app = express();

db();

app.use(express.json());
middleWares(app);
app.use(rootRoute);
app.use(router); 
app.use(errorHandlerMiddleware);
swaggerSetup(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
    console.log(`Documentation API di http://localhost:${PORT}/api-docs`);
});


export default app;