module.exports = {
  '*.+(js|ts)': ['eslint --cache --ext .js,.ts', 'prettier --check'],
  '*.yml': 'prettier --check',
  'package.json': [
    'npx fixpack --dryRun',
    'prettier --check --parser json-stringify'
  ],
  'package-lock.json': 'node -e "process.exitCode = 1;"'
};
