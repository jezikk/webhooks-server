import http from 'http';
import fs from 'fs';
import { runShellScript, verifyRequest } from './utils';

if (process.argv.length !== 3) {
  throw Error('The path to the config file is missing.');
}

const port = process.env.PORT || 8080;
const urlPrefix = process.env.URL_PREFIX || '/webhooks/';
const globalConfig = JSON.parse(fs.readFileSync(process.argv[2]));

const server = http.createServer((req, res) => {
  let payload = '';
  const { method, url } = req;

  if (method === 'POST') {
    req
      .on('data', (chunk) => {
        payload += chunk;

        if (payload.length > 1e6) {
          req.connection.destroy();
        }
      })
      .on('end', () => {
        payload = JSON.parse(payload);
        const appConfig = globalConfig[url.replace(urlPrefix, '')];
        if (appConfig && payload) {
          if (
            appConfig.secret &&
            !verifyRequest(req, payload, appConfig.secret)
          ) {
            console.error('Verification failed');
            return;
          }

          // match logic

          runShellScript(appConfig.script, appConfig.workdir);
        }
      })
      .on('error', (err) => {
        console.error(err);
      });
  }
  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
