const { initializeDatabase } = require("./db/db.connect");
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "https://shopping-frontend-8c7x.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const Product = require("./models/shopping.model");

initializeDatabase();

// TO ADD PRODUCT

async function addProduct(newProduct) {
  try {
    const product = new Product(newProduct);
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    console.log(error);
  }
}

app.post("/product", async (req, res) => {
  try {
    const product = await addProduct(req.body);
    if (product) {
      res.status(200).json({ message: "Product added succesfully!" });
    } else {
      res.status(500).json({ message: "Failed to add Product..." });
    }
  } catch (error) {
    res.status(404).json({ error: "Error ocurred..." });
    console.log(error);
  }
});

// TO READ ALL PRODUCTS

async function readAllProducts() {
  try {
    const allProducts = await Product.find();
    return allProducts;
  } catch (error) {
    console.log(error);
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const allProducts = await readAllProducts();
    if (allProducts) {
      res.json(allProducts);
    } else {
      res.status(404).json({ message: "Failed to fetch  Products!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error ocurred while fetching Product!" });
  }
});

// READ PRODUCT BY ID

async function readProductById(id) {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
  }
}

app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await readProductById(req.params.productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Failed to fetch product!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error ocurred while fetching Product!" });
  }
});

// READ PRODUCT BY CATEGORY

function readProductByCategory(category) {
  try {
    const product = Product.find({ productCategory: category });
    return product;
  } catch (error) {
    console.log(error);
  }
}

app.get("/api/categories/:category", async (req, res) => {
  try {
    const category = await readProductByCategory(req.params.category);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Failed to fetch category!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error ocurred while fetching Category!" });
  }
});

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
