import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import uniqueValidator from 'mongoose-unique-validator';
import { v4 as uuidv4 } from 'uuid';

const schema = mongoose.Schema(
  {
    uuid: { type: String },
    client_uuid: { type: String },
    product_uuid: { type: String },
    sub_title: { type: String },
    furniture: { type: Array },
    nearby: { type: String },
    origin: {
      uuid: { type: String },
      name: { type: String },
      _id: false,
    },
    discount_percentage: { type: String },
    discounted_price: { type: Number },
    contact: { type: String },
    process: { type: Number },
    additional_description: { type: String },
    is_active: { type: Number, default: 1 },
    is_delete: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String },
  },
  { collection: 'product_additional_information', versionKey: false }
);
schema.plugin(uniqueValidator);
schema.plugin(mongoosePaginate);

schema.pre('save', function (next) {
  if (this.isNew) {
    this.uuid = uuidv4();
  }

  next();
});

export const ProductAdditionalInformationModel = mongoose.model(
  'ProductAdditionalInformation',
  schema
);
