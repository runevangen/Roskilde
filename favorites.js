import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("roskilde-favorites");

  // GET: Retrieve user favorites
  if (req.method === "GET") {
    const { username } = new URL(req.url).searchParams;

    if (!username) {
      return new Response(JSON.stringify({ error: "Username required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const data = await store.get(username);
      const favorites = data ? JSON.parse(data) : [];

      return new Response(JSON.stringify({ favorites }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error reading favorites:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  // POST: Save user favorites
  if (req.method === "POST") {
    const { username, favorites } = await req.json();

    if (!username) {
      return new Response(JSON.stringify({ error: "Username required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      await store.set(username, JSON.stringify(favorites));

      return new Response(JSON.stringify({ success: true, username, count: favorites.length }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error saving favorites:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};
