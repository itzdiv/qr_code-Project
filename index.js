import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

// Correct the prompt configuration
inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Give the link to generate the QR code for:',
    },
  ])
  .then((answers) => {
    const url = answers.url;

    // Generate the QR code image
    const qrCode = qr.imageSync(url, { type: 'png' });

    // Save the QR code to a file
    fs.writeFileSync('qrcode.png', qrCode);

    // Save the user input URL to a text file
    fs.writeFile('GenQR.txt', url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log('An unknown error occurred:', error);
    }
  });
