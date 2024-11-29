import express from 'express';
import { Session } from '../models/Session.js';

const router = express.Router();

// Get all sessions
router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (error) {
    next(error);
  }
});

// Create new session
router.post('/', async (req, res, next) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
});

// Update session
router.put('/:id', async (req, res, next) => {
  try {
    const session = await Session.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, upsert: true }
    );
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    next(error);
  }
});

// Delete session
router.delete('/:id', async (req, res, next) => {
  try {
    const session = await Session.findOneAndDelete({ id: req.params.id });
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export const sessionRoutes = router;