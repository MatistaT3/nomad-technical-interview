import express from 'express';
import cartRoutes from './routes/cart.routes';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  })
);

app.use(cartRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
