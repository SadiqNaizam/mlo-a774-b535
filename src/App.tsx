import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import BookDetailsPage from "./pages/BookDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import Homepage from "./pages/Homepage";
import MyLibraryPage from "./pages/MyLibraryPage";
import ReaderView from "./pages/ReaderView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/book-details" element={<BookDetailsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/my-library" element={<MyLibraryPage />} />
          <Route path="/reader" element={<ReaderView />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
