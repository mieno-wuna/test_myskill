import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { initializeApp as firebaseAdminInitialize } from "firebase-admin/app";
import { initializeApp as firebaseInitialize } from "firebase/app";

import "./route";
import { firebaseAdminConfig, firebaseConfig } from "./utils/config";
import { route } from "./utils/http-wrapper";

firebaseAdminInitialize(firebaseAdminConfig);
firebaseInitialize(firebaseConfig);

const app = express();

const PORT = process.env.PORT ?? 1234

app.use(express.json());
app.use(route);

app.listen(PORT, () => {
  console.log("Server running on ", PORT);
});
