import isEmpty from '../validator/isEmpty';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import { useEffect } from 'react';

/**
 * Check if user is logged in.
 *
 * @return {object} Auth Object containing token and user data, false on failure.
 */
export const isUserValidated = () => {
  let userLoggedInData = '';

  const cookies = parseCookies();
  let authTokenData = cookies['token'];

  if (!isEmpty(authTokenData)) {
    userLoggedInData = authTokenData || '';
  }

  return userLoggedInData;
};

/**
 * Logout the user.
 *
 * @param {string} urlToRedirect URL where user needs to be redirected after logout.
 *
 * @return {void}
 */
export const logoutUser = (urlToRedirect: any) => {
  // Set auth data value in localStorage to empty.
  destroyCookie(null, 'token');

  /** Redirect the user to the given url. */
  Router.push(urlToRedirect);
};

/**
 * Exit preview mode.
 */
export const usePreviewModeExit = () => {
  useEffect(() => {
    fetch('/api/exit-preview', {
      method: 'POST',
    });
  }, []);
};

export default usePreviewModeExit;
