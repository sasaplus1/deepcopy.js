import deepcopy from '../../';

process.exit(typeof deepcopy === 'function' ? 0 : 1);
