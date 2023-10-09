import fs from 'fs';
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();

function imageToBase64(filePath) {
  try {
    // Read the image file
    const imageData = fs.readFileSync(filePath);

    // Convert the image data to base64
    const base64Image = imageData.toString('base64');

    // Create a data URI
    const dataURI = `data:image/jpeg;base64,${base64Image}`;

    return dataURI;
  } catch (error) {
    console.error('An error occurred while converting the image to base64:', error);
    throw error;
  }
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function main() {
  try {
    const imageFilePath = 'images/img1.jpg';
    const inputImageBase = imageToBase64(imageFilePath);

    const output = await replicate.run(
      'nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b',
      {
        input: {
          image: inputImageBase,
          scale: 9,
        },
      }
    );
    
    console.log(output);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
