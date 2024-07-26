import express from "express";
import cors from "cors";
import { router } from "./routes";
import config from "./config/dotenvConfig";

const app = express();

app.use(
  cors({
    methods: ["GET"],
  }),
);

app.use("/api", router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const run = () => {
  try {
    app.listen(config.PORT, () => {
      console.log(`Server is listening on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();

export default app;
