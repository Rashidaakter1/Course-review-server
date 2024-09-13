import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  NODE__DEV: process.env.NODE_ENV,
  port: process.env.PORT,
  database__url: process.env.DATABASE__URL,
  salt__round: process.env.SALT__ROUND,
  jwt__access__token: process.env.JWT__ACCESS__TOKEN,
  jwt__access__expires__in: process.env.JWT__ACCESS__EXPIRERS__IN,
  jwt__refresh__token: process.env.JWT__REFRESH__TOKEN,
  jwt__refresh__expires__in: process.env.JWT__REFRESH__EXPIRERS__IN,
};
