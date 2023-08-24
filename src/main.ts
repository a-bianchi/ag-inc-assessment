import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { logger } from './logger';
import { config } from './config';

const app = express();
const port = config.port;

app.use(bodyParser.json());

app.post('/execute', async (req: Request, res: Response) => {
  logger.info('body: ', req.body);

  res.status(200).send(req.body);
});

app.listen(port, () => logger.info(`Server listening on port ${port}`));
