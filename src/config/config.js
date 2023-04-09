"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    development: {
        username: 'root',
        password: '0000',
        database: 'node_post',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: '0000',
        database: 'node_post_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: 'root',
        password: '0000',
        database: 'node_post',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false,
    },
};
