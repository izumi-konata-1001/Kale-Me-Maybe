const express = require('express');
const router = express.Router();
const recipeDao = require('../data/recipe-dao.js');

router.get('/', async (req, res) => {
    try {
        const recipes = await recipeDao.getAllRecipes(); // 正确获取所有食谱数据
        res.json({ recipes }); // 在获取数据后发送响应
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' }); // 错误处理
    }
});

module.exports = router;