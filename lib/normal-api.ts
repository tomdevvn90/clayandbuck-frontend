import { WP_REST_API_URL } from "./constants";

/**
 * Fetch data by REST API
 * @param url
 * @returns
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
 * @returns
 */
export async function getPodcastsData() {
  const data = await fetchAPINormal(`/v2/podcasts-player/`);
  return data;
}
/**
 * Get data for Homepage
 * @returns
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
 * @param crPage
 * @param perPage
 * @param excludeStories
 * @returns
 */
export async function getTopStories(crPage: number, perPage: number, excludeStories: string) {
  const data = await fetchAPINormal(
    `/v2/top-stories/?crPage=${crPage}&perPage=${perPage}&excludeStories=${excludeStories}`
  );
  return data;
}

/**
 * Get Books Movies
 * @param crPage
 * @param perPage
 * @param excludeStories
 * @returns
 */
export async function getRecsData(crPage: number, perPage: number, excludeBooks: string = "", typeRec: string = "") {
  const data = await fetchAPINormal(
    `/v2/books-movies/?crPage=${crPage}&perPage=${perPage}&excludeBooks=${excludeBooks}&type=${typeRec}`
  );
  return data;
}

/**
 * Get Login Data
 * @param username
 * @param password
 * @returns
 */
export async function getLoginData(username: string, password: string) {
  const useNameEncode = encodeURIComponent(username);
  const passwordEncode = encodeURIComponent(password);
  const data = await fetchAPINormal(`/v2/subscriber/login/?username=${useNameEncode}&password=${passwordEncode}`);
  return data;
}

/**
 * Get Password Hint
 * @param username
 * @param password
 * @returns
 */
export async function getPasswordHintData(recaptchaKey: string, email: string) {
  const emailEncode = encodeURIComponent(email);
  const recaptchaKeyEncode = encodeURIComponent(recaptchaKey);
  const data = await fetchAPINormal(
    `/v2/subscriber/get-hint/?email=${emailEncode}&recaptchaToken=${recaptchaKeyEncode}`
  );
  return data;
}

/**
 * Get Forgot Password
 * @param username
 * @param password
 * @returns
 */
export async function getForgotPasswordData(recaptchaKey: string, email: string) {
  const emailEncode = encodeURIComponent(email);
  const recaptchaKeyEncode = encodeURIComponent(recaptchaKey);
  const data = await fetchAPINormal(
    `/v2/subscriber/forgot-password/?email=${emailEncode}&recaptchaToken=${recaptchaKeyEncode}`
  );
  return data;
}

export async function getAccountInfo(accessToken: string) {
  const accessTokenEncode = encodeURIComponent(accessToken);
  const data = await fetchAPINormal(`/v2/subscriber/account-info/?accessToken=${accessTokenEncode}`);
  return data;
}
