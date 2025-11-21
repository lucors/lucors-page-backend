CREATE TABLE users (
    user_id SERIAL primary key,
    login VARCHAR(100) NOT NULL,
    name VARCHAR(200) NOT NULL,
    passhash VARCHAR(300) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE comments (
    comment_id SERIAL primary key,
    name        VARCHAR(100),
    content     TEXT NOT NULL,
    is_moderated BOOLEAN DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);