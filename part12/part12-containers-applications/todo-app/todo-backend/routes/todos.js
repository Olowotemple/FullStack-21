const express = require('express');
const { Todo } = require('../mongo');
const redis = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let todoCounter = await redis.getAsync('todoCounter');
  todoCounter = +todoCounter;
  if (todoCounter) {
    await redis.setAsync('todoCounter', ++todoCounter);
  } else {
    await redis.setAsync('todoCounter', 1);
  }

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;
  const newTodo = { text, done };

  const updatedNote = await Todo.findByIdAndUpdate(req.todo.id, newTodo, {
    new: true,
  });

  res.json(updatedNote);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
