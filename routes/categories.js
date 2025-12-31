const express = require('express');
const router = express.Router();

const {getCategories,createCategory, deleteCategory} = require('../database');


router.get('/', (req, res) => {
    getCategories((err, categories) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error fetching categories' });
        }
        res.status(200).json(categories);
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }
    createCategory({ name }, (err, categoryId) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error creating category' });
        }
        res.status(201).json
        ({ 
            message: 'Category created successfully', 
            categoryId 
        });
    });
});

router.delete('/:categoryId', (req, res) => {
    const categoryId = req.params.categoryId;
    deleteCategory(categoryId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error deleting category' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    });
});


module.exports = router;