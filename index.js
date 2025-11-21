import "dotenv/config";
import Fastify from 'fastify';
import cors from "@fastify/cors";
import {pool} from "./src/db.js";
import usersRoutes from "./src/routes/users.js";
import commentsRoutes from "./src/routes/comments.js";

const fastify = Fastify({
    logger: true
});

fastify.register(cors, {
    origin: (process.env.CORS_ORIGIN === "true")
});

fastify.addHook("onClose", async () => {
    await pool.end();
});

fastify.get('/', async (request, reply) => {
    return "Welcome to lucors webpage api!";
});

fastify.get("/health", async () => ({ ok: true }));

fastify.register(usersRoutes);
fastify.register(commentsRoutes);

fastify.listen({ port: Number(process.env.API_PORT), }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});
