// index.js

const { createServer } = require('http');
const { parse } = require('url');
const generativeAIController = require('./routes/GenerativeAIController');
const Perguntas = require('./routes/Perguntas');

const app = (req, res) => {
  const { pathname, query } = parse(req.url, true);

  if (pathname === '/generative-ai' && req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk.toString();
    });
    req.on('end', async () => {
      const body = JSON.parse(data);
      const geminiresp = body.conteudo;
      const result = await generativeAIController.run(geminiresp);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ result }));
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
};

module.exports = app;
