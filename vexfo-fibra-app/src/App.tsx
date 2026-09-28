import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastProvider } from "@/components/vexfo/Toast";
import { SessionProvider } from "@/context/session";
import { routers } from "./router";

const queryClient = new QueryClient();

const router = createBrowserRouter(routers);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SessionProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </SessionProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
