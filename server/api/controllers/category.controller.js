const { Categories, Items } = require('../models');


exports.addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Categories.create({ name, description });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            include: [Items]
        });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Categories.findByPk(id, {
            include: [Items]
        });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Categories.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Categories.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ message: 'Category not found' });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
