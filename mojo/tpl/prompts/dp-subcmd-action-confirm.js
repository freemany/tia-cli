const prompts = require('prompts');

module.exports = prompts({
    type: 'confirm',
    name: 'value',
    message: 'Are you sure ?',
    initial: true,
});