const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

export default (req, res) => {
  db.serialize(() => {
    db.run('CREATE TABLE users (id INT, name TEXT)');

    db.run(`INSERT INTO users (id, name)
            VALUES (1, 'John Doe'), (2, 'Jane Doe')`);

    db.each('SELECT id, name FROM users', (err, row) => {
      console.log(row.id, row.name);
    });
  });

  res.status(200).send('Table created');
};
