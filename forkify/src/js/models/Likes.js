export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };

    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    this.likes = this.likes.filter(like => like.id !== id);
  }

  isLiked(id) {
    return this.likes.findIndex(like => like.id === id) !== -1;
  }

  getNumLikes() {
    this.likes.length;
  }
}
