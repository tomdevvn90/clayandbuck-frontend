import { SITE_URL } from "../lib/constants";
import { getHomeQuotes } from "../lib/normal-api";

const quotesRssXml = (quotes) => {
  let rssItemsXml = "";
  quotes.forEach((q) => {
    rssItemsXml += `
    <item>
        <title>${q["title"]}</title>
        <content:encoded><![CDATA[${q["content"]}]]></content:encoded>
    </item>`;
  });
  return rssItemsXml;
};

const getRssXml = (homeQuotes) => {
  const channelInfo = homeQuotes.channel;
  const rssItemsXml = quotesRssXml(homeQuotes.quotes);

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
        <atom:link href="${SITE_URL}/homepagequotesfeed" rel="self" type="application/rss+xml" />
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
  const homeQuotes = await getHomeQuotes();
  const homeQuotesFeed = getRssXml(homeQuotes);

  //Set page headers
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  res.write(homeQuotesFeed);
  res.end();

  return { props: {} };
}
export default FeedPage;
