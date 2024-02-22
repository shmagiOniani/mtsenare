import Model from './libraries.model';
import Promise from 'bluebird';
import { assertFound } from '../../helpers/db-result-handler';

// =============== Getters ===============

export function getByQuery({find = {}, or = [{}], sort = {_id: -1}, offset = 0, limit = 10}) {
  return Promise.all([
    Model.find(find).lean().or(or).sort(sort).skip(offset).limit(limit),
    Model.find(find).lean().or(or).countDocuments()
  ]).spread((items: any[], numTotal: number) => ({items, numTotal}));
}

export function getById(id: any): any {
  return Model.findOne({_id: id}).lean()
    .then(assertFound(`libraries (id ${id}) was not found`));
}

export function getByCode(code: string): any {
  return Model.findOne({name: code}).lean()
    .then(assertFound(`libraries (code ${code}) was not found`));
}

// =============== Setters ===============

export function create(data: any) {
  console.log("libraries data : ", data );
  
  return Model.create(data);
}

export function insertMany(data: any) {
  return Model.insertMany(data);
}

export function update(id: any, payload: any) {
  return Model.findOneAndUpdate({_id: id}, {$set: payload})
    .then(assertFound(`Could not update libraries (category ${id})`));
}

export function destroy(id: any) {
  return Model.findOneAndRemove({_id: id})
    .then(assertFound(`Could not destroy libraries (id ${id})`));
}

export function destroySubLibrary(id: any, subId: any) {
  return Model.update({_id: id}, {$pull : {"library" : {"_id": subId}}})
    .then(assertFound(`Could not destroy libraries (id ${id})`));
}

export function destroyAll() {
  return Model.deleteMany({});
}

