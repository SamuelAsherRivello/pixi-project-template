import { register } from 'tsconfig-paths';
import { pathToFileURL } from 'url';
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const { loadConfig } = require('tsconfig-paths/lib/config-loader');

const { absoluteBaseUrl, paths } = loadConfig();

// Adjust the base URL to point to the dist directory
const distBaseUrl = path.join(process.cwd(), 'dist');

register({
  baseUrl: distBaseUrl,
  paths: {
    '@server/*': ['server/server/*'],
    '@shared/*': ['server/shared/*'],
  },
});

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@')) {
    const [scope, ...rest] = specifier.split('/');
    const mappedPath = path.join(distBaseUrl, paths[scope + '/*'][0].replace('*', rest.join('/')));
    return nextResolve(pathToFileURL(mappedPath + '.js').href);
  }
  return nextResolve(specifier);
}

export function load(url, context, nextLoad) {
  return nextLoad(url, context);
}
