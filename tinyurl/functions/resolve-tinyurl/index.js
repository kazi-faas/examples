const { send } = require('micro');
const { db, q } = require('./db');

module.exports = async (req, res) => {
  const code = req.url.substring(1);

  try {
    const {
      data: { url },
    } = await db.query(q.Get(q.Match(q.Index('urls_by_code'), code)));

    res.setHeader('Location', url);
    send(res, 301);
  } catch {
    send(res, 404, 'No URL Found');
  }
};
