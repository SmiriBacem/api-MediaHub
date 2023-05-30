// @ts-ignore
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/movies', (req: Request, res: Response) => {
  res.send('List of movies');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});