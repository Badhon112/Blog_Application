import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL,{
        dbName:"Blog_App"
    })
    .then(() => {
      console.log("Connectiong Succefull");
    })
    .catch((error) => {
      console.log("Failed to connect Database" + error);
    });
};
