const prompts = require('prompts');
const defaultDns = [
    { title: 'Local', value: '127.0.0.1'},
    { title: 'Automatic', value: ''},
    { title: 'Master', value: '52.35.182.172'},
    { title: 'Onboard', value: '54.68.208.135'},
    { title: 'Edge', value: '52.39.67.60'},
    { title: 'Finger Print', value: '34.214.22.229'},
    { title: 'Rafale', value: '52.26.59.227'},
    { title: 'Dingo', value: '34.212.154.16'},
    { title: 'Whaleshark', value: '54.245.44.170'},
    { title: 'Platypus', value: '54.68.208.135'},
    { title: 'Wallaby', value: '54.70.252.230'},
    { title: 'Panda', value: '54.149.66.192'},
    { title: 'Moose', value: '54.149.15.101'},
    { title: 'Koala', value: '52.43.7.143'},
    { title: 'Capybara', value: '54.148.221.245'},
];

module.exports = function(choices) {
    if (undefined === choices || choices.length === 0) {
        choices = defaultDns;
    }
    return prompts({
        type: 'select',
        name: 'value',
        message: 'Pick a DNS',
        choices: choices,
        initial: 1
    });
};
