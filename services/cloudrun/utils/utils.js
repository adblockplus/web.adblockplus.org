/**
 * Helper functions
 */

/**
 * Return the query string portion of a request
 * @param {req} req expressjs req object
 * @returns {String} Query string
 */
const getQueryString = req => {
  return Object.keys(req.query).length > 0
    ? req.url.substring(req.url.indexOf('?'))
    : '';
}

module.exports = {
  getQueryString,
};
