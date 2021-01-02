import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';

const schema = mongoose.Schema(
  {
    uuid: { type: String },
    client_uuid: { type: String },
    code: { type: String },
    status: {
      type: String,
      default: 'open_to_sale',
      enum: ['open_to_sale', 'ready_to_move'],
    },
    name: { type: String },
    overview: { type: Object },
    description: { type: String },
    developer: { type: String },
    facilities: { type: Array },
    district_uuid: { type: String },
    city_uuid: { type: String },
    country_uuid: { type: String },
    lat: { type: Number },
    long: { type: Number },
    location: { type: String },
    image: { type: String },
    gallery: { type: Array },
    master_plan: { type: Array },
    block: { type: Number },
    apartments: { type: Number },
    price: { type: Number },
    index: { type: Number, default: 10 },
    is_show_filter: { type: Number, default: 1 },
    is_active: { type: Number, default: 1 },
    is_delete: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String },
  },
  { collection: 'project', versionKey: false }
);
schema.plugin(uniqueValidator);
schema.plugin(mongoosePaginate);

schema.pre('save', function (next) {
  if (this.isNew) {
    this.uuid = uuidv4();
  }

  next();
});

export const Project = mongoose.model('Project', schema);
