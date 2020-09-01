const pool = require('./pool');
const dbQuery = require('./dbQuery');
const {
  resolve
} = require('path');


/**
 * Create Table
 */
const createCredentialsTable = 
  `CREATE TABLE IF NOT EXISTS
  credentials(
    credential_id serial PRIMARY KEY NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    user_name VARCHAR(128) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    reset_token TEXT NOT NULL,
    last_reset_password TIMESTAMP NOT NULL
  )`;

const createRolesTable = 
  `CREATE TABLE IF NOT EXISTS
  roles(
    role_id serial PRIMARY KEY NOT NULL,
    role_name TEXT NOT NULL
  )`;

const insertRolesTable = `INSERT INTO roles(role_id, role_name) VALUES (1, 'USER_ROLE'), (2, 'ADMIN_ROLE')`;

const createUsersTable = 
  `CREATE TABLE IF NOT EXISTS
  users(
    user_id serial PRIMARY KEY NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    user_name VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    description TEXT,
    avatar TEXT,
    user_slug TEXT, 
    create_at TIMESTAMP NOT NULL,
    credential_id INT NOT NULL REFERENCES credentials(credential_id) ON DELETE RESTRICT,
    date_of_birth TIMESTAMP NOT NULL
  )`;

const createUserRoleTable =
 `CREATE TABLE IF NOT EXISTS
  userrole(
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    role_id INT NOT NULL REFERENCES roles(role_id) ON DELETE RESTRICT,

    PRIMARY KEY (user_id, role_id)
  )`;

/**
 * Drop Table
 */
const dropCredentialsTable = 'DROP TABLE IF EXISTS credentials';

const dropRolesTable = 'DROP TABLE IF EXISTS roles';

const dropUsersTable = 'DROP TABLE IF EXISTS users';

const dropUserRoleTable = 'DROP TABLE IF EXISTS userrole';

/**
 * Create All Tables
 */
const createAllTables = async () => {
  try {
    const credentials = await dbQuery.query(createCredentialsTable, []);
    console.log('credentials', credentials);
    const roles = await dbQuery.query(createRolesTable, []);
    console.log('roles', roles);
    const rolesinsert = await dbQuery.query(insertRolesTable, []);
    console.log('rolesinsert', rolesinsert);
    const users = await dbQuery.query(createUsersTable, []);
    console.log('users', users);
    const userrole = await dbQuery.query(createUserRoleTable, []);
    console.log('userrole', userrole);
  } catch (err) {
    console.log(err)
  }
};

/**
 * Drop All Tables
 */
const dropAllTables = async () => {
  try {
    const userrole = await dbQuery.query(dropUserRoleTable, []);
    console.log('userrole', userrole);
    const users = await dbQuery.query(dropUsersTable, []);
    console.log('users', users);
    const roles = await dbQuery.query(dropRolesTable, []);
    console.log('roles', roles);
    const credentials = await dbQuery.query(dropCredentialsTable, []);
    console.log('credentials', credentials);
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  createAllTables,
  dropAllTables,
};

require('make-runnable');