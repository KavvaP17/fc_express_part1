const express = require('express');
const router = express.Router();
const news = require('../data/news');


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(news);
});

router.get('/:id', function (req, res, next) {
    const currentNews = news.articles.find(article => article.id.toString() === req.params.id);
    if (currentNews) {
        res.send(currentNews);
    } else {
        res.send(`News not found`);
    }
});

router.post('/', function (req, res, next) {
    const currentNews = news.articles.find(article => article.id.toString() === req.params.id);
    if (currentNews) {
        updateNews(currentNews, req.body);
        res.send('OK');
    } else {
        news.articles.push(req.body);
        res.send('OK');
    }
});

router.put('/:id', function (req, res, next) {
    const currentNews = news.articles.find(article => article.id.toString() === req.params.id);
    if (currentNews) {
        updateNews(currentNews, req.body);
        res.send('OK');
    } else {
        news.articles.push(req.body);
        res.send('OK');
    }
});

router.delete('/:id', function (req, res, next) {
    news.articles = news.articles.filter(article => article.id.toString() !== req.params.id);
    res.send('OK');
});

function updateNews(oldValue, newValue) {
  for(let key in newValue) {
    oldValue[key] = newValue[key];
  }
}

module.exports = router;
