class Comment {
  constructor(dataAccessObject) {
    this.dataAccessObject = dataAccessObject;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      message TEXT,
      image TEXT,
      created DATETIME DEFAULT CURRENT_TIMESTAMP)`;
    return this.dataAccessObject.run(sql);
  }

  deleteComments() {
    const sql = 'DELETE FROM comments';
    return this.dataAccessObject.run(sql);
  }

  createComment({ name, message }) {
    console.log(`name: ${name} || message: ${message}`);
    return this.dataAccessObject.run(
      'INSERT INTO comments (name, message) VALUES (?, ?)',
      [name, message]
    );
  }

  deleteCommentByID(id) {
    // console.log('id in deleteCommentByID function(): ', id);
    return this.dataAccessObject.run('DELETE FROM comments WHERE id = ?', [id]);
  }

  getComment(id) {
    return this.dataAccessObject.get('SELECT * FROM comments WHERE id = ?', [
      id,
    ]);
  }

  getComments() {
    return this.dataAccessObject.all('SELECT * FROM comments');
  }
}

module.exports = Comment;
