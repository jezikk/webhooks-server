import * as http from 'http';
import * as fs from 'fs';
import { getFlattenObject, runShellScript, verifyRequest } from './utils';
import { logger } from './logger';
import { RuleEngine } from './rule-engine';
import { RuleInput } from './rule-engine/rule-repository';

if (process.argv.length !== 3) {
  throw Error('The config file is missing.');
}

if (!fs.existsSync(process.argv[2])) {
  throw Error(`The path "${process.argv[2]} doesn't exist"`);
}

const globalConfig = JSON.parse(fs.readFileSync(process.argv[2]).toString());
const port = process.env.PORT || 8080;
const urlPrefix = process.env.URL_PREFIX || '/webhooks/';

const server = http.createServer((req, res) => {
  let requestBody: any = '';
  const { method, url } = req;

  if (method === 'POST') {
    req
      .on('data', (chunk) => {
        requestBody += chunk;

        if (requestBody.length > 1e6) {
          req.socket.destroy();
        }
      })
      .on('end', () => {
        requestBody = JSON.parse(requestBody);
        if (!(url && requestBody)) {
          throw new Error('Url or RequestBody is missing');
        }

        const appName = url.replace(urlPrefix, '');
        const appConfig = globalConfig[appName];

        logger.info(`Request url: ${url}`);
        logger.info(`App name: ${appName}`);

        if (!appConfig) {
          throw new Error(`App "${appName}" doesn't exist in config file`);
        }

        const input: RuleInput = {
          header: req.headers,
          body: getFlattenObject(requestBody),
        };

        const engine = new RuleEngine(appConfig.rules);
        const result = engine.evaluate(input);
        if (result || !appConfig.rules) {
          logger.info(`Run script file`);
          runShellScript(appConfig.script, appConfig.workdir);
        } else {
          logger.info(`Rules are not met`);
        }
      })
      .on('error', (err) => {
        logger.error(err);
      });
  }
  res.end();
});

server.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
