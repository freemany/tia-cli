const colours = require('colors');
const {getArgs} = require('./../lib/utils');
const dns = require('dns');

const showPrompts = async () => {
    // const baseUrl = await require('./../prompts/dp-microapp-generate-base_url.js');
    // const runInstall = await require('./../prompts/dp-microapp-generate-run_install.js');
    //
    // return {baseUrl: baseUrl.value, runInstall: runInstall.value};
    return true;
};

const dpDnsShow = async (args) => {

    const argv = getArgs(args);

    let answer;

    try {
        answer = await showPrompts();
    } catch (e) {
        console.error(e);
        return;
    }

    console.log(('My DNS: ' + dns.getServers()).green);
};

module.exports = dpDnsShow;