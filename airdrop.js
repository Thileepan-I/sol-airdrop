const shell = require('shelljs');
const _ = require("lodash");
const fs = require("fs");
const { deleteFile } = require('./index')

/**
 * WARNING!!!!!
 * This will execute your token transfer
 * @param {*} amount 
 * @param {*} token 
 */
const exeAirdrop = (file,token) => {
  // Load the JSON file
  const data = require(file);

  // Initialize an array to store errors
  const errors = [];

  // Iterate through each recipient
  _.forEach(data, (recipient, index) => {
      console.log(`Airdropping ${recipient.amount} tokens to ${recipient.address} at count: ${index}/${data.length} recipients`);
      
      // Execute the token transfer
      const transferCommand = `spl-token transfer ${token} ${recipient.amount} ${recipient.address} --fund-recipient --allow-unfunded-recipient`;
      const transferResult = shell.exec(transferCommand);

      // Check for errors and push to the errors array if any
      if (transferResult.code !== 0) {
          errors.push(recipient);
      }
  });

  // Write the errors to a file
  const errorsFilePath = 'data/errors.json';
  fs.writeFileSync(errorsFilePath, JSON.stringify(errors));
  console.log('Errors written to:', errorsFilePath);
};

module.exports = {
  exeAirdrop
}
