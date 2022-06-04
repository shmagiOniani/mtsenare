import { Schema, model } from 'mongoose';


const statusReceiversEmailsSchema = {
  standardMaterials: [String],
  digitalMaterials: [String],
};

const CommonSchema = new Schema({
  statusReceiversEmails: statusReceiversEmailsSchema,
});


export default model('Common', CommonSchema);