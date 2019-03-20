#!/usr/bin/env node

const cmd = require('commander');
const {getArgs} = require('./lib/utils');
const colors = require('colors');
const dpDnsShowAction = require('./actions/dp-dns-show');


cmd
    .action((cmdName, opts) => {
        dpDnsShowAction(cmd.args)
    })
    .parse(process.argv);