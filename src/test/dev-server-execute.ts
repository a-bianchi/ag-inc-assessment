import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { logger } from '../logger';
import { Config } from '../config';
import { Handler } from '../handler';
import { ExecutionParameters } from '../steps/types';
import { Folder } from '../steps/folder.steps';

logger.info(`Log level is ${Config.LOG_LEVEL}`);

const app = express();
const port = Config.PORT;
const isProd = process.env.NODE_ENV === 'production';

app.use(bodyParser.json());

app.post('/execute', async (req: Request, res: Response) => {
  const connectorArgs = [];
  const parameters = req.body as ExecutionParameters;
  const { proxy } = parameters;

  if (proxy) {
    logger.info(`Server using proxy: ${proxy.url} / ${proxy.username}`);
    connectorArgs.push(`--proxy-server=${proxy.url}`);
  }

  const launchOptions = {
    args: connectorArgs,
    headless: isProd,
    waitForInitialPage: true,
    executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
  };
  const folder = new Folder();
  const fileObject = await folder.getPhotosAndInfotxt();

  for (const item of fileObject) {
    const handler = new Handler({
      ...parameters,
      photos: item.imagePaths,
      info: item.info,
    });
    handler
      .execute(launchOptions)
      .then(() => logger.info('Execution completed'))
      .catch((error) => logger.error('Unexpected error', error));
  }

  res.status(204).send('OK');
});

app.listen(port, () => logger.info(`Server listening on port ${port}`));
