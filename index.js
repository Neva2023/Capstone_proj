import express from 'express';
import sqlite3 from 'sqlite3';
import exphbs from 'express-handlebars';
import getRecommendation from './bootcamp/recomm.js';

let db = new sqlite3.Database( './mydatabase.db', (err) => {
    if (err) {
        console.error('Error connecting to the database', err.message);
    }
    console.log('Connected to the SQLite database.');
});



import { create, getDetails, deleteUser, updateUser,UserComments, login , aim} from './code.sql.js';


const app = express();


app.use(express.static('public'))
app.use(express.json())

 

app.get('/api/details', async function (req, res){
    const users_info = await getDetails()


res.json ({
    users_info
})
});

app.post('/api/details/login', async function (req, res) {
  try {
      const email = req.body.email;
      const password_hash = req.body.password_hash;
      
      const loginResult = await login(email);

      // Check if loginResult is defined and if it contains any items
      if (!loginResult || loginResult.length === 0) {
          return res.status(400).json({
              status: 'Login-failed',
              message: 'User not found'
          });
      }

      const username = loginResult[0].email;
      const password = loginResult[0].password_hash;
      
      if (email === username && password === password_hash) {
          res.json({
              status: 'Log-in-successful',
              loginResult
          });
      } else {
          res.json({
              status: 'Login-failed',
          });
      }
  } catch (error) {
      // Handle the error gracefully
      res.status(500).json({
          status: 'error',
          message: 'Internal Server Error'
      });
  }
});


// app.post('/api/details/login', async function (req, res) {
//     const email = req.body.email;
//     const password_hash = req.body.password_hash;
    
//     const loginResult = await login(email);
   
//     const username=loginResult[0].email;
//     const password=loginResult[0].password_hash;
//     console.log(username +  password)
//     if (email=== username && password===password_hash) {
//       res.json({
//         status: 'Log-in-successful',
//         loginResult
//       });
//     } else {
//       res.json({
//         status: 'Login-failed',
//       });
//     }
//     });


app.post('/api/details/create', async function (req, res) {
    const email = req.body.email
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const occupation = req.body.occupation
    const numbers = req.body.numbers
    const addresss = req.body.addresss
    const password_hash = req.body.password_hash
 
    

    const users_info = await create(email,first_name, last_name,occupation,numbers,addresss,password_hash)
   
    
 res.json ({

    users_info,
     status : 'successfully registered'
})
});

app.post('/api/details/aim', async function (req, res) {

  const brief = req.body.brief
  const first_name = req.body.first_name
 
   await aim(brief,first_name)

res.json ({


   status : 'successfully submitted'
})
});

app.post('/api/details/UserComments', async function (req, res) {

  
  const first_name = req.body.first_name
  const comment = req.body.comment
 
   await UserComments(comment,first_name)

res.json ({


   status : 'successfully uploaded'
})
});

app.post('/api/details/deleteUser', async function (req, res) {
    const email = req.body.email
    

   await deleteUser(email)
   const users_info = await getDetails()

 
    
 res.json ({

    users_info,
    status : 'success'
})
});


app.post('/api/details/updateUser',async function(req,res){
    const email = req.body.email
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const occupation = req.body.occupation
    const password_hash = req.body.password_hash
    
    const users_info = await updateUser(email,first_name, last_name,occupation,password_hash)
    res.json({

        users_info,
        status : 'success'
    })
});

app.get('/api/recomm', function(req, res) {

  const FOS = req.query.FOS;
  const soil = req.query.soil;
  const rainfall = req.query.rainfall;
  const waterTable = req.query.waterTable;

  if (!FOS & !soil & !rainfall & !waterTable) {
      res.json ({
          error : 'Please enter all the information requested'
      })
  }

  res.json ({
      "recommendation" : getRecommendation(FOS, soil, rainfall, waterTable),
      
  });
});


app.use(express.json());

app.get('/user/details', (req, res) => {
    const useremail = req.query.email;  // Assumes user ID is passed as a query parameter

    const sql = 'SELECT email, first_name, last_name, occupation, numbers, addresss, password_hash FROM users WHERE email = ?';

    db.get(sql, [useremail], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(row);  // Sends back the fetched row
    });
});









const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)