const { Pool, Client } = require('pg');
const config = require('../Settings');

const pool = new Pool(config.dbSetting);

module.exports = {
    executeQuery: (queryText, params, callback) => {
        return pool.query(queryText, params, callback)
    }
};