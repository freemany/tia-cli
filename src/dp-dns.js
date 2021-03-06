#!/usr/bin/env node
const cmd = require('commander');

cmd
    .description('DNS tool')
    .command('show', 'show current DNS').alias('get')
    .command('set', 'set DNS')
    .parse(process.argv);