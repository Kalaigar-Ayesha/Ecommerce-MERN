import {v2 as cloudinary} from "cloudinary"

const connectCloudinary=async () => {
    cloudinary.config({
        cloud_name:process.env.CLOUDINAR_NAME,
        api_key:process.env.CLOUDINARY_APT_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary;