const shortid = require("shortid");
const slugify = require("slugify");
const Product = require("../models/product");

exports.createProduct = (req, res) => {
  const { name, price, quantity, description, category, createdBy } = req.body;

  let productImages = [];

  if (req.files.length > 0) {
    productImages = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productImages,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });

    if (product) {
      res.status(201).json({ product });
    }
  });

  //   res.status(200).json({
  //     file: req.files,
  //     body: req.body,
  //   });
};
