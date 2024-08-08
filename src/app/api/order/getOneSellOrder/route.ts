import { NextResponse, type NextRequest } from "next/server";


export async function POST(request: NextRequest) {

  const body = await request.json();


  // call api

  // https://goodtether.com/api/order/getOneSellOrder
  // POST

  const result = await fetch("https://goodtether.com/api/order/getOneSellOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await result.json();

  //console.log(data);

  //{ result: { totalCount: 0, orders: [] } }



 
  return NextResponse.json({

    result: data.result
    
  });
  
}
