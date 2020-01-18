const db = require('../_helpers/db');
const Post = db.Post;

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Post.find();
}

async function getById(id) {
  return await Post.findById(id);
}

async function create(postParam) {
  const post = new Post({
    author: postParam.author,
    title: postParam.title,
    body: postParam.body
  });

  // save post
  await post.save();
}

async function update(id, postParam) {
  await Post.findByIdAndUpdate(id, {
    $set: postParam
  });
}

async function _delete(id) {
  await Post.findByIdAndRemove(id);
}