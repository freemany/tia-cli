const prompts = require('prompts');

module.exports = prompts({
    type: 'multiselect',
    name: 'value',
    message: 'Pick pets you like(max. 3)',
    choices: [
        { title: 'Cat', value: 'cat' },
        { title: 'Rabbit', value: 'rabbit'},
        { title: 'Mouse', value: 'mouse', selected: true },
        { title: 'Fish', value: 'fish'},
    ],
    max: 3,
    hint: '- Space to select. Return to submit'
});