import crypto from 'crypto';
import { exec } from 'child_process';

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

export function runShellScript(scriptFile, workdir) {
  exec(`sh ${scriptFile}`, { cwd: workdir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stdout) console.log(stdout);
    if (stderr) console.error(`stderr: ${stderr}`);
  });
}

export function flattenObject(source, path = '') {
  let out = {};
  for (const [key, value] of Object.entries(source)) {
    const newKey = Array.isArray(value) ? `${key}[]` : key;
    const currentPath = path ? `${path}.${newKey}` : newKey;
    if (typeof value === 'object') {
      out = { ...out, ...flattenObject(value, currentPath) };
    } else {
      out[currentPath] = value;
    }
  }
  return out;
}
