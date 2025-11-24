import fetch from "node-fetch";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  // IMPORTANT: Parse body properly
  const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  try {
    const backend = await fetch("http://35.223.25.198:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)     // <-- correct forwarding
    });

    const data = await backend.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
