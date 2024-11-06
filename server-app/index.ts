import express from 'express';
import ordersRoute from "./routes/orders";
import cors from "cors";


const startServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(express.json());
    app.use(cors());
    app.use(ordersRoute);
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();
