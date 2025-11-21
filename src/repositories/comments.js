import {pool} from "../db.js";

export async function getAllComments() {
    const {rows} = await pool.query(`
        SELECT *
        FROM comments
        ORDER BY comment_id;
    `);

    return rows;
}

export async function createComment(name, content) {
    const {rows} = await pool.query(`
        INSERT INTO comments (name, content)
        VALUES ($1, $2)
        RETURNING comment_id, name, content, created_at;
    `,
        [name || null, content]
    );

    return rows[0];
}