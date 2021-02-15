export const {
  AES_256_CBC,
  AES_32KEY,
  APP_PASS,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_ADDITIONAL_PARAMS,
  DB_USERNAME,
  EMAIL,
  NODE_ENV,
  SECRET_OR_KEY,
  SERVER_PORT,
  SESS_LIFETIME,
  SESS_NAME,
  SESS_SECRET,
  NEO4J_URI,
  NEO4J_USER,
  NEO4J_PWD,
  IMAGE_STORE_LOCATION,
  LOGS_STORE_LOCATION,
  EMAIL_SERVER,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  SENDGRID_API_KEY,
  SENDGRID_FROM_EMAIL,
  BLOB_STORAGE_ACCOUNT_NAME,
  BLOB_STORAGE_ACCOUNT_KEY,
  IMAGES_CDN_ENDPOINT,
  RESET_PASSWORD_HOST
} = process.env;

export const IN_PROD = NODE_ENV === 'production';
