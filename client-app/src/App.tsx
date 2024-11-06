import { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Container, Button, Modal, Box } from "@mui/material";
import { TableComponent, ModalContent } from "./components";

import type { IData } from "./types";


function App() {
  const [data, setData] = useState<IData[]>([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    axios.get("http://localhost:5050/orders").then(response => setData(response.data)).catch(err => console.error(err.message))
  }, []);

  const handlePushDataButtonClick = (clientName: string, orders: string[]) => {
    const dataToPush = {
      clientName,
      orders
    }

    axios.post("http://localhost:5050/orders", { ...dataToPush })
      .then(response => {
        if (response.status === 201) {
          setData(response.data.orders);
          setModalOpen(false);
        }
      })
      .catch(err => console.error(err.message));
  }

  return (
    <Container className="main-container">
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
        <Typography variant="h3">
          {"Client list"}
        </Typography>

        <Button variant="contained" onClick={() => setModalOpen(!isModalOpen)}>
          <Typography variant="body2">
            {"Add Client"}
          </Typography>
        </Button>
      </Box>
      <TableComponent data={data} />
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ModalContent handlePushButton={handlePushDataButtonClick}/>
      </Modal>
    </Container>
  );
}

export default App;
