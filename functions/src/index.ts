import * as functions from "firebase-functions";
import axios, { AxiosRequestConfig } from "axios";
import * as express from "express"; //型情報のみ(index.jsでは削除される)

async function callWebAPI(url:string, postMsg:string) {
  try {
    const config:AxiosRequestConfig = {
      headers: {'Content-Type': 'text/plain'},
      responseType: 'text'
    };
    const response = await axios.post(url, postMsg, config);
    return response.data as string;
  } catch (error) {
    const {
      status,
      statusText
    } = error.response;
    throw `Error! HTTP Status: ${status} ${statusText}`;
  }
};

export const APIPass = functions.region("asia-northeast2").https.onRequest((request:express.Request, response:express.Response) => {
  // const url = 'http://xxxxxxxx.jp/test.php'
  const url = process.env.url as string; //環境変数から取得

  //別ドメインからアクセスした場合のcorsエラーを回避する必要のない時は不要
  // resp.set('Access-Control-Allow-Origin', '*'); //すべて許可
  response.set('Access-Control-Allow-Origin', process.env.url2); //設定したドメインのみ許可

  callWebAPI(url, request.body)
    .then(result => {
      console.log(result);
      response.send(result);
    })
    .catch(errMsg => {
      console.log(errMsg);
      response.send(errMsg);
    });
});
