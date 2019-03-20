const colours = require('colors');
const {getArgs} = require('./../lib/utils');
const nodeCmd = require('node-cmd');
const axios = require('axios');
const fs = require('fs');

const showPrompts = async () => {
    let choices;
    try {
       const res = await axios(process.env.dnsApi);
       choices = res.data;
       // save cache
       fs.writeFile(process.env.rootDir + 'cache/dns_list', JSON.stringify(choices), () => {});
    }
    catch(err) {
        // recovery from cache
        choices = JSON.parse(fs.readFileSync(process.env.rootDir + 'cache/dns_list'));
    }

    const ip = await require('./../prompts/dp-dns-set-ip')(choices);

    return {ip: ip.value};
};

module.exports =  async (args) => {

    const argv = getArgs(args);

    let answer;

    try {
        answer = await showPrompts();

        const dns = answer.ip.split(',').join(' ');

        nodeCmd.get(`sudo networksetup -setdnsservers Wi-Fi ${dns}`, (output, error, stdOutput) => {

            if (null === output) {
                console.log(('My DNS: ' + answer.ip).green);
            }
        })
        .stderr.on('data', (data) => {
            process.stdout.write(data.red);
        })
        .stdout.on('data', (data) => {
            console.log(data.yellow);
        });

    } catch (e) {
        // console.error(e);
        return;
    }
};