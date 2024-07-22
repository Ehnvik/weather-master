import app from "./app";
import { PORT } from "./config/dotenvConfig";

const run = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
