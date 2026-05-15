import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const app = express();

const port  =  Number(process.env.API_PORT ?? 4000)
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "âpi",
  });
});



app.listen(port, () => {
  console.log(`ForgeLab API listening on http://localhost:${port}`);
});

