import React, { FC, forwardRef, useState } from "react";
import { Box, Button, TextField, Typography,  } from "@mui/material";
import LensBlurIcon from '@mui/icons-material/LensBlur';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface ModalContentProps {
  handlePushButton: (clientName: string, orders: string[]) => void;
}

export const ModalContent: FC<ModalContentProps> = forwardRef((props, ref) => {
  const { handlePushButton } = props;
  const [clientName, setClientName] = useState<string>("");
  const [orderValue, setOrderValue] = useState<string>("");
  const [orders, setOrders] = useState<string[]>([]);

  const handleAddOrderClick = () => {
    const newOrdersArray = [...orders].concat([orderValue]);

    setOrders(newOrdersArray);
    setOrderValue("");
  }

  const handleDeleteOrderClick = (index: number) => {
    const newOrdersArray = [...orders];
    newOrdersArray.splice(index, 1);

    setOrders(newOrdersArray);
  }

  return (
    <Box
      style={{
        minHeight: "440px",
        minWidth: "600px",
        maxHeight: "440px",
        backgroundColor: "rgb(239 239 239)",
        borderRadius: "16px",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",

      }}
      ref={ref}
      tabIndex={-1}
    >
      <Box>
        <Box
          style={{
            marginTop: "20px",
          }}
          px="2rem"
        >
          <TextField
            label="Client Name"
            variant="outlined"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            style={{
              width: "100%"
            }}
          />
        </Box>

        <Box
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
          px="2rem"
        >
          <TextField
            label="Order"
            variant="outlined"
            value={orderValue}
            onChange={(e) => setOrderValue(e.target.value)}
            style={{
              width: "70%"
            }}
          />
          <Button
            onClick={handleAddOrderClick}
            variant="contained"
            disabled={!orderValue.length}
            style={{ height: "100%" }}
          >
            {"Add Order"}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          marginTop: "1rem",
          overflowY: "auto",
          height: "200px",
          maxHeight: "200px"
        }}>

        {orders.map((order, i) => (
          <Box 
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "60%",
              maxWidth: "320px",
              height: "2rem"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <Box>
                <LensBlurIcon sx={{ width: "12px", height: "12px", marginRight: "4px" }}/>
              </Box>
              <Box sx={{ maxWidth: "280px" }}>
                <Typography noWrap>
                  { order }
                </Typography>
              </Box> 
            </Box>

            <Box
              sx={{
                cursor: "pointer",
                color: "red"
              }}
              onClick={() => handleDeleteOrderClick(i)}
            >
              <ClearRoundedIcon sx={{ width: "16px", height: "16px" }}/>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingY: "1rem"
        }}
      >
        <Button
          variant="contained"
          disabled={!clientName || !orders.length}
          onClick={() => handlePushButton(clientName, orders)}
        >
          {"Push data"}
        </Button>
      </Box>
    </Box>
  );
});
