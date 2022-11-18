import { Application } from 'express';
import { pick } from 'rambda';

import { appConfig } from '@config';
import monitoringRouter from '@modules/monitoring/monitoring.router';
import notesRouter from '@modules/notes/notes.router';

export const registerRoutes = (app: Application) => {
  app.get('/', (_, res) => res.json(pick(['name', 'version'], appConfig)));

  // API routes
  app.use('/v1/ping', monitoringRouter);
  app.use('/v1/notes', notesRouter);
};
