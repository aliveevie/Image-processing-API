//this is the main API route

// Express server module
import express from 'express';

// Path module
import path from 'path';

// Image file utilities module
import {
  filePresence,
  fileDirectory,
  imageSize
} from '../imageFunctions/imageFunction';

// create the Router object
const routes = express.Router();

// define the image resize route
// e.g. http://localhost:3000/image?f=imageName&x=jpeg&w=100&h=100
routes.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    const filename = req.query.f as string;
    const extension = req.query.x as string;
    const width = req.query.w as string;
    const height = req.query.h as string;

    // check for valid request query parameters
    // if any one of these are not provided, image processor cannot proceed
    if (
      filename === undefined ||
      extension === undefined ||
      width === undefined ||
      height === undefined
    ) {
      // invalid request query parameters
      res.status(400).send('Missing request query parameters');
    } else {
      // check for valid width and height values
      const w = parseInt(width) as number;
      const h = parseInt(height) as number;
      if (isNaN(w) || isNaN(h)) {
        res.status(400).send('Invalid request query parameters');
      } else {
        // pass the file extension as a request query parameter
        const extensionLowercase = extension.toLowerCase();
        const assetResourceName =
          path.join(__dirname, '../../pictures/secret/') +
          filename +
          '.' +
          extensionLowercase;
        const thumbnailDirectory = path.join(
          __dirname,
          '../../pictures/thumbnail/'
        );
        const thumbnailResourceName =
          thumbnailDirectory +
          filename +
          '-' +
          width +
          'w-' +
          height +
          'h.' +
          extensionLowercase;

        // check if specified file exists in assets
        const assetExists = await filePresence(assetResourceName);
        if (assetExists) {
          // check if thumbnail directory exists; create if it doesn't
          fileDirectory(thumbnailDirectory);

          // resize asset image to specified dimensions and save as thumbnail
          imageSize(
            assetResourceName,
            parseInt(width),
            parseInt(height),
            thumbnailResourceName
          ).then((outImage) => {
            console.log('file returned: ' + outImage);
            res.status(200).sendFile(outImage);
          });
        } else {
          // unknown filename resource
          res.status(404).send('Cannot find the requested resource');
        }
      }
    }
  }
);

// export the routes object
export default routes;
