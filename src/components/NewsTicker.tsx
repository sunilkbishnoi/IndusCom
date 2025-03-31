
import React, { useEffect, useRef } from 'react';

interface NewsTickerProps {
  news: string[];
}

const NewsTicker: React.FC<NewsTickerProps> = ({ news }) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tickerElement = tickerRef.current;
    if (!tickerElement) return;

    const scrollWidth = tickerElement.scrollWidth;
    const animationDuration = scrollWidth * 0.02; // Adjust speed based on content length

    const animate = () => {
      if (!tickerElement) return;
      
      if (tickerElement.scrollLeft >= scrollWidth / 2) {
        // Reset when we've scrolled through half the content (since content is duplicated)
        tickerElement.scrollLeft = 0;
      } else {
        // Scroll by 1px
        tickerElement.scrollLeft += 1;
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [news]);

  // Duplicate the news items to create a seamless loop
  const duplicatedNews = [...news, ...news];

  return (
    <div className="bg-steel-card border-t border-b border-gray-800 overflow-hidden">
      <div 
        ref={tickerRef}
        className="py-2 flex items-center whitespace-nowrap overflow-hidden scrollbar-hide"
      >
        {duplicatedNews.map((item, index) => (
          <div key={index} className="inline-block mx-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-steel-positive mr-2"></span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
