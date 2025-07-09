import React, { useEffect, useState } from 'react';
import { Newspaper } from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const rssUrl = encodeURIComponent(
          'https://feeds.bbci.co.uk/sport/formula1/rss.xml'
        );
        const res = await fetch(
          `https://api.allorigins.win/raw?url=${rssUrl}`
        );
        const text = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'application/xml');
        const items = Array.from(doc.querySelectorAll('item'))
          .slice(0, 5)
          .map((item) => ({
            title: item.querySelector('title')?.textContent || '',
            link: item.querySelector('link')?.textContent || '',
            pubDate: item.querySelector('pubDate')?.textContent || ''
          }));
        setNews(items);
      } catch (err) {
        console.error('Failed to fetch news', err);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="py-16 bg-[#F8EEE1]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Newspaper className="w-8 h-8 text-[#008250]" />
            <h2 className="text-4xl font-bold text-[#008250]">LATEST NEWS</h2>
          </div>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {news.map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-white/80 backdrop-blur-lg rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
              <div className="text-xs text-gray-600">
                {new Date(item.pubDate).toLocaleDateString()}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
