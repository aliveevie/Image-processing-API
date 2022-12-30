// Import node file System module
import { promises as fsPromises } from "fs";

//The sharp module
import sharp from 'sharp';

//The function to check the presence of filee
const filePresence =  async (fileResourceName: string) =>{
   try {
    const imageFile = await fsPromises.open(fileResourceName, 'r');
    imageFile.close();
    return true;
   } catch (err) {
    return false;
   }
}

// This function check the file directory presences
const fileDirectory = async (directoryName:string): Promise<void> => {
    try {
        await fsPromises.readdir(directoryName);

    }catch {
        await fsPromises.mkdir(directoryName)
    }
    return Promise.resolve();
};

// This function resize the image to the specified directory
const imageSize = async (imageName: string, width: number, 
    height: number, outImage: string): Promise<string> =>{
        const outImagePresence = await filePresence(outImage);
        if (!outImagePresence){
            console.log('The output file will be ready for view in few moments!')
            await sharp(imageName).resize(width, height).toFile(outImage);
            return outImage;
        }else {
            console.log('The image already exixt')
            return outImage;
        }

    };
    export {
        filePresence,
        fileDirectory,
        imageSize
    }