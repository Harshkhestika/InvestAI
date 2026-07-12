const Parser = require('rss-parser');
const parser = new Parser();

const getMarketNews = async (req, res) => {
  try {
    // Times of India Business News RSS feed
    const feed = await parser.parseURL('https://timesofindia.indiatimes.com/rssfeeds/1898055.cms');
    
    // We only need top 8 items
    const topNews = feed.items.slice(0, 8).map(item => {
      // Extract image URL from description using regex
      let imageUrl = null;
      let cleanDescription = item.content || item.description || '';
      
      const imgRegex = /<img[^>]+src="([^">]+)"/g;
      const match = imgRegex.exec(cleanDescription);
      if (match && match[1]) {
        imageUrl = match[1];
      }
      
      // Clean up description (remove html tags)
      cleanDescription = cleanDescription.replace(/<\/?[^>]+(>|$)/g, "").trim();

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: cleanDescription.substring(0, 100) + '...',
        imageUrl: imageUrl || '/assets/news1.png' // fallback image
      };
    });

    res.json(topNews);
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).json({ message: 'Failed to fetch market news' });
  }
};

module.exports = {
  getMarketNews
};
