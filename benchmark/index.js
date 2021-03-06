const Benchmark = require('benchmark');

const { deepcopy } = require('../dist/cjs');

// $ curl -L -o fixture1.json https://api.github.com/repos/sasaplus1/deepcopy.js
const fixture1 = require('./fixture1');

const suite = new Benchmark.Suite();

const env = process.env.ENVIRONMENT ? process.env.ENVIRONMENT + ':' : '';

suite
  .add(env + 'deepcopy:fixture1', function () {
    deepcopy(fixture1);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .run();
