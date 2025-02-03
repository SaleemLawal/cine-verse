// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const movieId = searchParams.get("id");

//   try {
//     const response = await fetch(`https://2embed.org/embed/movie/${movieId}`);
//     const data = await response.text();
//     return NextResponse.json({ data });
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
//   }
// }
