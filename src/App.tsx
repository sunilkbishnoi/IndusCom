
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MarketPage from "./pages/MarketPage";
import SearchPage from "./pages/SearchPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import WatchlistPage from "./pages/WatchlistPage";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./hooks/useCart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
