import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';

const schema = mongoose.Schema(
  {
    uuid: { type: String },
    user_uuid: { type: String },
    agent_uuid: { type: String },
    code: { type: String },
    name: { type: String },
    description: { type: String },
    translate: { type: Object },
    is_active: { type: Number, default: 1 },
    is_delete: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String },
  },
  { collection: 'scenario-group', versionKey: false }
);
schema.plugin(uniqueValidator);
schema.plugin(mongoosePaginate);

schema.pre('save', function (next) {
  if (this.isNew) {
    this.uuid = uuidv4();
  }

  next();
});

export const ScenarioGroup = mongoose.model('ScenarioGroup', schema);
