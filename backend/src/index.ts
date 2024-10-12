import http from "http";
import { mockDB } from "./mockDB";
import { addValuesToDB } from "./util";
const port = 8080;
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/submit") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      console.log(`data mottagen: ${body}`);
      addValuesToDB(JSON.parse(body));
      res.writeHead(200, {
        "content-Type": "application/json",
      });
      res.end(JSON.stringify({ mockDB }));
    });
  } else {
    res.writeHead(200, {
      "content-Type": "application/json",
    });
    const result = JSON.stringify({ mockDB });
    res.write(result);
    res.end();
  }
});
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
