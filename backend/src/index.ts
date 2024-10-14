import http from "http";
import { addSession, db } from "./db";
import { validation } from "./util";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const port = 8080;
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const dbData = db.prepare("SELECT * FROM sessions");
    const data = dbData.all();
    res.writeHead(200, corsHeaders);

    res.end(JSON.stringify(data));
  } else if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  } else if (req.method === "POST" && req.url === "/submit") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const todaysDate = new Date();
      const sessionData = JSON.parse(body);
      const isValid = validation(sessionData, todaysDate);

      if (!isValid) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: "Input format of date or distance is incorrect.",
          })
        );
        return;
      }

      const { date, duration, distance } = sessionData;
      addSession(date, distance, duration);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ date, duration, distance }));
    });
  } else {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write("no call");
    res.end();
  }
});
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
