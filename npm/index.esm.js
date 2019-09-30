if (process.env.NODE_ENV === 'production') {
    module.exports = require('./react-animated-router.esm.production.js');
} else {
    module.exports = require('./react-animated-router.esm.development.js');
}
