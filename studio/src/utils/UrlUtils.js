export default {
  api: {
    userSignin: 'http://localhost:5000/api/user/signin',
    userInfo: 'http://localhost:5000/api/user',
    
  },
  admin: {
    getListPostFilter: 'http://localhost:5000/api/admin/post/get_list/filter',
    getOnePost: 'http://localhost:5000/api/admin/post/get_one',
    getCategoryRoot: 'http://localhost:5000/api/admin/category/get_list_root',
    getCategoryChild: 'http://localhost:5000/api/admin/category/get_list_child'
  }
}