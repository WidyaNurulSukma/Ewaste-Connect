require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL?.trim() || "";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY?.trim() || "";
const CLIENT_URL = process.env.CLIENT_URL?.trim() || "";
const API_KEY = process.env.API_KEY?.trim() || "";
const DOMAIN = process.env.DOMAIN?.trim() || "";
const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim() || "";
const BREVO_SMTP_USER = process.env.BREVO_SMTP_USER?.trim() || "";
const BREVO_SMTP_PASSWORD = process.env.BREVO_SMTP_PASSWORD?.trim() || "";
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET?.trim() || "";
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY?.trim() || "";
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME?.trim() || "";

// **Tambahkan log untuk debugging**
console.log("🔍 ENV Variables Loaded:");
console.log(`- CLIENT_URL: ${CLIENT_URL}`);
console.log(`- MONGO_URL: ${MONGO_URL ? "OK" : "NOT SET"}`);
console.log(`- JWT_SECRET_KEY: ${JWT_SECRET_KEY ? "OK" : "NOT SET"}`);
console.log(`- CLOUDINARY_CLOUD_NAME: ${CLOUDINARY_CLOUD_NAME ? "OK" : "NOT SET"}`);

module.exports = {
  PORT,
  MONGO_URL,
  API_KEY,
  DOMAIN,
  CLIENT_URL,
  JWT_SECRET_KEY,
  BREVO_API_KEY,
  BREVO_SMTP_USER,
  BREVO_SMTP_PASSWORD,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME
};
