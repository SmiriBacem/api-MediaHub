// @ts-ignore
import express, { Request, Response, NextFunction } from "express";
import connectToDB from "./db";
const routes = require("./routes");
// @ts-ignore
import morgan from "morgan";
// @ts-ignore
import cors from 'cors';

const app = express();
const port = 3000;

// Log chaque requete
app.use(morgan("dev"));

// Maintenir les erreurs des middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

app.use(express.json());


// Autoriser toutes les origines et méthodes 
app.use(cors());

// routes avec le prefix '/api'
app.use("/api", routes);

// Connexion à MongoDB Atlas
connectToDB();

app.listen(port, () => {
  console.log(`Port de l'application : ${port} - ${new Date().toLocaleString()} LOG [Start] Starting application... `);
});
