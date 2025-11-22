import * as argon2 from "argon2";
import {createUser, getAdmins, getAllUsers, getUserByLogin} from "../repositories/users.js";
import {signToken} from "../jwt.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";

export default async function usersRoutes(fastify, opts) {
  fastify.get("/users", async (req, reply) => {
    return await getAllUsers();
  });

  fastify.get("/admins", {preHandler: adminMiddleware}, async (req, reply) => {
    return await getAdmins();
  });

  fastify.get("/users/me", {preHandler: authMiddleware}, async (req, reply) => {
    const user = await getUserByLogin(req.user.login);
    if (!user) {
      return reply.code(401).send({error: "user_not_found"});
    }
    delete user["passhash"];

    return user;
  });

  fastify.post("/register", async (req, reply) => {
    const {login, name, password} = req.body ?? {};
    if (!login || !name || !password) {
      return reply.code(400).send({error: "missing_fields"});
    }

    const passhash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 15, // 32 MiB
      timeCost: 3,
      parallelism: 1
    });

    try {
      const user = await createUser(login, name, passhash, false);
      return reply.code(201).send(user);
    } catch (e) {
      req.log.error(e);
      return reply.code(409).send({error: "login_taken"});
    }
  });

  fastify.post("/login", async (req, reply) => {
    const {login, password} = req.body ?? {};
    if (!login || !password) {
      return reply.code(400).send({error: "missing_fields"});
    }

    const user = await getUserByLogin(login);
    if (!user) {
      return reply.code(401).send({error: "unknown_user"});
    }

    const ok = await argon2.verify(user.passhash, password);
    if (!ok) {
      return reply.code(401).send({error: "bad_credentials"});
    }

    const token = signToken({
      user_id: user.user_id,
      login: user.login,
      is_admin: user.is_admin
    });

    return {token};
  });
}
