import {pool} from "../db.js";

export async function getAllUsers() {
  const {rows} = await pool.query(`
    SELECT user_id, login, name, is_admin
    FROM users
    ORDER BY user_id;
  `);

  return rows;
}

export async function getAdmins() {
  const {rows} = await pool.query(`
    SELECT user_id, login, name, is_admin
    FROM users
    WHERE is_admin = $1
    ORDER BY user_id;
  `,
    [true]
  );

  return rows;
}

export async function createUser(login, name, passhash, isAdmin = false) {
  const {rows} = await pool.query(`
    INSERT INTO users (login, name, passhash, is_admin)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id, login, name, is_admin;
  `,
    [login, name, passhash, isAdmin]
  );
  return rows[0];
}

export async function getUserByLogin(login) {
  const {rows} = await pool.query(`
    SELECT user_id, login, name, passhash, is_admin
    FROM users
    WHERE login = $1;
  `,
    [login]
  );
  return rows[0] || null;
}
