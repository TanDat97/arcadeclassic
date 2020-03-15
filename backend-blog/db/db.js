const pool = require('./pool');

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

/**
 * Create Table
 */
const createCredentialTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS
  credential(
    credential_id serial PRIMARY KEY NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    user_name VARCHAR(128) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    reset_token TEXT NOT NULL,
    last_reset_password TIMESTAMP NOT NULL
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createRoleTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS
  role(
    role_id serial PRIMARY KEY NOT NULL,
    role_name TEXT NOT NULL
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const insertRoleTable = () => {
  const createQuery = `INSERT INTO role(role_id, role_name) VALUES (1,'USER_ROLE'), (2, 'ADMIN_ROLE')`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createUsersTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS
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
    credential_id INT NOT NULL REFERENCES credential(id) ON DELETE RESTRICT,
    date_of_birth TIMESTAMP NOT NULL
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createUserRoleTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS
  userrole(
    user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    role_id INT NOT NULL REFERENCES role(id) ON DELETE RESTRICT,

    PRIMARY KEY (user_id, role_id)
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createCategoryTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS
  category(
    category_id serial PRIMARY KEY NOT NULL,
    parent_id serial,
    category_name TEXT NOT NULL,
    cateogry_slug TEXT UNIQUE NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    level INT NOL NULL
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createPostTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS
  post(
    post_id serial PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL,
    overview TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    category_id INT NOT NULL REFERENCES category(id) ON DELETE RESTRICT,
    post_slug TEXT UNIQUE NOT NULL,
    admin_id INT REFERENCES users(id) ON DELETE RESTRICT,
    verify INT NOT NULL,
    is_block BOOLEAN NOT NULL,
    enable_comment BOOLEAN NOT NULL,
    view INT NOT NULL,
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createTagTable = () => {
  const createQuery = `CREATE TABLE IF NOT EXISTS
  tag(
    tag_id serial PRIMARY KEY NOT NULL,
    tag_name TEXT NOT NULL,
    create_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createPostTagTable = () => {
  const createQuery =  `CREATE TABLE IF NOT EXISTS
  posttag(
    post_id INT NOT NULL REFERENCES post(id) ON DELETE RESTRICT,
    tag_id INT NOT NULL REFERENCES tag(id) ON DELETE RESTRICT,
    create_at TIMESTAMP NOT NULL,

    PRIMARY KEY (post_id, tag_id)
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

const createUserHistoryTable = () => {
  const createQuery =  `CREATE TABLE IF NOT EXISTS
  userhistory(
    tag_id INT NOT NULL REFERENCES tag(id) ON DELETE RESTRICT,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    post_id INT NOT NULL REFERENCES post(id) ON DELETE RESTRICT,
    create_at TIMESTAMP NOT NULL,

    PRIMARY KEY (tag_id ,user_id, post_id)
  )`;

  pool.query(createQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}


/**
 * Drop Table
 */
const dropCredentialTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS credential';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropRoleTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS role';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUsersTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS users';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserRoleTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS userrole';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropCategoryTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS category';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropPostTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS post';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTagTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS tag';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropPostTagTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS posttag';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserHistoryTable = () => {
  const busDropQuery = 'DROP TABLE IF EXISTS userhistory';
  pool.query(busDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  // createCredentialTable(),
  // createRoleTable(),
  // createUsersTable(),
  // createUserRoleTable(),
  // createCategoryTable(),
  // createPostTable(),
  // createTagTable(),
  // createPostTagTable()
  // createUserHistoryTable()
  // insertRoleTable()
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropCredentialTable(),
  dropRoleTable(),
  dropUsersTable(),
  dropUserRoleTable(),
  dropCategoryTable(),
  dropPostTable(),
  dropTagTable(),
  dropPostTagTable(),
  dropUserHistoryTable()
};

module.exports = {
  createAllTables,
  dropAllTables,
};

require('make-runnable');