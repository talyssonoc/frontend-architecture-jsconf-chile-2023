const Fastify = require('fastify');
const cors = require('@fastify/cors');
const Data = require('./data');

const server = Fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

server.register(cors, {
  origin: '*',
});

server.addHook('preHandler', (req, res, done) => {
  // added this delay on purpose to make the UI transitions more visible
  setTimeout(done, 1500);
});

server.get('/entries', (_, res) => {
  res.code(200).send(Data.getAllEntries());
});

server.get('/entries/:id', (req, res) => {
  const id = Number(req.params.id);

  try {
    const entry = Data.getEntryById(id);

    res.code(200).send(entry);
  } catch (error) {
    res.code(404).send({ message: error.message });
  }
});

server.post('/entries', (req, res) => {
  try {
    const entry = Data.addEntry(req.body);

    res.code(201).send(entry);
  } catch (error) {
    res.code(422).send({ message: error.message });
  }
});

server.put('/entries/:id', (req, res) => {
  const id = Number(req.params.id);

  try {
    const entry = Data.updateEntry(id, req.body);

    res.code(202).send(entry);
  } catch (error) {
    if (error.type === Data.NOT_FOUND_ERROR) {
      return res.code(404).send({ message: error.message });
    }

    res.code(422).send({ message: error.message });
  }
});

server.listen({ port: 3001 }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(`Server is now listening on ${address}`);
});
