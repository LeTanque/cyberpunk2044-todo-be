import "dotenv/config";
import express from "express";
import { pool } from "./db.js";
import { todosRouter } from "./todos.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(express.json());

app.use("/api/todos", todosRouter);

app.get("/health", async (_request, response) => {
  try {
    await pool.query("SELECT 1");
    response.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check database query failed:", error);
    response.status(503).json({ status: "unavailable", database: "disconnected" });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
