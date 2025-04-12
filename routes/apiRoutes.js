const router = require('express').Router();
const bcrypt = require('bcrypt'); // bcrypt for hashing passwords
const { pool, connectToDb } = require('../db/connection'); // Import the connection pool

// Write the updated data to the JSON file
// const storeFx = db => {
//   writeFile(path.join(__dirname, '../db/data.json'), JSON.stringify(db, null, 2), err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error signing up.');
//     }else{
//       console.log('Data stored');
//     }
//   });
// };

// In-memory user store
// NOTE: In a production app, use a database instead of an in-memory array.

// POST route for signup
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  await connectToDb();

  const hashedPassword = await bcrypt.hash(password, 10);

  pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;', [username, hashedPassword], (err, { rows }) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error signing up.');
    };

    const { id, username } = rows[0];
    const newUser = { id, username };
    console.log('New user created:', newUser);
    res.json(newUser);
  })
});


// POST route for login
router.post('/login', async (req, res) => {
  await connectToDb();

  const { username, password } = req.body;
  pool.query('SELECT * FROM users WHERE username = $1;', [username], async (err, { rows }) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error logging in.');
    };

    const user = rows[0];

    if (!user) {
      console.log('User not found:', username);
      return res.status(400).send('Invalid username or password.');
    }

    try {
      // Compare the password provided with the stored hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // If password is correct, login is successful
        // res.send(`Welcome, ${username}! You are now logged in.`);
        return res.json(user);
        // console.log('User logged in:', user);
      } else {
        console.log('Invalid password for user:', username);
        res.status(400).send('Invalid username or password.');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error logging in.');
    }

    // res.json(result);

    // if (err) {
    //   console.error(err);
    //   return res.status(500).send('Error logging in.');
    // };

    // if (result.length === 0) {
    //   return res.status(400).send('Invalid username or password.');
    // };

    // const user = result[0];
    // try {
    //   // Compare the password provided with the stored hashed password
    //   const match = await bcrypt.compare(password, user.password);
    //   if (match) {
    //     // If password is correct, login is successful
    //     res.send(`Welcome, ${username}! You are now logged in.`);
    //     console.log('User logged in:', user);

    //   } else {
    //     res.status(400).send('Invalid username or password.');
    //   }
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send('Error logging in.');
    // }
  });
});

router.post('/data', async (req, res) => {
  await connectToDb();
  const { username } = req.body;

  console.log('username: ', username);

  pool.query('SELECT id FROM users WHERE username = $1', [username], async (err, { rows }) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error getting data.');
    };

    if (rows.length === 0) {
      return res.status(404).send('User not found.');
    };

    const userId = rows[0].id;
    pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId], (err, { rows }) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error getting data.');
      };

      console.log('rows: ', rows);
      res.json(rows);
    });
  });

});

router.put('/data', (req, res) => {

  let newDb = db.filter(user => user.username !== req.body.username);

  newDb.push(req.body);
  writeFile(path.join(__dirname, '../db/data.json'), JSON.stringify(newDb, null, 2), err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error signing up.');
    } else {
      console.log('Data stored');
      res.json('success');
    }
  });
});

router.post('/tasks', (req, res) => {
  const { user_id, date, task, status } = req.body;

  pool.query('SELECT id FROM tasks WHERE user_id = $1 AND date = $2', [user_id, date], (err, { rows }) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving task.');
    };

    if (rows.length > 0) {
      // Task already exists, update it
      const id = rows[0].id;

      if (task=='') {
        // If task is empty, delete it
        pool.query('DELETE FROM tasks WHERE id = $1', [id], (err, { rows }) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Error deleting task.');
          };

          console.log('rows: ', rows);

          res.json(rows[0]);
        });
        return;
      }

      pool.query('UPDATE tasks SET task = $1, status = $2 WHERE id = $3', [task, status, id], (err, { rows }) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error updating task.');
        };

        console.log('rows: ', rows);

        res.json(rows[0]);
      });

    } else {
      // Task does not exist, insert it
      pool.query('INSERT INTO tasks (user_id, date, task, status) VALUES ($1, $2, $3, $4)', [user_id, date, task, status], (err, { rows }) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error saving task.');
        };

        console.log('rows: ', rows);

        res.json(rows[0]);
      });
    }

  });
});

// GET route for the login page
module.exports = router;



