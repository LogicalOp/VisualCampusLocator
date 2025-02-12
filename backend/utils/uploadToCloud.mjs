import { config, v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: 'don9ruggm',
    api_key: '846679456163419',
    api_secret: 'g1UiEl_YgY-kbuAIOZiO8SZs_P4',
});

const uploadImage = async () => {
    try {
        const image = '../../data/sample.png';
        const result = await cloudinary.uploader.upload(image);
        console.log(result);
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
    }
};

uploadImage();