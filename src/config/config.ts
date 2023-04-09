export default {
  development: {
    username: 'root',
    password: '0000',
    database: 'node_post',
    host: '127.0.0.1',
    dialect: 'mysql' as const,
  },
  test: {
    username: 'root',
    password: '0000',
    database: 'node_post_test',
    host: '127.0.0.1',
    dialect: 'mysql' as const,
  },
  production: {
    username: 'root',
    password: '0000',
    database: 'node_post',
    host: '127.0.0.1',
    dialect: 'mysql' as const,
    logging: false,
  },
};
