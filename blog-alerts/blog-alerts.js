const express = require('express');
const errorHandler = require('../_helpers/error-handler');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const router = express.Router();

router.get('/', (req, res) => {
  const blogUrl = 'http://blog.naver.com/PostList.nhn?blogId=tourvancity&parentCategoryNo=16&skinType=&skinId=&from=menu';
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    try {
      res.send(this.responseText);
    } catch (err) {
      errorHandler(err, req, res);
    }
  };
  // xhr.onerror = function () {
  //   console.log(this);
  // };
  xhr.open('GET', blogUrl);
  // xhr.responseType = 'document';
  xhr.send();
});

module.exports = router;