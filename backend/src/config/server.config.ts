import dotenv from "dotenv";

dotenv.config(); // It loads the dotenv file

export const PORT = process.env.PORT || 3000;
