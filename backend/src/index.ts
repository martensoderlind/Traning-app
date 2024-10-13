import http from "http";
import { db } from "./mockDB";
import { addValuesToDB } from "./util";
import { addSession } from "./db";
const port = 8080;
const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }
  if (req.method === "POST" && req.url === "/submit") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { date, duration, distance } = JSON.parse(body);
      console.log("Received POST data:", { date, duration, distance });

      addSession(date, distance, duration);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Session added", db }));
    });
  } else {
    res.writeHead(200, {
      "content-Type": "application/json",
    });
    // const result = JSON.stringify({ db });
    res.write("no call");
    res.end();
  }
});
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
