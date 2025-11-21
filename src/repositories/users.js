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
