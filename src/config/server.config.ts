import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    JWT_PASSWORD: process.env.JWT_PASSWORD || 'password'
};