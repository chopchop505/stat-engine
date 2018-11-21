'use strict';

import angular from 'angular';
import ReportingUnitController from './reporting-unit.controller';
import ReportingUnitDetailController from './reporting-unit-detail.controller';

export default angular.module('stateEngineApp.reporting.unit', [])
  .controller('ReportingUnitController', ReportingUnitController)
  .controller('ReportingUnitDetailController', ReportingUnitDetailController)
  .name;