const Spinner = require('cli-spinner').Spinner;
const nodeCmd = require('node-cmd');
const fs = require('fs');

const spinner = new Spinner('Loading... %s'.magenta);

spinner.setSpinnerString('|/-\\');

spinner.start();

const servicePromise = (appName, answer) => {

    let promiseResolve;

    const promise = new Promise((resolve) => {
        promiseResolve = resolve;
    });

    setTimeout(() => {
        spinner.stop(true);
        console.log('I have answers: ', answer);
        console.log('Done!'.blue);
        promiseResolve(true);
    }, 1000);

    return promise;
};

module.exports = servicePromise;