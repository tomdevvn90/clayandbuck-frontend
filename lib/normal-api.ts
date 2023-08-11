import { BillingInfoProps, WP_REST_API_URL } from "./constants";

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
 * Fetch data by REST API with method POST
 */
async function fetchAPIPost(url: string, bodyParams) {
  try {
    const response = await fetch(`${WP_REST_API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    });
    return await response.json();
  } catch (e) {
    console.error("Error while fetching PWS API:", e);
  }
}

/**
 * Get Podcasts data
 */
export async function getPodcastsData() {
  return await fetchAPINormal(`/v2/podcasts-player/`);
}

/**
 * Get data for Homepage
 */
export async function getHomePageData() {
  return await fetchAPINormal(`/v2/home-data/`);
}

/**
 * Get Sidebar Widget
 */
export async function getSidebarWidget(sidebar_id: string) {
  return await fetchAPINormal(`/wp-json/wp/v2/widgets?sidebar=${sidebar_id}`);
}

/**
 * Get Top Stories
 */
export async function getTopStories(crPage: number, perPage: number, excludeStories: string) {
  return await fetchAPINormal(`/v2/top-stories/?crPage=${crPage}&perPage=${perPage}&excludeStories=${excludeStories}`);
}

/**
 * Get Books Movies
 */
export async function getRecsData(crPage: number, perPage: number, excludeBooks: string = "", typeRec: string = "") {
  const typeRecE = encodeURIComponent(typeRec);
  return await fetchAPINormal(
    `/v2/books-movies/?crPage=${crPage}&perPage=${perPage}&excludeBooks=${excludeBooks}&type=${typeRecE}`
  );
}

/**
 * Get Login Data
 */
export async function getLoginData(username: string, password: string) {
  return await fetchAPIPost(`/v2/subscriber/login/`, { username, password });
}

/**
 * Get Logout Data
 */
export async function getLogoutData(accessToken: string) {
  const accessTokenEn = encodeURIComponent(accessToken);
  return await fetchAPINormal(`/v2/subscriber/logout/?accessToken=${accessTokenEn}`);
}

/**
 * Get Password Hint
 */
export async function getPasswordHintData(recaptchaKey: string, email: string) {
  const emailEn = encodeURIComponent(email);
  const recaptchaKeyEn = encodeURIComponent(recaptchaKey);
  return await fetchAPINormal(`/v2/subscriber/get-hint/?email=${emailEn}&recaptchaToken=${recaptchaKeyEn}`);
}

/**
 * Get Forgot Password
 */
export async function getForgotPasswordData(recaptchaKey: string, email: string) {
  const emailEn = encodeURIComponent(email);
  const recaptchaKeyEn = encodeURIComponent(recaptchaKey);
  return await fetchAPINormal(`/v2/subscriber/forgot-password/?email=${emailEn}&recaptchaToken=${recaptchaKeyEn}`);
}

/**
 * get Account Info
 */
export async function getAccountInfo(accessToken: string) {
  const accessTokenEn = encodeURIComponent(accessToken);
  return await fetchAPINormal(`/v2/subscriber/account-info/?accessToken=${accessTokenEn}`);
}

/**
 * Change email
 */
export async function changeEmail(newEmail: string, password: string, currentEmail: string) {
  return await fetchAPIPost(`/v2/subscriber/change-email/`, { newEmail, password, currentEmail });
}

/**
 * Change password
 */
export async function changePassword(email: string, crPassword: string, newPassword: string, hintPassword: string) {
  return await fetchAPIPost(`/v2/subscriber/change-password/`, {
    email,
    crPassword,
    newPassword,
    hintPassword,
  });
}

/**
 * Update Billing Info
 */
export async function updateBillingInfo(billInfoProp: BillingInfoProps) {
  return await fetchAPIPost(`/v2/subscriber/update-billing/`, billInfoProp);
}
