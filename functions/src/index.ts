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
    const ret = await axios.post('http://takana.web5.jp/test/test.php',
                                  'http://xxx.jp?name=sato&age=55' + '\t' +'名前=山田&年齢=99.99', config);
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
