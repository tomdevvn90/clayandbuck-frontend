import { deleteCookie, setCookie } from "cookies-next";

/**
 * Check external link
 * @param path
 * @returns
 */
export const isExternalLink = (path: string) => {
  return path.includes("http") || path.includes("www") ? true : false;
};

/**
 * Check background page template
 * @param pageTemplate
 * @returns
 */
export const getBackgroundClass = (pageTemplate: string) => {
  const whiteBgListPage = ["special-offer-template", "terms-conditions-single-post", "eib-in-a-hurry"];
  return whiteBgListPage.includes(pageTemplate) ? "white-background" : "";
};

/**
 * Decode link
 * @param url
 * @returns
 */
export const decodeLink = (url: string) => {
  return decodeURIComponent(url).replaceAll("’", "'");
};

export const setCookieLoginInfo = (
  access_token: string,
  user_email: string,
  password: string,
  user_subscribed: string,
  cancel_at_period_end: string,
  user_privacy_optout: string
) => {
  setCookie("STYXKEY_ACCESS_TOKEN", access_token, { maxAge: 864000 }); // 864000 is 10 days
  setCookie("STYXKEY_USER_EMAIL", user_email, { maxAge: 864000 });
  setCookie("STYXKEY_USER_PASSWORD", password, { maxAge: 864000 });
  setCookie("STYXKEY_USER_SUBSCRIBED", user_subscribed, { maxAge: 864000 });
  setCookie("STYXKEY_USER_CANCELLED_SUBS", cancel_at_period_end, { maxAge: 864000 });
  setCookie("STYXKEY_USER_PRIVACY_OPTOUT", user_privacy_optout, { maxAge: 864000 });
};

export const deleteCookieLoginInfo = () => {
  deleteCookie("STYXKEY_ACCESS_TOKEN");
  deleteCookie("STYXKEY_USER_EMAIL");
  deleteCookie("STYXKEY_USER_PASSWORD");
  deleteCookie("STYXKEY_USER_SUBSCRIBED");
  deleteCookie("STYXKEY_USER_CANCELLED_SUBS");
  deleteCookie("STYXKEY_USER_PRIVACY_OPTOUT");
};
