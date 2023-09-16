import { NextRequest, NextResponse } from "next/server";

type Highlight = {
  content: string;
};

export async function get() {
  const res = await fetch("http://localhost:3001/highlights", {
    headers: {
      "Content-Type": "application/json",
      //   "API-Key": process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}

export async function create(request: NextRequest) {
  const { body } = await request.json();
  console.log(body);
  const res = await fetch("http://localhost:3001/highlights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //   "API-Key": process.env.DATA_API_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
