import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import OurTeam from "./pages/OurTeam";
import ValeAccelerator from "./pages/ValeAccelerator";
import Podcast from "./pages/Podcast";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white text-black flex flex-col">
          <Navbar />
          <main className="pt-24 flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about-kloud" element={<About />} />
              <Route path="/our-team" element={<OurTeam />} />
              <Route path="/vale-accelerator" element={<ValeAccelerator />} />
              <Route path="/podcast" element={<Podcast />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold text-[#DB2650] mb-2">All Hands On Tech</h2>
                  <a 
                    href="mailto:allhandsontech@kanishkanarayan.com"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    allhandsontech@kanishkanarayan.com
                  </a>
                </div>
                <div className="flex space-x-6">
                  <a
                    href="https://www.facebook.com/valewithkanishka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Facebook size={24} />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/valekanishka/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Instagram size={24} />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://x.com/KanishkaNarayan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-6 w-6 fill-current"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="sr-only">X (Twitter)</span>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
