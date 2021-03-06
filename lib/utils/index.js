// const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const { createIfNotExist } = require('./files');

module.exports = {
  getOutputPath: (string, dir, entity) => {
    let fullPath = string.replace('*', dir);
    if (entity) fullPath = fullPath.replace('#', entity);
    const info = path.parse(fullPath);
    return {
      fullPath,
      dir: info.dir,
      ...info,
    };
  },

  replaceAndUpperCase: (str, entityName) => str.replace('**', entityName.toUpperCase()),

  replaceAndUpperCaseForFirstLetter: (str, entityName) => {
    if (!str) return '';
    const name = entityName[0].toUpperCase() + entityName.slice(1);
    return str.replace('*', name);
  },

  upperCaseForFirstLetter: (srt) => srt[0].toUpperCase() + srt.slice(1),

  checkNestedPath: (string) => {
    string.split('/').reduce((acc, item) => {
      if (!acc) {
        createIfNotExist(item);
        return item;
      }
      const newPath = `${acc}/${item}`;
      createIfNotExist(newPath);
      return newPath;
    }, '');
  },

  successMessageInConsole: (dirs, command) => {
    console.log(
      chalk.yellow(`These files were generated by '${command}' command:`),
    );
    dirs.forEach((el) => console.log(`      - ${chalk.green(el)}`));
    console.log(chalk.yellow('Happy hacking ! :)'));
  },

  helpMessageInConsole: () => {
    console.log(
      chalk.yellow(`For init redux:
  - go to the root folder;
  - use 'init-redux' command;`),
    );
    console.log(
      chalk.yellow(`For init entity: 
  - go to the root folder;
  - use 'init-entity' command;`),
    );
  },

  errorMessageInConsole: () => {
    console.log(
      chalk.red('Unknown command, use \'help\' command for get information'),
    );
  },
};
