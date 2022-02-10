const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const redis = require('./redis');

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', async (req, res) => {
  const todoCounter = (await redis.getAsync('todoCounter')) || 0;
  res.json({
    added_todos: +todoCounter,
  });
});
app.use('/health', async (req, res) => {
  res.send('ok');
});
module.exports = app;
