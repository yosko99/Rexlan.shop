import * as fsPromises from 'fs/promises';

const deleteImage = async (filePath: string) => {
  try {
    await fsPromises.unlink('./uploads/' + filePath);
  } catch (_err) {
    console.log(_err);
  }
};

export default deleteImage;
