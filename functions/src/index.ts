import * as functions from "firebase-functions";
import axios, { AxiosRequestConfig } from "axios";

async function main(req:any, res:any) {
  try {
    const config:AxiosRequestConfig = {
      headers: {
        'Content-Type': 'text/plain'
      },
      responseType: 'text'
    };
    console.log(req.body);
    const ret = await axios.post('http://takana.web5.jp/test/test.php', req.body, config);
    const text = ret.data;
    console.log(text);
    res.send(text);
  } catch (error) {
    const {
      status,
      statusText
    } = error.response;
    const msg = `Error! HTTP Status: ${status} ${statusText}`;
    console.log(msg);
    res.send(msg);
  }
};

export const APIPass = functions.region("asia-northeast2").https.onRequest((req, res) => {
  main(req, res);
});
