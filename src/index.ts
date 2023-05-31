// @ts-ignore
import express, { Request, Response } from 'express';
import connectToDB from './db';
const routes = require("./routes");


const app = express();
const port = 3000;

app.get('/movies', (req: Request, res: Response) => {
  res.send('List of movies');
});

app.use(express.json());

// routes avec le prefix '/api'
app.use("/api", routes);

// Connexion à MongoDB Atlas
connectToDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});