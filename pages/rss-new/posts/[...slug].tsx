import { SITE_URL } from "../../../lib/constants";
import { getNewPosts } from "../../../lib/normal-api";

const postsRssXml = (posts) => {
  let rssItemsXml = "";
  posts.forEach((p) => {
    const ftImage = p["ftImage"]
      ? `<enclosure url="${p["ftImage"]}" type="image/jpeg" length="12216320" /><media:thumbnail url="${p["ftImage"]}"/>`
      : "";
    const category = p["category"] ? `<category>${p["category"]}</category>` : "";
    const description = p["excerpt"] ? `<description><![CDATA[${p["excerpt"]}]]></description>` : "";
    rssItemsXml += `
      <item>
          <title>${p["title"]}</title>
					${ftImage}
          <dc:creator>${p["creator"]}</dc:creator>
          <pubDate>${p["pubDate"]} GMT</pubDate>
          <author/>
          <guid isPermaLink="false">${p["permalink"]}</guid>
          ${category}
          ${description}
          <link>${p["permalink"]}</link>
          <content:encoded><![CDATA[${p["content"]}]]></content:encoded>
          <nb:scripts>
              <![CDATA[ <script src="//assets.adobedtm.com/dba7b4ad2c8b/bb53a2b65c2f/launch-64f312a4ca91.min.js"></script>
              <!-- Begin comScore Tag -->
              <script>
                var _comscore = _comscore || [];
                _comscore.push({ c1: "2", c2: "6036262" });
                (function() {
                var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                el.parentNode.insertBefore(s, el);
                })();
              </script>
              <noscript>
                <img src="http://b.scorecardresearch.com/p?c1=2&c2=6036262&cv=2.0&cj=1" />
              </noscript>
              <!-- End comScore Tag -->
              <script>
                (function(s, p, d)
                { var h=d.location.protocol, i=p+"-"+s, e=d.getElementById(i), r=d.getElementById(p+"-root"), u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net" :"static."+p+".com"; if (e) return; e = d.createElement(s); e.id = i; e.async = true; e.src = h+"//"+u+"/p.js"; r.appendChild(e); }
                )("script", "parsely", document);
              </script>]]>
          </nb:scripts>

          <snf:analytics>
              <![CDATA[ <script src="//assets.adobedtm.com/dba7b4ad2c8b/bb53a2b65c2f/launch-64f312a4ca91.min.js"></script> 
              <!-- Begin comScore Tag -->
              <script>
                var _comscore = _comscore || [];
                _comscore.push({ c1: "2", c2: "6036262" });
                (function() {
                var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
                el.parentNode.insertBefore(s, el);
                })();
              </script>
              <noscript>
                <img src="http://b.scorecardresearch.com/p?c1=2&c2=6036262&cv=2.0&cj=1" />
              </noscript>
              <!-- End comScore Tag -->
              <script>
                (function(s, p, d)
                { var h=d.location.protocol, i=p+"-"+s, e=d.getElementById(i), r=d.getElementById(p+"-root"), u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net" :"static."+p+".com"; if (e) return; e = d.createElement(s); e.id = i; e.async = true; e.src = h+"//"+u+"/p.js"; r.appendChild(e); }
                )("script", "parsely", document);
              </script>]]>
          </snf:analytics>
      </item>`;
  });
  return rssItemsXml;
};

const getRssXml = (newPosts, postCount, crPage) => {
  const channelInfo = newPosts.channel;
  const rssItemsXml = postsRssXml(newPosts.posts);

  return `<?xml version="1.0" ?>
  <rss version="2.0"
      xmlns:media="http://search.yahoo.com/mrss/"
      xmlns:nb="https://www.newsbreak.com/"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
      xmlns:wfw="http://wellformedweb.org/CommentAPI/"
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:atom="http://www.w3.org/2005/Atom"
      xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
      xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
      xmlns:snf="http://www.smartnews.be/snf"
        >
      <channel>
        <title>The Clay Travis &amp; Buck Sexton Show - Feed</title>
        <atom:link href="${SITE_URL}/rss-new/posts/${postCount}/${crPage}" rel="self" type="application/rss+xml" />
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
export async function getServerSideProps({ res, params }) {
  const slugParams = params?.slug;
  const postCount = slugParams ? slugParams[0] : 0;
  const crPage = slugParams ? slugParams[1] : 0;

  // Fetch data from external API
  const newPosts = await getNewPosts(postCount, crPage);
  const newPostsFeed = getRssXml(newPosts, postCount, crPage);

  //Set page headers
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  res.write(newPostsFeed);
  res.end();

  return { props: {} };
}
export default FeedPage;
