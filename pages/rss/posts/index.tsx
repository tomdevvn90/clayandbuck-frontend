import { SITE_URL } from "../../../lib/constants";
import { getRSSPosts } from "../../../lib/normal-api";

const postsRssXml = (posts) => {
  let rssItemsXml = "";
  posts.forEach((p) => {
    const ftImage = p["ftImage"] ? `<enclosure url="${p["ftImage"]}" type="image/jpeg" length="12216320" />` : "";
    const category = p["category"] ? `<category>${p["category"]}</category>` : "";
    const description = p["excerpt"] ? `<description><![CDATA[${p["excerpt"]}]]></description>` : "";
    rssItemsXml += `
      <item>
          <title>${p["title"]}</title>
					${ftImage}
          <pubDate>${p["pubDate"]} GMT</pubDate>
          <author/>
          <guid isPermaLink="false">${p["permalink"]}</guid>
          ${category}
          ${description}
          <link>${p["permalink"]}</link>
          <content:encoded><![CDATA[${p["content"]}]]></content:encoded>
      </item>`;
  });
  return rssItemsXml;
};

const getRssXml = (posts) => {
  const channelInfo = posts.channel;
  const rssItemsXml = postsRssXml(posts.posts);

  return `<?xml version="1.0" ?>
  <rss version="2.0"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:wfw="http://wellformedweb.org/CommentAPI/"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:atom="http://www.w3.org/2005/Atom"
      xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
      xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
        >
      <channel>
        <title>The Clay Travis &amp; Buck Sexton Show - Feed</title>
        <atom:link href="${SITE_URL}/rss-new/posts" rel="self" type="application/rss+xml" />
        <link>${SITE_URL}</link>
        <description>The Clay Travis &amp; Buck Sexton Show</description>
        <lastBuildDate>${channelInfo["lastBuildDate"]} GMT</lastBuildDate>
        <language>en-US</language>
        <sy:updatePeriod>${channelInfo["period"]}</sy:updatePeriod>
        <sy:updateFrequency>${channelInfo["frequency"]}</sy:updateFrequency>
        <generator>ClayAndBuck</generator>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

const FeedPage = () => null;
export async function getServerSideProps({ res }) {
  // Fetch data from external API
  const posts = await getRSSPosts(0, 0);
  const postsFeed = getRssXml(posts);

  //Set page headers
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  res.write(postsFeed);
  res.end();

  return { props: {} };
}
export default FeedPage;
