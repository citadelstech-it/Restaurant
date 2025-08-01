const { Items, Categories } = require('../models');
const cloudinary = require('../../config/cloudinary');


exports.addItem = async (req, res) => {
    try {
        const { name, price, description, inStock, categoryId } = req.body;

        // Validate required fields
        if (!name || !price || inStock === undefined || !categoryId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate price and inStock
        if (isNaN(price) || price < 0) {
            return res.status(400).json({ message: 'Price must be a non-negative number' });
        }
        if (!Number.isInteger(Number(inStock)) || inStock < 0) {
            return res.status(400).json({ message: 'inStock must be a non-negative integer' });
        }

        const category = await Categories.findByPk(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        let imageUrl = null;
        let imagePublicId = null;

        if (req.file) {
            imageUrl = req.file.path;
            imagePublicId = req.file.filename;
        }

        const item = await Items.create({ name, price, description, inStock, categoryId, imageUrl, imagePublicId });
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getItems = async (req, res) => {
    try {
        const items = await Items.findAll({ include: [{ model: Categories }] });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Items.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        const updatedData = req.body;

        if (req.file) {
            if (item.imagePublicId) {
                await cloudinary.uploader.destroy(item.imagePublicId);
            }
            updatedData.imageUrl = req.file.path;
            updatedData.imagePublicId = req.file.filename;
        }

        await item.update(updatedData);
        res.json({ message: 'Item updated successfully', item });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Items.findByPk(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (item.imagePublicId) {
            await cloudinary.uploader.destroy(item.imagePublicId);
        }

        await item.destroy();
        res.json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
