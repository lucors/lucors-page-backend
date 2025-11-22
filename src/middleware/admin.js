import authMiddleware from "./auth.js";

export default async function adminMiddleware(req, reply) {
  await authMiddleware(req, reply);
  if (!req?.user?.is_admin) {
    return reply.code(401).send({error: "invalid_admin"});
  }
}
