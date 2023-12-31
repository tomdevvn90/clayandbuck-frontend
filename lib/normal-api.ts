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
  return await fetchAPINormal(`wp/v2/podcasts-player/`);
}

/**
 * Get Sidebar Widget
 */
export async function getSidebarWidget(sidebar_id: string) {
  return await fetchAPINormal(`wp/v2/widgets?sidebar=${sidebar_id}`);
}

/**
 * Get Top Stories
 */
export async function getTopStories(crPage: number, excludeStories: string) {
  return await fetchAPINormal(`wp/v2/top-stories/?crPage=${crPage}&excludeStories=${excludeStories}`);
}

/**
 * Get Books Movies
 */
export async function getRecsData(crPage: number, perPage: number, excludeBooks: string = "", typeRec: string = "") {
  const typeRecE = encodeURIComponent(typeRec);
  return await fetchAPINormal(
    `wp/v2/books-movies/?crPage=${crPage}&perPage=${perPage}&excludeBooks=${excludeBooks}&type=${typeRecE}`
  );
}

/**
 * Get Login Data
 */
export async function getLoginData(username: string, password: string) {
  return await fetchAPIPost(`wp/v2/subscriber/login/`, { username, password });
}

/**
 * Get Logout Data
 */
export async function getLogoutData(accessToken: string) {
  const accessTokenEn = encodeURIComponent(accessToken);
  return await fetchAPINormal(`wp/v2/subscriber/logout/?accessToken=${accessTokenEn}`);
}

/**
 * Get Password Hint
 */
export async function getPasswordHintData(recaptchaKey: string, email: string) {
  const emailEn = encodeURIComponent(email);
  const recaptchaKeyEn = encodeURIComponent(recaptchaKey);
  return await fetchAPINormal(`wp/v2/subscriber/get-hint/?email=${emailEn}&recaptchaToken=${recaptchaKeyEn}`);
}

/**
 * Get Forgot Password
 */
export async function getForgotPasswordData(recaptchaKey: string, email: string) {
  const emailEn = encodeURIComponent(email);
  const recaptchaKeyEn = encodeURIComponent(recaptchaKey);
  return await fetchAPINormal(`wp/v2/subscriber/forgot-password/?email=${emailEn}&recaptchaToken=${recaptchaKeyEn}`);
}

/**
 * Reset password
 */
export async function resetPassword(passwordToken: string, password: string, hintPassword: string) {
  return await fetchAPIPost(`wp/v2/subscriber/reset-password/`, {
    passwordToken,
    password,
    hintPassword,
  });
}

/**
 * get Account Info
 */
export async function getAccountInfo(accessToken: string) {
  const accessTokenEn = encodeURIComponent(accessToken);
  return await fetchAPINormal(`wp/v2/subscriber/account-info/?accessToken=${accessTokenEn}`);
}

/**
 * Change email
 */
export async function changeEmail(newEmail: string, password: string, currentEmail: string) {
  return await fetchAPIPost(`wp/v2/subscriber/change-email/`, { newEmail, password, currentEmail });
}

/**
 * Update email
 */
export async function updateEmail(emailToken: string) {
  return await fetchAPIPost(`wp/v2/subscriber/update-email/`, { emailToken });
}

/**
 * Change password
 */
export async function changePassword(email: string, crPassword: string, newPassword: string, hintPassword: string) {
  return await fetchAPIPost(`wp/v2/subscriber/change-password/`, {
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
  return await fetchAPIPost(`wp/v2/subscriber/update-billing/`, billInfoProp);
}

/**
 * Cancel Subscription
 */
export async function cancelSubscriptionPlan(accessToken: string, subsId: string) {
  return await fetchAPIPost(`wp/v2/subscriber/cancel-subscription/`, { accessToken, subsId });
}

/**
 * Cancel Subscription
 */
export async function reactiveSubscriptionPlan(accessToken: string, subsId: string) {
  return await fetchAPIPost(`wp/v2/subscriber/reactive-subscription/`, { accessToken, subsId });
}

/**
 * Get Plans Info
 */
export async function getPlansInfo(userEmail: string = "") {
  if (userEmail) {
    return await fetchAPINormal(`wp/v2/subscriber/get-plans/?userEmail=${userEmail}`);
  } else {
    return await fetchAPINormal(`wp/v2/subscriber/get-plans/`);
  }
}

/**
 * Change Plan
 */
export async function changePlanSubs(accessToken: string, planId: string, subsId: string) {
  return await fetchAPIPost(`wp/v2/subscriber/change-plan/`, { accessToken, planId, subsId });
}

/**
 * Verify Email Subscriber
 */
export async function verifyEmailSubs(email: string, recaptchaToken: string, planId: string, signUpGift: string) {
  return await fetchAPIPost(`wp/v2/subscriber/verify-email/`, { email, recaptchaToken, planId, signUpGift });
}

/**
 * Create User
 */
export async function createUser(emailToken: string, password: string, passwordHint: string) {
  return await fetchAPIPost(`wp/v2/subscriber/create-user/`, { emailToken, password, passwordHint });
}

/**
 * Create Subscription
 */
export async function createSubscription(accessToken: string, recurlyToken: string, planId: string, company: string) {
  return await fetchAPIPost(`wp/v2/subscriber/create-subscription/`, { accessToken, recurlyToken, planId, company });
}

/**
 * Create Gift Subscription
 */
export async function createGiftSubscription(
  accessToken: string,
  recurlyToken: string,
  gRecaptcha: string,
  planId: string,
  giftEmail: string,
  giftName: string
) {
  return await fetchAPIPost(`wp/v2/subscriber/create-gift-subscription/`, {
    accessToken,
    recurlyToken,
    gRecaptcha,
    planId,
    giftEmail,
    giftName,
  });
}

/**
 * Search function
 */
export async function searchByKeyword(keyword: string, crPage: number) {
  return await fetchAPINormal(`wp/v2/search?search=${keyword}&page=${crPage}&_embed`);
}

/**
 * Get Home Quotes for Rss
 */
export async function getHomeQuotes() {
  return await fetchAPINormal("wp/v2/rss-home-quotes");
}

/**
 * Get Mobile Posts for Rss
 */
export async function getMobilePosts(postCount: number, crPage: number) {
  return await fetchAPINormal(`wp/v2/rss-mobile-posts?postCount=${postCount}&crPage=${crPage}`);
}

/**
 * Get New Posts for Rss
 */
export async function getNewPosts(postCount: number, crPage: number) {
  return await fetchAPINormal(`wp/v2/rss-new-posts?postCount=${postCount}&crPage=${crPage}`);
}

/**
 * Get Posts for Rss
 */
export async function getRSSPosts(postCount: number, crPage: number) {
  return await fetchAPINormal(`wp/v2/rss-posts?postCount=${postCount}&crPage=${crPage}`);
}
