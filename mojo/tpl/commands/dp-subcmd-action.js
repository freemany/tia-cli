#!/usr/bin/env node

const cmd = require('commander');
const {getArgs} = require('./lib/utils');
const colors = require('colors');
const action = require('./actions/dp-%s-action');


cmd
    .action((cmdName, opts) => {
        action(cmd.args)
    })
    .parse(process.argv);