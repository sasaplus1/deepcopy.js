#!/usr/bin/env node

const Benchmark = require('benchmark');

const deepcopy = require('..');
const { fixture1 } = require('./fixtures');

const suite = new Benchmark.Suite();

suite
  .add('deepcopy:fixture1', function () {
    deepcopy(fixture1);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .run();
