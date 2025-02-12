const database = require('../../database');

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

const uploadImage = async (file) => {
    try {
        const { originalname, mimetype, buffer } = file;

        const [image] = await database.knex('images')
            .insert({
                originalname,
                mimetype,
                data: buffer
            })
            .returning('*');

        return image;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

module.exports = {
    getImage,
    uploadImage,
};