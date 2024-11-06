CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clientId INT,
    order_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (clientId) REFERENCES clients(id)
);