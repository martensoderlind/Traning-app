import http from "http";
const port = 8080;
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "content-Type": "application/json",
  });
  const result = JSON.stringify({ ok: true });
  res.write(result);
  res.end();
});
server.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
