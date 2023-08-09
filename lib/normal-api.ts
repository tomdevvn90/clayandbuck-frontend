import { WP_REST_API_URL } from "./constants";

/**
 * Fetch data by REST API
 */
async function fetchAPINormal(url: string) {
  try {
    const response = await fetch(`${WP_REST_API_URL}${url}`);
    return await response.json();
  } catch (e) {
    console.error("Error while fetching PWS API:", e);
  }
}

/**
 * Get Podcasts data
 */
export async function getPodcastsData() {
  const data = await fetchAPINormal(`/v2/podcasts-player/`);
  return data;
}

/**
 * Get data for Homepage
 */
export async function getHomePageData() {
  const data = await fetchAPINormal(`/v2/home-data/`);
  return data;
}

/**
 * Get Sidebar Widget
 */
export async function getSidebarWidget(sidebar_id: string) {
  const data = await fetchAPINormal(`/wp-json/wp/v2/widgets?sidebar=${sidebar_id}`);
  return data;
}

/**
 * Get Top Stories
 */
export async function getTopStories(crPage: number, perPage: number, excludeStories: string) {
  const data = await fetchAPINormal(
    `/v2/top-stories/?crPage=${crPage}&perPage=${perPage}&excludeStories=${excludeStories}`
  );
  return data;
}

/**
 * Get Books Movies
 */
export async function getRecsData(crPage: number, perPage: number, excludeBooks: string = "", typeRec: string = "") {
  const data = await fetchAPINormal(
    `/v2/books-movies/?crPage=${crPage}&perPage=${perPage}&excludeBooks=${excludeBooks}&type=${typeRec}`
  );
  return data;
}

/**
 * Get Login Data
 */
export async function getLoginData(username: string, password: string) {
  const useNameEn = encodeURIComponent(username);
  const passwordEn = encodeURIComponent(btoa(password));
  const data = await fetchAPINormal(`/v2/subscriber/login/?username=${useNameEn}&password=${passwordEn}`);
  return data;
}

/**
 * Get Password Hint
 */
export async function getPasswordHintData(recaptchaKey: string, email: string) {
  const emailEn = encodeURIComponent(email);
  const recaptchaKeyEn = encodeURIComponent(recaptchaKey);
  const data = await fetchAPINormal(`/v2/subscriber/get-hint/?email=${emailEn}&recaptchaToken=${recaptchaKeyEn}`);
  return data;
}

/**
 * Get Forgot Password
 */
export async function getForgotPasswordData(recaptchaKey: string, email: string) {
  const emailEn = encodeURIComponent(email);
  const recaptchaKeyEn = encodeURIComponent(recaptchaKey);
  const data = await fetchAPINormal(
    `/v2/subscriber/forgot-password/?email=${emailEn}&recaptchaToken=${recaptchaKeyEn}`
  );
  return data;
}

/**
 * get Account Info
 */
export async function getAccountInfo(accessToken: string) {
  const accessTokenEn = encodeURIComponent(btoa(accessToken));
  const data = await fetchAPINormal(`/v2/subscriber/account-info/?accessToken=${accessTokenEn}`);
  return data;
}

/**
 * Change email
 */
export async function changeEmail(newEmail: string, password: string, currentEmail: string) {
  const newEmailEn = encodeURIComponent(newEmail);
  const passwordEn = encodeURIComponent(btoa(password));
  const currentEmailEn = encodeURIComponent(currentEmail);
  const data = await fetchAPINormal(
    `/v2/subscriber/change-email/?newEmail=${newEmailEn}&password=${passwordEn}&currentEmail=${currentEmailEn}`
  );
  return data;
}

/**
 * Change password
 */
export async function changePassword(email: string, crPassword: string, newPassword: string, hintPassword: string) {
  const emailEn = encodeURIComponent(email);
  const crPasswordEn = encodeURIComponent(btoa(crPassword));
  const newPasswordEn = encodeURIComponent(btoa(newPassword));
  const hintPasswordEn = encodeURIComponent(hintPassword);
  const data = await fetchAPINormal(
    `/v2/subscriber/change-password/?email=${emailEn}&crPassword=${crPasswordEn}&newPassword=${newPasswordEn}&hintPassword=${hintPasswordEn}`
  );
  return data;
}
