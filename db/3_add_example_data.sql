START TRANSACTION;

INSERT INTO clients (name) VALUES
('John'),
('Arthur'),
('Oscar');

INSERT INTO orders (clientId, order_name) VALUES
(1, 'Monitor 24-inch'),
(1, 'Graphics Card RTX 3080'),
(1, 'iPhone 14 Pro'),
(2, 'Laptop Dell XPS 15'),
(2, 'Wireless Keyboard'),
(2, 'Gaming Mouse'),
(2, 'Smartwatch Apple Watch Series 8'),
(2, 'Headphones Bose 700'),
(2, 'Webcam Logitech C920'),
(3, 'Tablet iPad Pro 12.9-inch'),
(3, 'Router TP-Link AX6000'),
(3, 'Portable SSD Samsung T7'),
(3, 'Smart Speaker Amazon Echo Dot'),
(3, 'Smartphone Google Pixel 7'),
(3, 'Gaming Chair Secretlab Omega'),
(3, 'Mechanical Keyboard Razer BlackWidow'),
(3, 'Smart TV Samsung QLED 55-inch'),
(3, 'External Hard Drive WD My Passport 2TB'),
(3, 'Bluetooth Earbuds Sony WF-1000XM4'),
(3, 'Drone DJI Mini 3 Pro');

COMMIT;
