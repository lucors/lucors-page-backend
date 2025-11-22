import {verifyToken} from "../jwt.js";

export default async function authMiddleware(req, reply) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return reply.code(401).send({error: "missing_token"});
  }

  const token = header.slice("Bearer ".length);

  try {
    req.user = verifyToken(token);
  } catch (e) {
    return reply.code(401).send({error: "invalid_token"});
  }
}
