// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

// /**
//  * Import function triggers from their respective submodules:
//  *
//  * import {onCall} from "firebase-functions/v2/https";
//  * import {onDocumentWritten} from "firebase-functions/v2/firestore";
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// import {onRequest} from "firebase-functions/v2/https";

// import * as express from "express";
// export const app = express();
// import {Request, Response, NextFunction} from "express";

// // setup CORS
// import * as cors from "cors";
// app.use(cors({origin: true}));

// // setup Firestore
// import * as admin from "firebase-admin";
// admin.initializeApp();
// export const db = admin.firestore();

// const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   if (req.path.startsWith("/admin")) {
//     return next();
//   }

//   const authorization = req.headers["authorization"];
//   if (!authorization) {
//     return res.status(401).json({error: "No authorization header"});
//   }

//   const token = authorization.split(" ")[1];
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     req.user = decodedToken;
//     return next();
//   } catch (error) {
//     return res.status(401).json({error: "Invalid token"});
//   }
// };

// app.use(verifyToken);

// // connect app to firebase
// import betRoutes from "./bet";
// import settlementRoutes from "./settlement";
// import referRoutes from "./referral";
// import adminRoutes from "./admin";
// app.use("/bet", betRoutes);
// app.use("/settle", settlementRoutes);
// app.use("/refer", referRoutes);
// app.use("/admin", adminRoutes);
// import {createUser} from "./triggers/userTriggers";
// export const api = onRequest(app);
// exports.createUser = createUser;
// // sample api
// // app.get("/hello", (req, res) => {
// //   return res.status(200).send("Hello world!");
// // });

