import express, { Request, Response } from 'express';
import { getAllOrders, addNewClientAndHisOrders } from "../services/db";
import { sortOrdersByClient } from '../utils/utils';

let router = express.Router();

router.get("/orders", async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrders();

    if (!orders.length) {
      res.status(404).json({error: "Orders not found"})
    }

    const sortedOrders = sortOrdersByClient(orders);

    res.status(200).json(sortedOrders);
  } catch (error) {
      res.status(500).json({ error });
  }
})

router.post("/orders", async (req: Request, res: any) => {
  try {
    const { clientName, orders } = req.body;

    if (!clientName) {
      return res.status(400).json({ error: "Client name is required" });
    }

    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: "Orders array is required, and should not be empty" });
    }

    const { status } = await addNewClientAndHisOrders({ clientName, orders });

    if (status === "OK") {
      const updatedOrders = await getAllOrders();
      const sortedOrders = sortOrdersByClient(updatedOrders);
      
      res.status(201).json({ message: "Orders saved successfully", orders: sortedOrders });
    } else {
      console.error("Something went wrong while adding data")
    }
  } catch (error) {
    res.status(500).json({ error: "Error saving orders", details: error });
  }
});

export default router;
