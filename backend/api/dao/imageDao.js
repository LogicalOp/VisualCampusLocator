const database = require('../../database');
const fs = require('fs');
const path = require('path');

const getImage = async () => {
    try {
        const image = await database.knex('images')
            .orderBy('id', 'desc')
            .first();

        return image;
    } catch (error) {
        console.error('Error fetching image:', error);
        throw error;
    }
};

const saveImage = async (file) => {
    try {
        const { originalname, buffer } = file;
        const dataFolderPath = path.join(__dirname, '../../../data/Images');

        if (!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath);
        }

        const filePath = path.join(dataFolderPath, originalname);

        fs.writeFileSync(filePath, buffer);

        return { filePath };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

module.exports = {
    getImage,
    saveImage,
};