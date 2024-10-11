import http from "http";

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "content-Type": "application/json",
    });
    const result = JSON.stringify({ ok: true });
    res.write(result);
    res.end();
  })
  .listen(8080);
