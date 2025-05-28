const db = require('../models/db');

exports.getTasks = async (req, res) => {
  const userId = req.userId;
  const [rows] = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
  res.json(rows);
};

exports.createTask = async (req, res) => {
  const { title } = req.body;
  const userId = req.userId;
  const [result] = await db.query('INSERT INTO tasks (user_id, title) VALUES (?, ?)', [userId, title]);
  const [newTask] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
  res.status(201).json(newTask[0]);
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  await db.query('UPDATE tasks SET completed = ? WHERE id = ? AND user_id = ?', [completed, id, req.userId]);
  res.sendStatus(204);
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, req.userId]);
  res.sendStatus(204);
};