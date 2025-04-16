import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Info, Download, Twitter, ChevronDown } from "lucide-react";
import SearchBox from "@/components/SearchBox";
import MPProfile from "@/components/MPProfile";
import WordCloud, { WordCloudRef } from "@/components/WordCloud";
import { MP, WordCloudItem } from "@/types";
import { getMPSpeeches } from "@/services/hansardApi";
import { getWordCloudItems } from "@/utils/wordCloudUtils";

const Index = () => {
  const wordCloudRef = useRef<WordCloudRef>(null);
  const [selectedMP, setSelectedMP] = useState<MP | null>(null);
  const [wordCloudData, setWordCloudData] = useState<WordCloudItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [noSpeechesMessage, setNoSpeechesMessage] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollingEnabled, setIsScrollingEnabled] = useState(false);
  const SCROLL_THRESHOLD = 150; // Reduced from 300 to 150

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!isScrollingEnabled) {
        e.preventDefault();
        const newScrollPosition = Math.min(scrollPosition + Math.abs(e.deltaY), SCROLL_THRESHOLD);
        setScrollPosition(newScrollPosition);
        
        if (newScrollPosition >= SCROLL_THRESHOLD) {
          setIsScrollingEnabled(true);
        }
        return;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrollingEnabled) {
        e.preventDefault();
        const newScrollPosition = Math.min(scrollPosition + 10, SCROLL_THRESHOLD);
        setScrollPosition(newScrollPosition);
        
        if (newScrollPosition >= SCROLL_THRESHOLD) {
          setIsScrollingEnabled(true);
        }
        return;
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isScrollingEnabled, scrollPosition]);

  const handleSelectMP = async (mp: MP) => {
    setSelectedMP(mp);
    setLoading(true);
    setWordCloudData([]);
    setNoSpeechesMessage(null);

    try {
      const speeches = await getMPSpeeches(mp.id);
      
      if (speeches.items.length === 1 && speeches.items[0].text?.includes("hasn't spoken in the Commons")) {
        setNoSpeechesMessage(speeches.items[0].text);
        return;
      }

      const wordCloudItems = speeches.items
        .filter(item => typeof item.text === 'string' && item.text.length > 0)
        .map(item => ({
          text: item.text as string,
          value: (item as any).value || 1,
          color: undefined
        }));

      setWordCloudData(getWordCloudItems(wordCloudItems, 100, mp.party));
    } catch (error) {
      console.error("Error generating word cloud:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImage = async () => {
    if (wordCloudRef.current) {
      await wordCloudRef.current.saveImage();
    }
  };

  const handleShareToTwitter = async () => {
    if (wordCloudRef.current) {
      try {
        const imageBlob = await wordCloudRef.current.getImageBlob();
        if (!imageBlob) return;

        // Create tweet text
        const tweetText = selectedMP 
          ? `Check out ${selectedMP.twitter_handle ? `@${selectedMP.twitter_handle}` : selectedMP.name}'s most frequently used words in Parliament! #KanishkaKloud`
          : "Check out this MP's word cloud from Parliament! #KanishkaKloud";

        try {
          // Convert blob to ClipboardItem
          const clipboardItem = new ClipboardItem({
            'image/png': imageBlob
          });
          
          // Copy image to clipboard
          await navigator.clipboard.write([clipboardItem]);
          
          // Show success message
          alert('Image copied to clipboard! You can now paste it into your tweet.');
          
          // Open Twitter's web intent URL with the tweet text
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
          window.open(twitterUrl, '_blank', 'width=550,height=420');
        } catch (clipboardError) {
          console.error('Error copying to clipboard:', clipboardError);
          // Fallback: just open Twitter with text if clipboard fails
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
          window.open(twitterUrl, '_blank', 'width=550,height=420');
        }
      } catch (error) {
        console.error('Error sharing to Twitter:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-4 md:py-8">
      {!selectedMP && (
        <>
          <div 
            className={`fixed inset-0 flex flex-col items-center justify-center max-md:landscape:justify-start max-md:landscape:pt-4 z-10 transition-all duration-500 ${
              scrollPosition >= SCROLL_THRESHOLD ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="w-full max-w-2xl mx-auto px-4 mt-44 md:mt-0">
              <div className="mb-8 text-center">
                <h1 className="font-['PPTelegraf'] text-3xl font-bold text-[#DB2650] mb-4">Kanishka Kloud</h1>
                <p className="text-lg text-gray-700 mb-4">
                  Kanishka Kloud was built by Kanishka and his team to show his constituents what fighting for the Vale of Glamorgan looks like in Parliament. It maps the most-used words in his speeches since election day. He later scaled it to cover all MPs to highlight the role tech can play in boosting transparency in democracy.
                </p>
                <a
                  href="https://x.com/KanishkaNarayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-[#DB2650] text-white rounded-full hover:bg-[#DB2650]/90 transition-colors mb-4"
                >
                  See how it was built here
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex justify-center animate-bounce">
                  <ChevronDown className="w-8 h-8 text-[#DB2650]" />
                </div>
                <p className="text-sm text-gray-500">Scroll to use the tool</p>
              </div>
            </div>
          </div>

          <div 
            className={`fixed inset-0 flex items-center justify-center transition-all duration-500 ${
              scrollPosition >= SCROLL_THRESHOLD ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="w-full max-w-2xl mx-auto px-4">
              <div className="mb-8 text-center">
                <h1 className="font-['PPTelegraf'] text-3xl font-bold text-[#DB2650]">Kanishka Kloud</h1>
              </div>
              <SearchBox onSelectMP={handleSelectMP} isLoading={loading} isCollapsed={false} />
            </div>
          </div>
        </>
      )}

      {selectedMP && (
        <>
          <div className="w-full max-w-2xl mx-auto px-4 mb-2 md:mb-4 mt-44 md:mt-24">
            <div className="animate-slide-up">
              <SearchBox onSelectMP={handleSelectMP} isLoading={loading} isCollapsed={true} />
            </div>
          </div>

          <div className="w-full animate-fade-in">
            <div className="px-4 -mb-1 md:-mb-2">
              <MPProfile mp={selectedMP} />
            </div>
            
            {noSpeechesMessage ? (
              <div className="word-cloud-container glass flex items-center justify-center">
                <p className="text-muted-foreground text-lg text-center p-8">
                  {noSpeechesMessage}
                </p>
              </div>
            ) : (
              <WordCloud ref={wordCloudRef} words={wordCloudData} loading={loading} />
            )}
          </div>
        </>
      )}

      <Link
        to="/about-kloud"
        className="fixed left-4 bottom-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-30"
        aria-label="About this site"
      >
        <Info className="w-5 h-5 text-gray-600" />
      </Link>

      {wordCloudData.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex gap-2">
          <button
            onClick={handleShareToTwitter}
            className="p-2.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-300"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button
            onClick={handleSaveImage}
            className="p-2.5 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-all duration-300"
            aria-label="Download word cloud"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;