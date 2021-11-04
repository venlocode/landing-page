import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";
import { add, get } from "../../lib/db";

const transport = nodeMailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const emailTemplate = ({ link }) => (`
  <p>Hey, </p>
  <p>Thanks for signing up for Venlo's waitlist. Please visit this link to confirm your email address: </p>
  <p>${link}</p>

  <p>
    Cheers,<br/>
    Venlo Team
  </p>
`);

const makeToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY);
};

export default async function(req, res){
  if(req.method != "POST"){
    return res.status(404).send();
  }
  const { email } = req.body;

  if(!email || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    return res.status(400).send({ error: "Invalid email address." });
  }
  const doc = await get({ email });
  
  if(doc.exists && doc.data().verified){
    return res.status(400).send({ error: "You have already registered for the waitlist." });
  }
  const token = makeToken(email);
  
  await Promise.all([
    transport.sendMail({
      from: "Venlo",
      html: emailTemplate({ link: `https://landing-page.apoorvsingal.repl.co/api/confirm?token=${encodeURIComponent(token)}` }),
      subject: "Please verify your email to join the waitlist",
      to: email,
    }),
    add({ email })
  ]);
  return res.status(200).send({ ok: true});
};
