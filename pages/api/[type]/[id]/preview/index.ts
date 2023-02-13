import { parseCookies } from 'nookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostRevisions, getPageRevisions } from './../../../../../lib/fetch';

enum PreviewType {
  Post = 'post',
  Page = 'page',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * if nonce from url query parameter is invalid, return 401
   */
  if (!req.query.nonce) {
    return res.status(401).json({ message: 'Invalid nonce token!' });
  }

  const id = parseInt(req.query.id as string, 10);
  const token = parseCookies({ req })['token'];

  try {
    let revisions;

    if (req.query.type === PreviewType.Page) {
      const data = await getPageRevisions(id, token);
      revisions = data.data;
    } else {
      const data = await getPostRevisions(id, token);
      revisions = data.data;
    }

    const getCurrentRevision = revisions.find(
      (ids: any) => ids.parent === id || null
    );

    if (!getCurrentRevision.id) {
      res.status(200).json({ message: 'No preview.' });
      return;
    }

    const url =
      req.query.type === PreviewType.Page
        ? `/${getCurrentRevision.slug}`
        : `/posts/${getCurrentRevision.slug}/`;

    res.setPreviewData({
      post_id: getCurrentRevision.parent,
      revision_id: getCurrentRevision.id,
      token: token,
    });
    res.redirect(url);
  } catch (error) {
    console.log(error);
    res.status(200).json({ error });
  }
}
