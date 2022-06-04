import Model from './common.model';
import Promise from 'bluebird';
import { assertFound } from '../../helpers/db-result-handler';

export function getByQuery({find = {}, or = [{}], sort = {_id: -1}, offset = 0, limit = 10}) {
  return Promise.all([
    Model.find(find).lean().or(or).sort(sort).skip(offset).limit(limit),
    Model.find(find).lean().or(or).countDocuments()
  ]).spread((items: any[], numTotal: number) => ({items, numTotal}));
}

export function getById(id: any): any {
  return Model.findOne({_id: id}).lean()
    .then(assertFound(`Common (id ${id}) was not found`));
}

export function getOne(): any {
  return Model.findOne({}).lean()
  .then(assertFound(`Common was not found`));
}

export function getPopulatedOne(): any {
  return Model.findOne({}).lean().populate('')
    .then(assertFound(`Common was not found`));
}

export function create(data: any): any  {
  return Model.create(data);
}

export function insertMany(data: any): any  {
  return Model.insertMany(data);
}

export function update(data: any): any  {
  return Model.updateMany({}, {$set: data});
}

export function destroy(id: any): any  {
  return Model.findOneAndRemove({_id: id})
    .then(assertFound(`Could not destroy common (id ${id})`));
}

export function destroyAll() {
  return Model.deleteMany({});
}