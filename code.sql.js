import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';




const  db = await sqlite.open({
    filename:  './mydatabase.db',
    driver:  sqlite3.Database
});

await db.migrate();

export async function getDetails () {
    return db.all('select * from users');

}

export async function create(email, first_name, last_name, occupation,numbers,addresss, password_hash) {
    const sql = `insert into users (email, first_name,last_name,occupation,numbers,addresss, password_hash) values(?,?,?,?,?,?,?);`
       return await db.run(sql, [email,first_name,last_name,occupation,numbers,addresss,password_hash])
    }


export async function deleteUser(email) {
    const sql = `delete from users where email = ?`
    return await db.run(sql, email)
}

export async function updateUser(email, first_name, last_name, occupation,numbers,addresss, password_hash){
    const sql= `update users set first_name = ?, last_name= ?, occupation = ?,numbers= ?, addresss= ? ,password_hash = ? where email = ?`
    return await db.run(sql, [email, first_name,last_name,occupation,numbers,addresss,password_hash])
}

export async function login(email) {
    const query = `SELECT * FROM users WHERE email = ?`;
    return await db.all(query,email)

  }

  export async function aim(brief,first_name) {
    const sql = `insert into aim (brief,first_name) values(?,?)`;
    return await db.run(sql,[brief,first_name])

  }
  

  export async function UserComments(comment,first_name) {
    const sql = `insert into comments (comment,first_name) values(?,?)`;
    return await db.run(sql,[comment,first_name])

}


export async function images(picture_data){

    const sql = `insert into users(picture_data) value(?)`
    return await db.run(sql,picture_data)
}