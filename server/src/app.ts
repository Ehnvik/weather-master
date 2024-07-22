import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    methods: ["GET"],
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
