db = db.getSiblingDB('admin');
db.auth('root', 'root_password');
db = db.getSiblingDB('houzez');
db.createUser({
  user: 'tandat',
  pwd: 'root_123456',
  roles: [
    { role: "userAdminAnyDatabase", db: "admin" },
    { role: "readWrite", db: "houzez"}
  ]
});