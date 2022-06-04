import * as _ from 'lodash';
import { cloneStub } from '../helpers/stub-helpers';

const CommonStub = {
  statusReceiversEmails: {
    standardMaterials: [],
    digitalMaterials: [],
  },
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CommonStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
  }));
}

export function getCommon() {
  return {
    statusReceiversEmails: {
      standardMaterials: [],
      digitalMaterials: [],
    },
  };
}