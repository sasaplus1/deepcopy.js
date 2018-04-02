const deepcopy = require('../../');

process.exit(typeof deepcopy === 'function' ? 0 : 1);
