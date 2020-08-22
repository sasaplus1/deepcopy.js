module.exports = {
  '*.+(js|ts)': 'npx eslint --cache --ext .js,.ts',
  '*.yml': [
    'npx prettier --parser yaml --write',
    'git diff --exit-code --quiet'
  ],
  'package.json': [
    'npx fixpack',
    'npx prettier --parser json-stringify --write',
    'git diff --exit-code --quiet'
  ],
  'package-lock.json': 'node -e "process.exitCode = 1;"'
};
