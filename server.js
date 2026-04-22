const http = require('http');

const PORT = 3000;
let notes = [
  { id: 1, text: 'První poznámka' },
  { id: 2, text: 'Druhá poznámka' }
];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    return sendJson(res, 200, {
      message: 'API běží',
      endpoints: ['GET /', 'GET /notes', 'POST /notes']
    });
  }

  if (method === 'GET' && url === '/notes') {
    return sendJson(res, 200, notes);
  }

  if (method === 'POST' && url === '/notes') {
    try {
      const body = await parseBody(req);

      if (!body.text || typeof body.text !== 'string') {
        return sendJson(res, 400, { error: 'Pole text je povinné.' });
      }

      const newNote = {
        id: notes.length ? notes[notes.length - 1].id + 1 : 1,
        text: body.text
      };

      notes.push(newNote);
      return sendJson(res, 201, newNote);
    } catch (error) {
      return sendJson(res, 400, { error: 'Neplatný JSON.' });
    }
  }

  return sendJson(res, 404, { error: 'Endpoint nebyl nalezen.' });
});

server.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});
