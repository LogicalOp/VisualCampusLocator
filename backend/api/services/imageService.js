const { getImage, uploadImage } = require('../dao/imageDao');

const fetchImage = async () => {
    return await getImage();
};

const saveImage = async (file) => {
    return await uploadImage(file);
};

module.exports = {
    fetchImage,
    saveImage,
};