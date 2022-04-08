import mongoose from "mongoose";

const URL = process.env.MONGODB_URL;

const ConnectDB = async () => {
  await mongoose.connect(
    `${URL}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) throw err;
      console.log("connected MONGODB !");
    }
  );
};

export default ConnectDB;
