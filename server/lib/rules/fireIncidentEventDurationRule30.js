import bodybuilder from 'bodybuilder';
import _ from 'lodash';

import { Rule } from '../rule';

export class FireIncidentEventDurationRule30 extends Rule {
  constructor(params) {
    super(params);
    this.params.threshold = this.params.threshold || 1800;
    this.params.level = 'WARNING';

    let apparatus = bodybuilder()
      .filter('range', 'apparatus.extended_data.event_duration', { gte: this.params.threshold})
      .build();
    apparatus.path = 'apparatus';

    this.query = bodybuilder()
      .filter('term', 'description.suppressed', false)
      .filter('term', 'description.category', 'FIRE')
      .filter('nested', apparatus);
  }

  analyze() {
    let analysis = [];
    this.results.hits.hits.forEach(hit => {
      let units = [];
      let incidentNumber = _.get(hit, '_source.description.incident_number');
      hit._source.apparatus.forEach(u => {
        let event_duration = _.get(u, 'extended_data.event_duration');
        if(event_duration > this.params.threshold) units.push(u.unit_id);
      });

      analysis.push({
        rule: this.constructor.name,
        level: this.params.level,
        description: `Units on fire incident > ${(this.params.threshold / 60.0).toFixed(0)} min`,
        details: `Incident: <a target="_blank" href="https://statengine.io/incidents/${incidentNumber}">${incidentNumber}</a> <br> Units: ${units.join(',')}`
      });
    });

    return analysis;
  }
}

export default { FireIncidentEventDurationRule30 };
