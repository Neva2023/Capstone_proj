import express from 'express';



import { create, getDetails, deleteUser, updateUser, login } from './code.sql.js';




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
    const email = req.body.email;
    const password_hash = req.body.password_hash;

    const loginResult = await login(email);
    console.log(loginResult)
// res.json({
//   status:"success"
// })
    const username=loginResult[0].email;
    const password=loginResult[0].password_hash;
    console.log(username +' details'+ password)
    if (email=== username && password===password_hash) {
      res.json({
        status: 'Log-in-successful',
      });
    } else {
      res.json({
        status: 'Login-failed',
      });
    }
    });


app.post('/api/details/create', async function (req, res) {
    const email = req.body.email
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const occupation = req.body.occupation
    const password_hash = req.body.password_hash
 
    

    const users_info = await create(email,first_name, last_name,occupation,password_hash)
   
    
 res.json ({

    users_info,
     status : 'successfully registered'
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












const PORT = process.env.PORT || 4011;
app.listen(PORT, () => `Server started ${PORT}`)