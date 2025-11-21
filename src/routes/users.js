import {getAdmins, getAllUsers} from "../repositories/users.js";

export default async function usersRoutes(fastify, opts) {
    fastify.get("/users", async (req, reply) => {
        return await getAllUsers();
    });

    fastify.get("/admins", async (req, reply) => {
        return await getAdmins();
    });
}
