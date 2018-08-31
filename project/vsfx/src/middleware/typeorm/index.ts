const _config = (global['config'] || {}).mysql;
//typeorm
require("reflect-metadata");
const typeorm = require("typeorm");
const path = require("path");
module.exports = function () {
    const optTypeOrm = {
        type: "mysql",
        host: _config.host,
        username: _config.user,
        password: _config.password,
        database: _config.database,
        port: _config.port,
        acquireTimeout: _config.acquireTimeout,
        synchronize: _config.synchronize,
        logging: _config.logging,
        entities: _config.entities
    }
    let connection = null;

    return async (req, res, next) => {
        if (!connection) {
            try {
                connection = await typeorm.createConnection(optTypeOrm)
            } catch (err) {
                console.log(err)
            }
        }
        req.connection = connection;
        next();
    }
}