if (process.env.NODE_ENV === 'production') {
    module.exports = require('./react-animated-router.cjs.production.js');
} else {
    module.exports = require('./react-animated-router.cjs.development.js');
}
