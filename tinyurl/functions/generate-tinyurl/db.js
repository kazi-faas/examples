const faunadb = require('faunadb');
exports.q = faunadb.query;

exports.db = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: process.env.FAUNADB_ENDPOINT,
  port: 443,
  scheme: 'https',
});
