import express from 'express';
import { body, param, query, validationResult } from 'express-validator';

import { NonExistingDocument } from '@config';
import {
  formatResponse,
  isValidResponseFormat,
} from '@services/response-formatter.service';

import NotesController from './notes.controller';

const router = express.Router();

router.get(
  '/',
  query('page').optional().isNumeric().toInt(),
  query('limit').optional().isNumeric().toInt(),
  query('format').custom(isValidResponseFormat),
  async (req, res, next) => {
    try {
      const validationRes = validationResult(req);
      if (!validationRes.isEmpty()) {
        const errors = validationRes.array();
        return formatResponse(res, 400, { errors }, req.query?.format);
      }

      const page = parseInt(req.query?.page || 1, 10);
      const limit = parseInt(req.query?.limit || 50, 10);

      const notes = await NotesController.listNotes(limit, (page - 1) * limit);
      const notesCount = await NotesController.countNotes();

      return formatResponse(
        res,
        200,
        {
          count: notes.length,
          results: notes,
          paging: {
            totalDocuments: notesCount,
            page,
            pages: Math.ceil(notesCount / limit),
          },
        },
        req.query?.format,
      );
    } catch (err) {
      next(err);
    }
  },
);

router.get(
  '/:noteId',
  query('format').custom(isValidResponseFormat),
  param('noteId').isMongoId(),
  async (req, res, next) => {
    try {
      const validationRes = validationResult(req);
      if (!validationRes.isEmpty()) {
        const errors = validationRes.array();
        return formatResponse(res, 400, { errors }, req.query?.format);
      }

      const note = await NotesController.getNote(req.params?.noteId);

      if (!note) {
        return formatResponse(res, 404, NonExistingDocument, req.query?.format);
      }
      return formatResponse(res, 200, note, req.query?.format);
    } catch (err) {
      next(err);
    }
  },
);

router.post(
  '/',
  query('format').custom(isValidResponseFormat),
  body('title').notEmpty().isString(),
  body('message').notEmpty().isString(),
  async (req, res, next) => {
    try {
      const validationRes = validationResult(req);
      if (!validationRes.isEmpty()) {
        const errors = validationRes.array();
        return formatResponse(res, 400, { errors }, req.query?.format);
      }

      const note = await NotesController.createNote(req.body);
      return formatResponse(res, 200, note, req.query?.format);
    } catch (err) {
      next(err);
    }
  },
);

router.put(
  '/:noteId',
  query('format').custom(isValidResponseFormat),
  param('noteId').isMongoId(),
  body('title').isString().optional(),
  body('message').isString().optional(),
  async (req, res, next) => {
    try {
      const validationRes = validationResult(req);
      if (!validationRes.isEmpty()) {
        const errors = validationRes.array();
        return formatResponse(res, 400, { errors }, req.query?.format);
      }

      const note = await NotesController.updateNote({
        _id: req.params?.noteId,
        ...req.body,
      });

      if (!note) {
        return formatResponse(res, 404, NonExistingDocument, req.query?.format);
      }
      return formatResponse(res, 200, note, req.query?.format);
    } catch (err) {
      next(err);
    }
  },
);

router.delete(
  '/:noteId',
  query('format').custom(isValidResponseFormat),
  param('noteId').isMongoId(),
  async (req, res, next) => {
    try {
      const validationRes = validationResult(req);
      if (!validationRes.isEmpty()) {
        const errors = validationRes.array();
        return formatResponse(res, 400, { errors }, req.query?.format);
      }

      const note = await NotesController.deleteNote(req.params?.noteId);

      if (!note) {
        return formatResponse(res, 404, NonExistingDocument, req.query?.format);
      }
      return formatResponse(res, 200, { success: true }, req.query?.format);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
