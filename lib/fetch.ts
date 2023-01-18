const BASE_URL = process.env.BASE_URL;

export async function getPosts() {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/posts?acf_format=standard&per_page=40&orderby=menu_order&order=asc`
  );
  const data = await res.json();
  return data;
}

export async function getPages() {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/pages?acf_format=standard`
  );
  const data = await res.json();
  return data;
}

export async function getHome() {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/pages?slug=home&acf_format=standard`
  );
  const data = await res.json();
  return data;
}

export async function getPortfolio() {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/portfolio?acf_format=standard&per_page=40&orderby=menu_order&order=asc`
  );
  const data = await res.json();
  return data;
}

// get user with bearer token
export async function getAccount(token: string) {
  const res = await fetch(`${BASE_URL}/wp-json/wp/v2/users/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${token}`,
    },
  });
  const data = await res.json();
  const cookies = res.headers.get('set-cookie');
  return { data, cookies };
}

export async function getPostsByPage() {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/posts?acf_format=standard&per_page=6&orderby=menu_order&order=asc`
  );
  const data = await res.json();
  // send back the headers so we can get the total number of posts
  return { data, headers: res.headers };
  // return data;
}

export async function getPostsByPageNo(page: string) {
  const res = await fetch(
    `${BASE_URL}/wp-json/wp/v2/posts?acf_format=standard&per_page=6&orderby=menu_order&order=asc&page=${page}`
  );
  const data = await res.json();
  // send back the headers so we can get the total number of posts
  return { data, headers: res.headers };
  // return data;
}
