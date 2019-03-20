#!/usr/bin/env node

const fs = require('fs');
const colors = require('colors');

let argvs = process.argv;

argvs.shift();
argvs.shift();


if (argvs.length === 0) {
    console.log('no commands to create'.red);
    process.exit(1);
}

const createSubCmd = () => {
    let dpContent = fs.readFileSync(dpFile, 'utf8');

    const newDpContent = dpContent.replace(addCommandRegx, addCommandReplacePattern.replace('%s', subCmd));

    fs.writeFileSync(dpFile, newDpContent);

// generate sub cmd file
    subcmdTpl = __dirname + '/tpl/commands/dp-subcmd.js'; // subcmd tpl reusable
    let dpSubcmdContent = fs.readFileSync(subcmdTpl, 'utf8');
    newDpSubcmdContent = dpSubcmdContent.replace('%s', subCmd);

    if (argvs.length === 0) {
        console.log('One sub command has been created'.red);
        fs.writeFileSync(newSubCmdFile, newDpSubcmdContent);
        process.exit();
    }
};

const createSubCmdAction= () => {
    newDpSubcmdContent = newDpSubcmdContent.replace(addCommandRegx, addCommandReplacePattern.replace('%s', cmdAction));
    fs.writeFileSync(newSubCmdFile, newDpSubcmdContent);

    let dpSubcmdActionContent = fs.readFileSync(subcmdActionTpl, 'utf8');
    dpSubcmdActionContent = dpSubcmdActionContent.replace('%s', subCmd + '-' + cmdAction);
    fs.writeFileSync(newSubCmdActionFile, dpSubcmdActionContent);

    generateDummyPrompts();

    let actionContent = fs.readFileSync(__dirname + '/tpl/actions/dp-subcmd-action-action.js', 'utf8');
    actionContent = actionContent.replace('{{dp-subcmd-action-text}}', 'dp-' + subCmd + '-' + cmdAction + '-text');
    actionContent = actionContent.replace('{{dp-subcmd-action-select}}', 'dp-' + subCmd + '-' + cmdAction + '-select');
    actionContent = actionContent.replace('{{dp-subcmd-action-multiselect}}', 'dp-' + subCmd + '-' + cmdAction + '-multiselect');
    actionContent = actionContent.replace('{{dp-subcmd-action-confirm}}', 'dp-' + subCmd + '-' + cmdAction + '-confirm');
    actionContent = actionContent.replace('{{dp-subcmd-action-service}}', 'dp-' + subCmd + '-' + cmdAction + '-service');
    fs.writeFileSync(__dirname + '/../src/actions/dp-' + subCmd+ '-' + cmdAction + '-action.js', actionContent);

    // generate service
    fs.copyFileSync(__dirname + '/tpl/services/dp-subcmd-action-service.js', __dirname + '/../src/services/dp-' + subCmd + '-' + cmdAction + '-service.js');
};

const generateDummyPrompts = () => {
    fs.copyFileSync(__dirname + '/tpl/prompts/dp-subcmd-action-text.js', __dirname + '/../src/prompts/dp-' + subCmd + '-' + cmdAction + '-text.js');
    fs.copyFileSync(__dirname + '/tpl/prompts/dp-subcmd-action-select.js', __dirname + '/../src/prompts/dp-' + subCmd + '-' + cmdAction + '-select.js');
    fs.copyFileSync(__dirname + '/tpl/prompts/dp-subcmd-action-multiselect.js', __dirname + '/../src/prompts/dp-' + subCmd + '-' + cmdAction + '-multiselect.js');
    fs.copyFileSync(__dirname + '/tpl/prompts/dp-subcmd-action-confirm.js', __dirname + '/../src/prompts/dp-' + subCmd + '-' + cmdAction + '-confirm.js');
};

const dpFile = __dirname + '/../src/dp';
const addCommandRegx = /(\.parse\(process.argv\);)/g; // reusable
const addCommandReplacePattern = '\.command\(\'%s\', \'description ...\'\) \/\/ \.alias(\'foo\')\n    $1'; // reusable

const subCmd = argvs.shift();
if ('dp' === subCmd || 'deputy' === subCmd) {
    console.log(("'" + subCmd + "' should not be the name of the sub command").red);
    process.exit(1);
}

const newSubCmdFile = __dirname + '/../src/dp-' + subCmd + '.js';
let newDpSubcmdContent = null;
let subcmdTpl = null;

if (!fs.existsSync(dpFile + '-' + subCmd + '.js')) {
    createSubCmd();
} else {
    subcmdTpl = dpFile + '-' + subCmd + '.js';
    newDpSubcmdContent = fs.readFileSync(subcmdTpl, 'utf8');
}

const cmdAction = argvs.shift();
const subcmdActionTpl = __dirname + '/tpl/commands/dp-subcmd-action.js'; // subcmd tpl reusable
const newSubCmdActionFile = __dirname + '/../src/dp-' + subCmd + '-' +  cmdAction + '.js';

createSubCmdAction();


