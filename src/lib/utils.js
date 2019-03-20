const getArgs = (args) => {
     args.pop();
     return args;
};

const setEnvDefaults = (defaults) => {
     for(const key in defaults) {
          process.env[key] = defaults[key];
     }
};

module.exports = {getArgs, setEnvDefaults};