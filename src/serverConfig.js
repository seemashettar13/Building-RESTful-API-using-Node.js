// import dotenv from "dotenv";
import dotenv from 'dotenv';

dotenv.config();
console.log("port from env file is : ",process.env.PORT);

export const PORT=process.env.PORT || 4000;
