export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  // CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  try {
    const body = await req.json();

    const backendRes = await fetch("http://35.223.25.198:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.text(); // avoid JSON parse issues

    return new Response(data, { status: 200, headers });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.toString() }),
      { status: 500, headers }
    );
  }
}
