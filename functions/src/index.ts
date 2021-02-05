import * as functions from "firebase-functions";
import * as axios from "axios";
import * as express from "express";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.region("asia-northeast2").https.onRequest((req: express.Request, res: express.Response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
    res.send("Hello from Firebase!");
});
