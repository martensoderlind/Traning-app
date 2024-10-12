import http from "http";

const mockDB = [
  {
    id: 1,
    date: "2024-10-10",
    duration: "00:50:00",
    distance: 10,
  },
  {
    id: 2,
    date: "2024-10-10",
    duration: "00:50:00",
    distance: 10,
  },
];
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
      res.writeHead(200, {
        "content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "Data mottagen!" }));
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
