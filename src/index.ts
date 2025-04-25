import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Обслуживаем статичные файлы из папки public
app.use(express.static(path.join(__dirname, '../public')));

// Временное хранилище задач
let tasks: any[] = [];
let idCounter = 1;

// GET все задачи
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST создать задачу
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: idCounter++, title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT обновить задачу
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (task) {
    task.title = title;
    task.description = description;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Задача не найдена' });
  }
});

// DELETE удалить задачу
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
