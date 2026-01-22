import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// INFO: Middlewares

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// NOTE: Just for testing
app.get('/', (_, res) => {
  res.json({ success: "The API is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
