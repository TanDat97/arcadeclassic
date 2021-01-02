import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import { v4 as uuidv4 } from 'uuid';

const schema = mongoose.Schema(
  {
    uuid: { type: String },
    type_business: { type: String, default: 'sale', enum: ["sale", "rent"] },
    status: { type: String, default: 'unapproved', enum: ["unapproved", "approved", "sold", "rented"] },
    slug: { type: String },
    code: { type: String },
    name_product: { type: String },
    description: { type: String },
    price: { type: Number },
    area: { type: Number},
    bedroom: { type: Number},
    bathroom: { type: Number},
    furniture: { type: String, default: 'full', enum: ["full", "basic", "unfurnished", "raw"] },
    furnitures: { type: Array },
    type_uuid: { type: String },
    project_uuid: { type: String },
    district_uuid: { type: String },
    city_uuid: { type: String },
    country_uuid: { type: String },
    image: { type: String },
    gallery: { type: Array },
    lat: { type: Number},
    long: { type: Number },
    location: { type: String },
    address_level_0: { type: String },
    address_level_1: { type: String },
    address_level_2: { type: String },
    address_level_3: { type: String },
    address_level_4: { type: String },
    address_level_5: { type: String },
    address_level_6: { type: String },
    address_level_7: { type: String },
    address_level_8: { type: String },
    address_level_9: { type: String },
    is_special: { type: Boolean },
    index: { type: Number, default: 10 },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    translate: { type: Object, default: {} },
    client_uuid: { type: String },
    is_active: { type: Number, default: 1 },
    is_delete: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: String },
    updated_by: { type: String },
  },
  {
    collection: 'product',
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

schema.plugin(mongoosePaginate);

schema.pre('save', function (next) {
  if (this.isNew) {
    this.uuid = uuidv4();
  }

  next();
});

export const ProductModel = mongoose.model('Product', schema);
