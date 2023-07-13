export const META_DESC = 'Clay Travis and Buck Sexton tackle the biggest stories in news, politics and current events with intelligence and humor.'
export const HOME_OG_IMAGE_URL = '/public/home-og-image.png'

export const WP_REST_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL

export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
    return res.json()
}