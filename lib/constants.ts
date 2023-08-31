export const META_DESC =
  "Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor.";
export const HOME_OG_IMAGE_URL = "/public/home-og-image.png";
export const TWITTER_OG_IMAGE_URL = "https://www.clayandbuck.com/wp-content/uploads/2022/05/social.png";

export const WP_REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const CNB_RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
export const CNB_RECURLY_API_KEY = process.env.NEXT_PUBLIC_RECURLY_API_KEY;

export async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export interface recItemProps {
  ratingPostBooks: string;
  buyUrlPostBooks: string;
  watchUrlPostBooks: string;
  typePostBooks: string;
  content: string;
  title: string;
  ftImage: string;
}

export interface PodcastProps {
  title: string;
  duration: string;
  description: string;
  mediaUrl: string;
  startDate: string;
  imageUrl: string;
}

export interface BillingInfoProps {
  accessToken: string;
  country: string;
  updateCard: string;
  cardNum: string;
  cardExp: string;
  cardCvv: string;
  firstName: string;
  lastName: string;
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  zipCode: string;
}
