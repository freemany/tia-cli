#!/usr/bin/env node

const cmd = require('commander');
const {getArgs} = require('./lib/utils');
const colors = require('colors');
const dpDnsSetAction = require('./actions/dp-dns-set');


cmd
    .action((cmdName, opts) => {
        dpDnsSetAction(cmd.args)
    })
    .parse(process.argv);