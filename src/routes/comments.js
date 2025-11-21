import {createComment, getAllComments} from "../repositories/comments.js";

export default async function commentsRoutes(fastify, opts) {
    fastify.get("/comments", async (req, reply) => {
        return await getAllComments();
    });

    fastify.post("/comments", async (req, reply) => {
        const { name, content } = req.body ?? {};
        if (!content) return reply.code(400).send({ error: "comment_text_required" });

        const newComment = await createComment(name, content);
        return reply.code(201).send(newComment);
    });
}