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

module.exports = {
    getImage,
};