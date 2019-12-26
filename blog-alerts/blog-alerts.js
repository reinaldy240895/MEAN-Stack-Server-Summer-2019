const express = require('express');
const { JSDOM } = require('jsdom');
const errorHandler = require('../_helpers/error-handler');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const router = express.Router();

router.get('/', (req, res) => {
  const blogUrl = 'http://blog.naver.com/PostList.nhn?blogId=tourvancity&parentCategoryNo=16&skinType=&skinId=&from=menu';
  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    try {
      // res.send(this.responseText);
      const blogPostsString = toBlogPostsString(this.responseText);
      res.send(blogPostsString);
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

function toBlogPostsString(responseText) {
  const dom = new JSDOM(responseText);
  const nodeList = dom.window.document.querySelectorAll('.post .post-back .wrap_blog2_list.wrap_blog2_notice .wrap_td .ell2.pcol2 a.pcol2');

  const blogPosts = [];

  nodeList.forEach(post => {
    blogPosts.push({
      text: post.textContent,
      link: post.getAttribute('href')
    });
  });

  const returnString = JSON.stringify(blogPosts);
  return returnString;
}

module.exports = router;