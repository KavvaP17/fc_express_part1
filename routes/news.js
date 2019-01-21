const express = require('express');
const router = express.Router();
const news = require('../data/news');
const logger = require('../utils/logger');

router.get('/', function (req, res, next) {
    logger.info(`GET news/`);
    res.send(news);
});

router.get('/:id', function (req, res, next) {
    const currentNews = news.articles.find(article => article.id.toString() === req.params.id);
    if (currentNews) {
        logger.info(`GET news/${req.params.id}`);
        res.send(currentNews);
    } else {
        logger.error(`GET news/${req.params.id}: News not found`);
        res.send(`News not found`);
    }
});

router.post('/', function (req, res, next) {
    const article = req.body;
    const articleId = + Date.now();
    article.id = articleId;
    news.articles.push(article);
    logger.info(`POST news/`);
    res.send('OK');
});

router.put('/:id', function (req, res, next) {
    const currentNews = news.articles.find(article => article.id.toString() === req.params.id);
    if (currentNews) {
        for(let key in req.body) {
            currentNews[key] = req.body[key];
        }
        logger.info(`PUT news/${req.params.id}`);
        res.send('OK');
    } else {
        logger.error(`PUT news/${req.params.id}: News not found`);
        res.send('News not found');
    }
});

router.delete('/:id', function (req, res, next) {
    news.articles = news.articles.filter(article => article.id.toString() !== req.params.id);
    logger.info(`DELETE news/${req.params.id}`)
    res.send('OK');
});

module.exports = router;
