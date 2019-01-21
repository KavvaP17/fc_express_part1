const express = require('express');
const router = express.Router();
const news = require('../data/news');
const logger = require('../utils/logger');

function getNextNewsId() {
    let newsId = + Date.now();
    while (news.articles.find(article => article.id === newsId)) {
        newsId++;
    }
    return newsId;
}

router.get('/', function (req, res, next) {
    try {
        logger.info(`GET news/`);
        res.send(news);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', function (req, res, next) {
    try {
        const currentNews = news.articles.find(article => article.id.toString() === req.params.id);
        if (currentNews) {
            logger.info(`GET news/${req.params.id}`);
            res.send(currentNews);
        } else {
            logger.error(`GET news/${req.params.id}: News not found`);
            throw new Error('News not found');
        }
    }
    catch (err) {
        next(err);
    }
});

router.post('/', function (req, res, next) {
    try {
        const newArticle = Object.assign({ id : getNextNewsId() }, req.body);
        news.articles.push(newArticle);
        logger.info(`POST news/`);
        res.send('OK');
    } catch (err) {
        next(err);
    }
});

router.put('/:id', function (req, res, next) {
    try {
        const currentNews = news.articles.find(article => article.id.toString() === req.params.id);
        if (currentNews) {
            for(let key in req.body) {
                currentNews[key] = req.body[key];
            }
            logger.info(`PUT news/${req.params.id}`);
            res.send('OK');
        } else {
            logger.error(`PUT news/${req.params.id}: News not found`);
            throw new Error('News not found');
        }
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', function (req, res, next) {
    try {
        news.articles = news.articles.filter(article => article.id.toString() !== req.params.id);
        logger.info(`DELETE news/${req.params.id}`)
        res.send('OK');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
