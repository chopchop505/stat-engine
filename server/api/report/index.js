'use strict';

import { Router } from 'express';
import bodyParser from 'body-parser';

import * as auth from '../../auth/auth.service';
import * as controller from './report.controller';

const router = new Router();

router.get(
  '/',
  auth.isApiAuthenticated,
  auth.hasRole('user'),
  auth.hasFireDepartment,
  controller.search
);

router.get(
  '/:type/:name',
  auth.isApiAuthenticated,
  auth.hasRole('user'),
  auth.hasFireDepartment,
  controller.get
);

router.put(
  '/:type/:name',
  auth.isApiAuthenticated,
  auth.hasRole('department_admin'),
  auth.hasFireDepartment,
  bodyParser.json(),
  controller.upsert
);

router.post(
  '/:type/:name/notify',
  auth.isApiAuthenticated,
  auth.hasRole('department_admin'),
  auth.hasFireDepartment,
  controller.findReport,
  controller.loadNofiticationDestinations,
  controller.notify
);

router.get(
  '/:type/:name/metrics',
  auth.isApiAuthenticated,
  auth.hasRole('department_admin'),
  auth.hasFireDepartment,
  controller.findReport,
  controller.getMetrics
);

router.post(
  '/:type/:name/views',
  auth.isApiAuthenticated,
  auth.hasRole('user'),
  auth.hasFireDepartment,
  controller.findReport,
  controller.view
);

module.exports = router;
