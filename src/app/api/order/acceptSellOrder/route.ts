import { NextResponse, type NextRequest } from "next/server";

/*
import {
  UserProps,
	acceptSellOrder,
} from '@lib/api/order';
*/

// Download the helper library from https://www.twilio.com/docs/node/install
import twilio from "twilio";


export async function POST(request: NextRequest) {

  const body = await request.json();

  const { lang, chain, orderId, buyerWalletAddress, buyerNickname, buyerAvatar, buyerMobile, buyerMemo, depositName } = body;

  console.log("orderId", orderId);

  

 
  

  // call api
  // https://goodtether.com/api/order/acceptSellOrder

  const response = await fetch("https://goodtether.com/api/order/acceptSellOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  /*
  {
    result: {
      _id: '66b4479328266be8352ae0f1',
      lang: null,
      chain: null,
      walletAddress: '0x8Ee282f7B9a8EA832FFc4327032c9daC9D145955',
      nickname: 'chatgpt',
      mobile: '+8201098551647',
      avatar: 'https://vzrcy5vcsuuocnf3.public.blob.vercel-storage.com/ljg3mOc-n1PvzbzMeGMUJNDyoJNiKXZYpBaIDt.png',
      seller: { status: 'confirmed', bankInfo: [Object] },
      usdtAmount: 7.1273,
      krwAmount: 10000,
      rate: 1403,
      createdAt: '2024-08-08T04:20:35.098Z',
      status: 'accepted',
      privateSale: false,
      acceptedAt: '2024-08-08T08:53:17.114Z',
      buyer: {
        walletAddress: '0x9899e93572B9E07C46f89fb4F3b9B493c43688dB',
        nickname: 'ironman@gmail.com@2000001',
        avatar: '',
        mobile: '010-1234-5678',
        memo: '',
        depositName: '미은구'
      },
      tradeId: '322957'
    }
  }
  */

  ///console.log(result);


  if (!result) {

    return NextResponse.json({
      result,
    });

  }

  const mobile = result.result?.mobile;
      
  const tradeId = result.result?.tradeId;

  const buyer = result.result?.buyer;


  //console.log("mobile", mobile);
  //console.log("tradeId", tradeId);

  //console.log("buyer", buyer);



    // send sms

    const to = mobile;


    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);





    let message = null;
    

   
    
    try {
    

      let msgBody = '';

      if (lang === 'en') {
        msgBody = `[GOODT] TID[${tradeId}] Your sell order has been accepted by ${buyer?.nickname}! You must escrow USDT to proceed with the trade in 10 minutes!`;
      } else if (lang === 'kr') {
        msgBody = `[GOODT] TID[${tradeId}] ${buyer?.nickname}님이 구매 주문을 수락했습니다! 거래를 계속하기 위해 USDT를 에스크로해야 합니다!`;
      } else {
        msgBody = `[GOODT] TID[${tradeId}] Your sell order has been accepted by ${buyer?.nickname}! You must escrow USDT to proceed with the trade in 10 minutes!`;
      }



      message = await client.messages.create({
        body: msgBody,
        from: "+17622254217",
        to: to,
      });

      console.log(message.sid);

      

      
      /*
      let msgBody2 = '';

      if (lang === 'en') { 
        msgBody2 = `[GOODT] TID[${tradeId}] Check the trade: https://goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
      } else if (lang === 'kr') {
        msgBody2 = `[GOODT] TID[${tradeId}] 거래 확인: https://goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
      } else {
        msgBody2 = `[GOODT] TID[${tradeId}] Check the trade: https://goodtether.com/${lang}/${chain}/sell-usdt/${orderId}`;
      }


      message = await client.messages.create({
        body: msgBody2,
        from: "+17622254217",
        to: to,
      });

      console.log(message.sid);
      */
      

    } catch (e) {
      console.error('error', e);
    }

    


 
  return NextResponse.json({

    result : result.result,
    
  });
  
}
