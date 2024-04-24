import express from "express";
import cartRoutes from "./routes/cart.routes";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  "/",
  express.static(path.join(__dirname, "public"), { extensions: ["html"] })
);
app.use("/_next", express.static(path.join(__dirname, "public/_next")));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:4000",
      "http://localhost:4001",
    ],
  })
);

app.use(cartRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
