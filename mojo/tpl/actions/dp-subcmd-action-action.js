const colours = require('colors');
const {getArgs} = require('./../lib/utils');

const showPrompts = async () => {
    const text = await require('./../prompts/{{dp-subcmd-action-text}}.js');
    const select = await require('./../prompts/{{dp-subcmd-action-select}}.js');
    const multiSelect = await require('./../prompts/{{dp-subcmd-action-multiselect}}.js');
    const confirm = await require('./../prompts/{{dp-subcmd-action-confirm}}.js');

    return {text: text.value, select: select.value, multiSelect: multiSelect, confirm: confirm.value};
};

const doAction = async (args) => {

    const argv = getArgs(args);

    let answer;

    try {
        answer = await showPrompts();
    } catch (e) {
        console.error(e);
        // throw new Error('showPrompts went wrong');
        return;
    }

    console.log('Answers: ', answer);

    const result = await require('./../services/{{dp-subcmd-action-service}}')(argv[0], answer);

    if (true === result) {
        console.log('Success!!!'.green);
    } else {
        console.log('Failed'.red);
    }
};

module.exports = doAction;