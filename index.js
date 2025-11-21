import "dotenv/config";
import Fastify from 'fastify';
import usersRoutes from "./src/routes/users.js";
import {pool} from "./src/db.js";

const fastify = Fastify({
    logger: true
});

fastify.addHook("onClose", async () => {
    await pool.end();
});

fastify.get('/', async (request, reply) => {
    return "Hello world!";
});

fastify.post('/review', async (req, reply) => {
    const body = req.body; // { user: "...", pass: "..." }
    return { ok: true, data: body };
});

fastify.register(usersRoutes);

fastify.listen({ port: Number(process.env.API_PORT), }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});
