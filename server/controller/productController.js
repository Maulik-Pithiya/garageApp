import Product from "../model/productModel.js";

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { title, brand, description, price, mrp, image } = req.body;

        // Simple validation
        if (!title || !description || price === undefined || mrp === undefined || !image) {
            return res.status(400).json({ message: "Title, description, price, mrp, and image are required." });
        }

        const newProduct = new Product({
            title,
            brand: brand || "",
            description,
            price,
            mrp,
            image,
            inStock: req.body.inStock !== undefined ? req.body.inStock : true,
            visible: req.body.visible !== undefined ? req.body.visible : true
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update an existing product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productExist = await Product.findById(id);

        if (!productExist) {
            return res.status(404).json({ message: "Product not found." });
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productExist = await Product.findById(id);

        if (!productExist) {
            return res.status(404).json({ message: "Product not found." });
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
