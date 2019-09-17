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
  // return await Post.find().select('-hash');
  return await Post.find();
}

async function getById(id) {
  // return await Post.findById(id).select('-hash');
  return await Post.findById(id);
}

async function create(postParam) {
  const post = new Post({
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

  // const post = await Post.findById(id);

  // // validate
  // if (!post) throw 'Post not found';
  // if (post.email !== postParam.email && await Post.findOne({
  //     email: postParam.email
  //   })) {
  //   throw 'Email "' + postParam.email + '" is already taken';
  // }

  // // copy postParam properties to post
  // // TODO: Check if working properly
  // Object.assign(post, postParam);

  // await post.save();
}

async function _delete(id) {
  await Post.findByIdAndRemove(id);
}