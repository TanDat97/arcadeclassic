import { CoreValidate } from '../../core/service/validate';

const CreateProductCheck = new CoreValidate({
  code: 'required|unique:product,code',
  name: 'required:product,name',
  is_active: 'required|in:0,1',
});


module.exports = {
  CreateProductCheck,
}
