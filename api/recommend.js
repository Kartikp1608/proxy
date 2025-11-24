import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const backend = await fetch("http://35.223.25.198:8000/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await backend.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.toString() });
  }
}
