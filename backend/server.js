import express from "express";
import { chats } from "./data/data.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const chat = chats.find((chat) => chat._id === id);
  res.send(chat);
});

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
