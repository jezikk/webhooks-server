import * as crypto from 'crypto';
import { exec } from 'child_process';
import { logger } from './logger';

export function verifyRequest(req, payload, secret) {
  const sigHeaderName = 'X-Hub-Signature';
  const sig = req.get(sigHeaderName) || '';
  const hmac = crypto.createHmac('sha1', secret);
  const digest = Buffer.from(
    'sha1=' + hmac.update(payload).digest('hex'),
    'utf8'
  );
  const checksum = Buffer.from(sig, 'utf8');
  return !(
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  );
}

export function runShellScript(scriptFilePath: string, workdir: string) {
  exec(`sh ${scriptFilePath}`, { cwd: workdir }, (error, stdout, stderr) => {
    if (error) {
      throw new Error(`Script exec error: ${error}`);
    }
    if (stdout) logger.info(`Script stdout: ${stdout}`);
    if (stderr) logger.error(`Script stderr: ${stderr}`);
    if (!error) logger.info(`Script completed`);
  });
}

export function getFlattenObject(source: object, path = ''): object {
  let out = {};
  for (const [key, value] of Object.entries(source)) {
    const newKey = Array.isArray(value) ? `${key}[]` : key;
    const currentPath = path ? `${path}.${newKey}` : newKey;
    if (typeof value === 'object') {
      out = { ...out, ...getFlattenObject(value, currentPath) };
    } else {
      out[currentPath] = value;
    }
  }
  return out;
}
