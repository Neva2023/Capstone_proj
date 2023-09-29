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

export async function create(email, first_name, last_name, occupation, password_hash) {
    const sql = `insert into users (email, first_name,last_name,occupation, password_hash) values(?,?,?,?,?);`
       return await db.run(sql, [email,first_name,last_name,occupation,password_hash])
    }


export async function deleteUser(email) {
    const sql = `delete from users where email = ?`
    return await db.run(sql, email)
}

export async function updateUser(email, first_name, last_name, occupation, password_hash){
    const sql= `update users set first_name = ?, last_name= ?, occupation = ?,password_hash = ? where email = ?`
    return await db.run(sql, [email, first_name,last_name,occupation,password_hash])
}

export async function login(email) {
    const query = `SELECT email, password_hash FROM users WHERE email = ?`;
    return await db.all(query,email)

  }