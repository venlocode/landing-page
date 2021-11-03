import jwt from "jsonwebtoken";
import { verify } from "../../lib/db";

export default async function(req, res){
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).send({ error: "Token is missing" });
  }
  try {
    const { email } = jwt.decode(token, process.env.JWT_SECRET_KEY);
    await verify({ email });

    return res.redirect("/thankyou");
  } catch(err){
    console.error(err);
    return res.status(400).send({ error: "Invalid token" });
  }
};
