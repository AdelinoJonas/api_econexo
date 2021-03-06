const connection = require("../connection");

// ==> Método responsável por criar um novo 'Product':
exports.createProduct = async (req, res) => {
  const {
    product_name,
    product_image,
    product_description,
    product_category,
    quantity,
    price,
  } = req.body;
  const response = await connection.query(
    "INSERT INTO product (product_name, product_image, product_description, product_category, quantity, price) VALUES ($1, $2, $3,$4)",
    [product_name, product_description, quantity, price]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: {
        product_name,
        product_image,
        product_description,
        product_category,
        quantity,
        price,
      },
    },
  });
};

// ==> Método responsável por listar todos os 'product':
exports.listAllProducts = async (req, res) => {
  const response = await connection.query(
    "SELECT * FROM product ORDER BY product_name ASC"
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'Product' pelo 'Id':
exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await connection.query(
    "SELECT * FROM product WHERE product_id = $1",
    [productId]
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'Product' pelo 'Id':
exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const {
    product_name,
    product_image,
    product_description,
    product_category,
    quantity,
    price,
  } = req.body;

  const response = await connection.query(
    "UPDATE product SET product_name = $1, quantity = $2, price = $3 WHERE product_id = $4",
    [
      product_name,
      product_image,
      product_description,
      product_category,
      quantity,
      price,
      productId,
    ]
  );

  res.status(200).send({ message: "Product Updated Successfully!" });
};

// ==> Método responsável por excluir um 'Product' pelo 'Id':
exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await connection.query("DELETE FROM product WHERE product_id = $1", [
    productId,
  ]);

  res.status(200).send({ message: "Product deleted successfully!", productId });
};

// ==> Método responsável por listar todos os 'Products' por categoria:
exports.listProductsByCategory = async (req, res) => {
  const response = await connection.query(
    "SELECT * FROM product ORDER BY product_category ASC"
  );
  res.status(200).send(response.rows);
};
