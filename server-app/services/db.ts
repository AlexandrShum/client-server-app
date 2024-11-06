import mysql, { FieldPacket, RowDataPacket } from "mysql2/promise";

const pool = mysql.createPool({
  host: "mysql-db",
  user: "my_user",
  password: "my_password",
  database: "my_database",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

interface IOrder extends RowDataPacket {
  client_id: number;
  order_id: number;
  client_name: string;
  order_name: string;
}

interface IPostData {
  clientName: string;
  orders: string[];
}

export const getAllOrders = async () => {
  const conn = await pool.getConnection();

  try {
    const [rows]: [IOrder[], FieldPacket[]] = await conn.query<IOrder[]>(`
      SELECT 
        clients.id as client_id,
        orders.id AS order_id,
        clients.name AS client_name,
        orders.order_name
      FROM orders
      JOIN clients ON orders.clientId = clients.id
      GROUP BY clients.id, orders.id;
    `);

    return rows;
  } catch (err) {
    console.error("Error while receiving orders:", err);
    throw err;
  } finally {
    conn.release();
  }
};

export const addNewClientAndHisOrders = async (data: IPostData) => {
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [clientResult]: [any, FieldPacket[]] = await conn.query(`
      INSERT INTO clients (name) VALUES (?);
    `, [data.clientName]);

    const clientId = clientResult.insertId;

    const orderValues = data.orders.map(order => `(${clientId}, '${order}')`).join(', ');

    await conn.query(`
      INSERT INTO orders (clientId, order_name) VALUES ${orderValues};
    `);

    await conn.commit();
    return { message: 'Client and orders added successfully', status: "OK" };
  } catch (err) {
    await conn.rollback();
    console.error("Error while adding client and orders:", err);
    throw err;
  } finally {
    conn.release();
  }
};
