const prompts = require('prompts');

module.exports = prompts({
    type: 'text',
    name: 'value',
    message: "what is the value ?",
    // validate: value => ['hello', 'hola', 'hi'].indexOf(value) < 0 ? 'Please choose hello, hola or hi' : true
});