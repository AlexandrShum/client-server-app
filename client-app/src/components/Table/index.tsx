import React, { FC, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@mui/material";

import { TableHeader } from "./TableHeader";
import type { IData } from "../../types";

interface TablePropsInterface {
  data: IData[];
}

export const TableComponent: FC<TablePropsInterface> = ({ data }) => {
  const [expandedClients, setExpandedClients] = useState<{ [key: string]: boolean }>({});

  const borderStyle = "2px solid black";

  const toggleExpand = (clientId: string) => {
    setExpandedClients((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };

  if (!data.length) {
    return null;
  }

  return (
    <TableContainer component={Paper} sx={{ padding: "16px"}}>
      <Table>
        <TableHeader />
        <TableBody>
          {data.map((item, clientIndex) => {
            const clientId = Object.keys(item)[0];
            const client = item[clientId];
            const orderCount = client.orders.length;
            const isExpanded = expandedClients[clientId] || false;
            const ordersToShow = isExpanded ? client.orders : client.orders.slice(0, 3);

            return (
              <React.Fragment key={clientId}>
                {ordersToShow.map((order, index) => (
                  <TableRow key={order.orderId} style={{ border: borderStyle, }}>
                    {index === 0 && (
                      <TableCell
                        rowSpan={isExpanded ? orderCount : Math.min(3, orderCount)}
                        style={{ width: "20%", border: borderStyle, backgroundColor: "rgb(239 239 239)" }}
                      >
                        {client.clientName}
                      </TableCell>
                    )}
                    <TableCell style={{ width: "10%", border: "1px solid black", borderRight: "1px dashed black" }}>
                      {order.orderId}
                    </TableCell>
                    <TableCell style={{ width: "80%", border: "1px solid black", borderLeft: "none" }}>
                      {order.orderName}
                    </TableCell>
                  </TableRow>
                ))}
                {orderCount > 3 && (
                  <TableRow style={{  }}>
                    <TableCell colSpan={3} align="center" style={{ padding: 0, border: "1px dashed black" }}>
                      <Button onClick={() => toggleExpand(clientId)} >
                        {isExpanded ? "Show Less" : "Show More"}
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
                {clientIndex < data.length - 1 && (
                    <TableRow style={{ backgroundColor: "#cecbcb"}}>
                      <TableCell colSpan={3} style={{ padding: "8px", border: "none" }} />
                    </TableRow>
                  )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
