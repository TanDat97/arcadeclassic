db = db.getSiblingDB('admin');
db.auth('root', 'root_password');
db = db.getSiblingDB('test');
db.createUser({
  user: 'tandat',
  pwd: 'root_123456',
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWrite", db: "test"}
  ]
});