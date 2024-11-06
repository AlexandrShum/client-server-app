import { FC } from "react";
import { TableCell, TableHead, TableRow, Typography } from "@mui/material";

const borderStyle = "2px solid black";

export const TableHeader: FC = () => (
  <TableHead style={{backgroundColor: "rgb(239 239 239)"}}>
    <TableRow>
      <TableCell style={{ width: "20%", border: borderStyle }} rowSpan={2}>
        <Typography variant="h6">{"Client Name"}</Typography>
      </TableCell>
      <TableCell style={{ border: borderStyle }} colSpan={2} align="center">
        <Typography variant="h6">
          {"Orders"}
        </Typography>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{ width: "10%", borderBottom: borderStyle, borderRight: "1px dashed black" }}>
        <Typography variant="subtitle1">
          {"Order ID"}
        </Typography>
      </TableCell>
      <TableCell style={{ borderRight: borderStyle, borderBottom: borderStyle }}>
        <Typography variant="subtitle1">
          {"Order Name"}
        </Typography>
      </TableCell>
    </TableRow>
  </TableHead>
);
