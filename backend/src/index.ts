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
  if (req.method === "POST") {
    console.log(req);
    res.writeHead(200, {
      "content-type": "application/json",
    });

    let body = "";

    req.on("data", (chunk) => {});
    req.on("end", () => {});
  }
  res.writeHead(200, {
    "content-Type": "application/json",
  });
  const result = JSON.stringify({ mockDB });
  res.write(result);
  res.end();
});
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
