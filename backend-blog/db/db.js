const pool = require('./pool');
const dbQuery = require('../db/dbQuery');
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

const createCategoriesTable = 
  `CREATE TABLE IF NOT EXISTS
  categories(
    category_id serial PRIMARY KEY NOT NULL,
    parent_id serial,
    category_name TEXT NOT NULL,
    category_slug TEXT UNIQUE NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    level INT NOT NULL
  )`;

const createPostsTable =
 `CREATE TABLE IF NOT EXISTS
  posts(
    post_id serial PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL,
    overview TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE RESTRICT,
    post_slug TEXT UNIQUE NOT NULL,
    admin_id INT REFERENCES users(user_id) ON DELETE RESTRICT,
    verify INT NOT NULL,
    is_block BOOLEAN NOT NULL,
    enable_comment BOOLEAN NOT NULL,
    view INT NOT NULL
  )`;

const createTagsTable =
 `CREATE TABLE IF NOT EXISTS
  tags(
    tag_id serial PRIMARY KEY NOT NULL,
    tag_name TEXT NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL
  )`;

const createPostTagTable = 
  `CREATE TABLE IF NOT EXISTS
  posttag(
    post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE RESTRICT,
    tag_id INT NOT NULL REFERENCES tags(tag_id) ON DELETE RESTRICT,
    create_at TIMESTAMP NOT NULL,

    PRIMARY KEY (post_id, tag_id)
  )`;

const createUserHistoryTable =
 `CREATE TABLE IF NOT EXISTS
  userhistory(
    tag_id INT NOT NULL REFERENCES tags(tag_id) ON DELETE RESTRICT,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE RESTRICT,
    create_at TIMESTAMP NOT NULL,

    PRIMARY KEY (tag_id ,user_id, post_id)
  )`;

/**
 * Drop Table
 */
const dropCredentialsTable = 'DROP TABLE IF EXISTS credentials';

const dropRolesTable = 'DROP TABLE IF EXISTS roles';

const dropUsersTable = 'DROP TABLE IF EXISTS users';

const dropUserRoleTable = 'DROP TABLE IF EXISTS userrole';
 
const dropCategoriesTable = 'DROP TABLE IF EXISTS categories';

const dropPostsTable = 'DROP TABLE IF EXISTS posts';

const dropTagsTable = 'DROP TABLE IF EXISTS tags';

const dropPostTagTable = 'DROP TABLE IF EXISTS posttag';

const dropUserHistoryTable = 'DROP TABLE IF EXISTS userhistory';


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
    const categories = await dbQuery.query(createCategoriesTable, []);
    console.log('categories', categories);
    const posts = await dbQuery.query(createPostsTable, []);
    console.log('posts', posts);
    const tags = await dbQuery.query(createTagsTable, []);
    console.log('tags', tags);
    const posttag = await dbQuery.query(createPostTagTable, []);
    console.log('posttag', posttag);
    const userhistory = await dbQuery.query(createUserHistoryTable, []);
    console.log('userhistory', userhistory);
  } catch (err) {
    console.log(err)
  }
};

/**
 * Drop All Tables
 */
const dropAllTables = async () => {
  try {
    const userhistory = await dbQuery.query(dropUserHistoryTable, []);
    console.log('userhistory', userhistory);
    const posttag = await dbQuery.query(dropPostTagTable, []);
    console.log('posttag', posttag);
    const tags = await dbQuery.query(dropTagsTable, []);
    console.log('tags', tags);
    const posts = await dbQuery.query(dropPostsTable, []);
    console.log('posts', posts);
    const categories = await dbQuery.query(dropCategoriesTable, []);
    console.log('categories', categories);
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