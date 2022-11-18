import express from 'express';
import { query, validationResult } from 'express-validator';

import {
  formatResponse,
  isValidResponseFormat,
} from '@services/response-formatter.service';

import MonitoringController from './monitoring.controller';

const router = express.Router();

router.get(
  '/',
  query('format').custom(isValidResponseFormat),
  async (req, res, next) => {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      const errors = validationRes.array();
      return formatResponse(res, 400, { errors }, req.query?.format);
    }

    try {
      const isApiAvailable = MonitoringController.servicesHealthProbe();
      return formatResponse(
        res,
        isApiAvailable ? 200 : 500,
        {
          pong: true,
        },
        req.query?.format,
      );
    } catch (err) {
      next(err);
    }
  },
);

export default router;
