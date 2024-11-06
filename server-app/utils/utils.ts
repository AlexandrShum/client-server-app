interface IOrders {
  client_id: number;
  order_id: number;
  client_name: string;
  order_name: string;
}

interface ISortedOrders {
  clientName: string;
  orders: {
    orderId: number;
    orderName: string;
  }[];
}

export const sortOrdersByClient = (orders: IOrders[]): { [key: number]: ISortedOrders }[] => {
  const sortedOrders: { [key: number]: ISortedOrders } = {};

  orders.forEach((order) => {
    const clientId = order.client_id;

    if (sortedOrders[clientId]) {
      sortedOrders[clientId].orders.push({
        orderId: order.order_id,
        orderName: order.order_name,
      });
    } else {
      sortedOrders[clientId] = {
        clientName: order.client_name,
        orders: [
          {
            orderId: order.order_id,
            orderName: order.order_name,
          },
        ],
      };
    }
  });

  return Object.entries(sortedOrders).map(([clientId, clientOrders]) => ({
    [clientId]: clientOrders,
  }));
};
