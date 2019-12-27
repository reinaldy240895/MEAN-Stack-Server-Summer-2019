const express = require('express');
const { JSDOM } = require('jsdom');
const errorHandler = require('../_helpers/error-handler');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const router = express.Router();

router.get('/', (req, res) => {
  const blogUrl = 'http://blog.naver.com/prologue/PrologueList.nhn?blogId=tourvancity&directAccess=true';
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
  const nodeList = dom.window.document.querySelectorAll('.post .post-back #prologue .p_post_top .p_title a.pcol1');

  const blogPosts = [];

  nodeList.forEach(post => {
    blogPosts.push({
      text: post.textContent,
      // text: post.getAttribute('title'),
      link: post.getAttribute('href')
    });
  });

  const returnString = JSON.stringify(blogPosts);
  return returnString;
}

module.exports = router;