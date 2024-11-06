export interface IData {
  [key: string]: {
    clientName: string;
    orders: {
      orderId: number;
      orderName: string;
    }[];
  }
}
