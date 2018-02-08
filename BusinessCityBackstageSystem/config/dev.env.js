'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    //BASE_API: '"http://192.168.199.199:8081"',
    // APP_ORIGIN: '"https://wallstreetcn.com"'
})