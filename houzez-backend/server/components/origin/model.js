import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';

const schema = mongoose.Schema(
  {
    uuid: { type: String },
    client_uuid: { type: String },
    type: { type: String, default: 'district', enum: ["district", "city", "province", "country"]},
    code: { type: String },
    name: { type: String },
    description: { type: String },
    sequence: { type: Number },
    translate: { type: Object, default: {} },
    is_show_filter: { type: Number, default: 1 },
    is_active: { type: Number, default: 1 },
    is_delete: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String },
  },
  { collection: 'origin', versionKey: false }
);
schema.plugin(uniqueValidator);
schema.plugin(mongoosePaginate);

schema.pre('save', function (next) {
  if (this.isNew) {
    this.uuid = uuidv4();
  }

  next();
});

export const OriginModel = mongoose.model('Origin', schema);
