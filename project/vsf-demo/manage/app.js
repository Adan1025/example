const WebpackDevServer = require("webpack-dev-server");
const webpack = require('webpack');
const config = require("./webpack.config.js");
config.entry.index.unshift("webpack-dev-server/client?http://localhost:3000/");

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
});
server.listen(3000, "localhost", function() {});
