const { json, send } = require('micro');
const { isWebUri } = require('valid-url');
const { nanoid } = require('nanoid');

const { db, q } = require('./db');

module.exports = async (req, res) => {
  const { url } = await json(req);

  if (!isWebUri(url)) {
    send(res, 401, 'Invalid URL');
  } else {
    const code = nanoid(10);

    await db.query(
      q.Create(q.Collection('tinyurls'), {
        data: { url, code },
      })
    );

    return { shortUrl: `${process.env.BASE_URL}/${code}`, originalUrl: url };
  }
};
