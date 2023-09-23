# Prueba Técnica Full Stack de [Feria del Brasier y Solo Kukos (Marrocar)](https://feriadelbrasier.co/)

### 1. Tecnologías en que hice el proyecto
  * [Git](https://www.udemy.com/course/git-github/)
  * [GitHub](https://github.com/DanielPinedaM/)
  * [ESLint](https://youtu.be/QpDpRmlFfqI)
  * [HTML 5](https://www.youtube.com/watch?v=-oK6zL01fNM&feature=youtu.be)
  * [CSS 3](https://www.youtube.com/watch?v=udGrXWeJp1Y&feature=youtu.be)
  * [Tailwind](https://www.youtube.com/watch?v=h5HQVHTpeHs&feature=youtu.be)
  * [TypeScript](https://www.udemy.com/course/typescript-guia-completa/)
  * [NextJS 13.5.1](https://www.udemy.com/course/nextjs-fh/)
  * [npm serverless-mysql (API para conexión a base de datos)](https://www.npmjs.com/package/serverless-mysql)
  * [Axios (peticiones HTTP)](https://axios-http.com/es/docs/intro) 
  * [Thunder Client (testear API)](https://youtu.be/HZx5X3s_Jl4?si=3i4oFnX1b7l74Obt)
  * MySQL server (base de datos)
  * MySQL Workbench (SGBD, gestor de base de datos)

---

### 2. Demostración funcionamiento proyecto

Video privado en YouTube: [https://youtu.be/-54ouxu93tE](https://youtu.be/-54ouxu93tE)

---

### 3. Modelo Entidad Relación

* Llaves:
  * **PK:** Primary Key
  * **FK:** Foreign Key

* Relación:
  * **uno:** ![uno](/readme_img/uno.PNG)
  * **muchos:** ![muchos](/readme_img/muchos.PNG)

* Un usuario administrador puede guardar, actualizar y eliminar uno o muchos productos.

* Un usuario cliente puede ver uno o muchos productos.

* Un producto tiene una o muchas imágenes.

"No tenga en cuenta unidades ya que en esta ocasión no se venderá."

Al ignorar la tabla venta (factura), este es el modelo relacional:

![modelado](/readme_img/modelado.PNG)

---

### 4. Filtrar producto por categoría

En otras palabras: Solamente listar productos que son categoria C1, C2 ó C3

Hay dos formas de hacerlo:

**1.** **Desde backend**, ejecutar consulta, hacer petición Server-side scripting y renderizar la data desde Client-side rendering

Esta es la mejor forma, porque el servidor es más rapido que el cliente

* C1
![categoria_1](/readme_img/C1.PNG)

* C2
![categoria_2](/readme_img/C2.PNG)

* C3
![categoria_3](/readme_img/C3.PNG)

**2.** **Desde frontend**

Si desde el backend estoy listando todos los productos en [http://localhost:3000/products](http://localhost:3000/products) despues de obtener la respuesta puedo hacer un [.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) para filtrar por categorías (C1, C2, C3...)

Cuando hay demasiados datos esto es lento porque se tiene que iterar la data para filtrar.

```javascript
/* data que viene desde API backend */
const products = [
  {
    id_product: 1,
    name_product: 'panty',
    price: 10000,
    reference: 'A',
    size: 'XS',
    color: 'rojo',
    category: 'C1',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792',
  },
  {
    id_product: 2,
    name_product: 'brasier',
    price: 20000,
    reference: 'A',
    size: 'XS',
    color: 'verde',
    category: 'C1',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792',
  },
  {
    id_product: 3,
    name_product: 'tanga',
    price: 30000,
    reference: 'A',
    size: 'XS',
    color: 'rojo',
    category: 'C1',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792',
  },
  {
    id_product: 4,
    name_product: 'levantacola',
    price: 20000,
    reference: 'A',
    size: 'XS',
    color: 'negro',
    category: 'C2',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792',
  },
  {
    id_product: 5,
    name_product: 'panty',
    price: 20000,
    reference: 'A',
    size: 'XS',
    color: 'azul',
    category: 'C2',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792',
  },
  {
    id_product: 6,
    name_product: 'panty',
    price: 60000,
    reference: 'A',
    size: 'XS',
    color: 'rojo',
    category: 'C3',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792',
  },
];

/* FILTRAR */
// C1 -> categoría 1
const C1 = products?.filter((product, i) => product?.category === 'C1');
console.log(C1);
/*
[
  {
    id_product: 1,
    name_product: 'panty',
    price: 10000,
    reference: 'A',
    size: 'XS',
    color: 'rojo',
    category: 'C1',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792'
  },
  {
    id_product: 2,
    name_product: 'brasier',
    price: 20000,
    reference: 'A',
    size: 'XS',
    color: 'verde',
    category: 'C1',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792'
  },
  {
    id_product: 3,
    name_product: 'tanga',
    price: 30000,
    reference: 'A',
    size: 'XS',
    color: 'rojo',
    category: 'C1',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792'
  }
]
*/

// C2 -> categoría 2
const C2 = products?.filter((product, i) => product?.category === 'C2');
console.log(C2);
/*
[
  {
    id_product: 4,
    name_product: 'levantacola',
    price: 20000,
    reference: 'A',
    size: 'XS',
    color: 'negro',
    category: 'C2',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792'
  },
  {
    id_product: 5,
    name_product: 'panty',
    price: 20000,
    reference: 'A',
    size: 'XS',
    color: 'azul',
    category: 'C2',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792'
  }
]
*/

// C3 -> categoría 3
const C3 = products?.filter((product, i) => product?.category === 'C3');
console.log(C3);
/*
[
  {
    id_product: 6,
    name_product: 'panty',
    price: 60000,
    reference: 'A',
    size: 'XS',
    color: 'rojo',
    category: 'C3',
    URL: 'https://feriadelbrasier.co/cdn/shop/files/CIE2034ROJO_3_1800x1800.jpg?v=1693312792'
  }
]
*/
```

---

### 5. Rutas:

**Frontend**

[http://localhost:3000/](http://localhost:3000/) redirecciona a [http://localhost:3000/users](http://localhost:3000/users)

Función | URL
------------ | -------------
listar usuarios | [http://localhost:3000/users](http://localhost:3000/users)
listar productos | [http://localhost:3000/products](http://localhost:3000/products)
guardar producto | [http://localhost:3000/new](http://localhost:3000/new) 
actualizar producto | [http://localhost:3000/products/edit/1](http://localhost:3000/products/edit/1)

**Backend (API - CRUD)**

Método HTTP | Función | URL
------------ | ------------|-------------|
GET | listar usuarios | [http://localhost:3000/api/users](http://localhost:3000/api/users)
GET | listar productos | [http://localhost:3000/api/products](http://localhost:3000/api/products)
POST | guardar producto | [http://localhost:3000/api/products](http://localhost:3000/api/products)
GET | obtener un producto en especifico | [http://localhost:3000/api/products/1](http://localhost:3000/api/products/1)
DELETE | eliminar producto |  [http://localhost:3000/api/products/1](http://localhost:3000/api/products/1)
PUT | actualizar producto | [http://localhost:3000/api/products/1](http://localhost:3000/api/products/1)

```javascript
/* JSON (cuerpo) de la peticion guardar producto */
{
    "name_product": "nombre producto",
    "price": 20000,
    "reference": "A",
    "size": "XL",
    "color": "verde",
    "category": "C1",
    "URL": "https://feriadelbrasier.co/cdn/shop/products/MAR8062-1100-1_1800x1800.jpg?v=1683123425"
}
```

```javascript
/* JSON (cuerpo) de la peticion actualizar producto */
{
    "name_product": "nuevo producto",
    "price": 888,
    "reference": "nueva referencia",
    "size": "S",
    "color": "nuevo color",
    "category": "C1",
    "URL": "https://feriadelbrasier.co/cdn/shop/products/STR110005-1100-1_1800x1800.jpg?v=1683128420"
}
```

---

### 6. Consultas MySQL:

Usadas para obtener los datos y crear la base de datos. Estan en el directorio:

[https://github.com/DanielPinedaM/producto/blob/main/database/product_db.sql](https://github.com/DanielPinedaM/producto/blob/main/database/product_db.sql)

```javascript
.../src/database/product_db.sql
```

![database](/readme_img/database.PNG)

---

### 7. Comandos de MySQL:

* Iniciar shell de MySQL

**root** usuario administrador

**1234** clave de usuario administrador

```javascript
mysql -uroot -p1234
```

![uroot](/readme_img/uroot.PNG)

* Listar bases de datos
```javascript
show databases;
```
![show](/readme_img/show.PNG)

---

### 8. Maquetación Responsive

![1](/readme_img/responsive/1.PNG)

![2](/readme_img/responsive/2.PNG)

![3](/readme_img/responsive/3.PNG)

![4](/readme_img/responsive/4.PNG)

![5](/readme_img/responsive/5.PNG)

![6](/readme_img/responsive/6.PNG)

![7](/readme_img/responsive/7.PNG)

![8](/readme_img/responsive/8.PNG)

![9](/readme_img/responsive/9.PNG)

![10](/readme_img/responsive/10.PNG)
