/* 
Usuario root:  danielpm
Clave:         1234
*/

-- CREAR BASE DE DATOS
CREATE SCHEMA `product_db` ;

/* usar BD */
use product_db;

/* ---------------------------------------------------- */

/* CREAR TABLAS

Si ignoramos la tabla ventas (factura), estas son las relaciones:
- un usuario tiene uno o muchos productos
- un producto tiene una o muchas imagenes */

CREATE TABLE IF NOT EXISTS user (
    id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    mail VARCHAR(255),
    passcode VARCHAR(255),
    user_type BOOLEAN NOT NULL /* TRUE=1=administrador - FALSE=0=cliente */
);

CREATE TABLE IF NOT EXISTS product (
    id_product INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    name_product VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    reference VARCHAR(255),
    size VARCHAR(255),
    color VARCHAR(255),
    category VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES user(id_user)
);

CREATE TABLE IF NOT EXISTS img (
    id_img INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    URL VARCHAR(255) NOT NULL,
    id_product INT NOT NULL,
    FOREIGN KEY (id_product) REFERENCES product(id_product) ON DELETE CASCADE
);

/* ---------------------------------------------------- */

-- INSERTAR DATOS

-- Tabla de Usuario
INSERT INTO user (full_name, mail, passcode, user_type)
VALUES ('Admin', 'admin@example.com', 'clave_admin', TRUE);

INSERT INTO user (full_name, mail, passcode, user_type)
VALUES ('Cliente 1', 'cliente1@example.com', 'clave_cliente1', FALSE);

-- Tabla de Producto
-- Supongamos que el usuario con id_user 1 (admin) agrega productos
INSERT INTO product (id_user, name_product, price, reference, size, color, category)
VALUES (1, 'Producto 1', 100, 'REF1', 'XL', 'Rojo', 'Categoría A');

INSERT INTO product (id_user, name_product, price, reference, size, color, category)
VALUES (1, 'Producto 2', 75, 'REF2', 'M', 'Azul', 'Categoría B');

-- Insertar datos en la tabla de Imagen
-- Supongamos que los productos con id_product 1 y 2 tienen imágenes
INSERT INTO img (URL, id_product)
VALUES ('https://feriadelbrasier.co/cdn/shop/files/MEG5015WHT_7_1800x1800.jpg?v=1688474552', 1);

INSERT INTO img (URL, id_product)
VALUES ('https://feriadelbrasier.co/cdn/shop/products/STR130002-1100-1_1800x1800.jpg?v=1683476168', 2);

/* ---------------------------------------------------- */

-- SELECCIONAR TODA LA TABLA

SELECT * FROM img;
SELECT * FROM product;
SELECT * FROM user;

/* ---------------------------------------------------- */

-- DESACTIVAR MODO SEGURO PARA PODER VACIAR TABLAS
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS=0;

-- VACIAR TABLAS 
DELETE FROM img;
DELETE FROM product;
DELETE FROM user;

/* ---------------------------------------------------- */

-- REINICIAR ID AUTO-INCREMENTABLE

ALTER TABLE img AUTO_INCREMENT = 1;
ALTER TABLE product AUTO_INCREMENT = 1;
ALTER TABLE user AUTO_INCREMENT = 1;

/* ---------------------------------------------------- */

-- SELECCIONAR RELACION ENTRE TABLAS img Y product

SELECT t1.id_product,
       name_product,
       price,
       reference,
       size,
       color,
       category,
       URL
FROM product AS t1
INNER JOIN img AS t2
      ON t1.id_product = t2.id_product;

/* ---------------------------------------------------- */

-- OBTENER UN PRODUCTO EN ESPECIFICO

SELECT t1.id_product,
       t1.id_user,
       name_product,
       price,
       reference,
       size,
       color,
       category,
       URL
FROM product AS t1
INNER JOIN img AS t2
      ON t1.id_product = t2.id_product
WHERE  t1.id_product = 1;

/* ---------------------------------------------------- */

-- ELIMINAR PRODUCTO DE TABLAS img Y product

DELETE t1, t2
FROM product AS t1
INNER JOIN img AS t2
      ON t1.id_product = t2.id_product
WHERE t1.id_product = 1;

/* ---------------------------------------------------- */

-- ACTUALIZAR PRODUCTO EN TABLAS img Y product

UPDATE product AS p
INNER JOIN img AS i 
      ON p.id_product = i.id_product
SET
  p.name_product = 'Nuevo nombre',
  p.price = 1000,
  p.reference = 'Nueva referencia',
  p.size = 'Nuevo tamaño',
  p.color = 'Nuevo color',
  p.category = 'Nueva categoría',
  i.URL = 'Nueva URL'
WHERE p.id_product = 1; -- Reemplaza 1 con el ID del producto que deseas actualizar

/* ---------------------------------------------------- */

/* filtrar producto por categoria,
   solamente lista productos q son C1, C2 ó C3 */

SELECT t1.id_product,
       t1.name_product,
       t1.price,
       t1.reference,
       t1.size,
       t1.color,
       t1.category,
       t2.URL
FROM product AS t1
INNER JOIN img AS t2 
      ON t1.id_product = t2.id_product
WHERE t1.category = "C1"
