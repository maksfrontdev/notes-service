import { Response } from 'express';
import { CustomValidator } from 'express-validator';

import { UnsupportedFormat } from '@config';

export enum ResponseFormat {
  JSON = 'json',
  JSONP = 'jsonp',
}

/**
 * Validate if provided format is one of supported formats.
 */
export const isValidResponseFormat: CustomValidator = (value) => {
  if (
    value &&
    value !== ResponseFormat.JSON &&
    value !== ResponseFormat.JSONP
  ) {
    throw new Error(UnsupportedFormat.message);
  }

  return true;
};

/**
 * Depending on provided format, return JSON or JSONP response format.
 */
export const formatResponse = (
  res: Response,
  code: number,
  payload: any,
  format: ResponseFormat = ResponseFormat.JSON,
) => {
  if (!format || format === ResponseFormat.JSON) {
    return res.status(code).json(payload);
  } else if (format === ResponseFormat.JSONP) {
    return res.status(code).jsonp(payload);
  } else {
    return UnsupportedFormat;
  }
};
