import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  user: string;
  token: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get data submitted in request's body.
  const body = req.body;

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.username || !body.password) {
    // Sends a HTTP bad request error code
    return res.status(400).json({
      message: 'Error: First or last name not found',
      user: '',
      token: '',
    });
  }

  const token = await fetch(
    `${process.env.BASE_URL}/wp-json/simple-jwt-login/v1/auth`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
        password: body.password,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.data.jwt);

  if (!token) {
    // Sends a HTTP bad request error code
    return res
      .status(400)
      .json({ message: 'Error: Token not found', user: '', token: '' });
  }

  const user = await fetch(`${process.env.BASE_URL}/wp-json/wp/v2/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);

  res
    .status(200)
    .json({ message: 'Success', user: `${user.name}`, token: `${token}` });
}
