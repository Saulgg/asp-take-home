import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Topics from "./Topics";
import Search from "./Search";

const queryClient = new QueryClient();

export default function App() {
  const [searchTerm, setSearchTerm] = useState("react");
  return (
    <div className="App" data-testid="App">
      <h1>GitHub Topic Explorer</h1>
      <QueryClientProvider client={queryClient}>
        <Search setSearchTerm={setSearchTerm} placeholder="Topic" />
        <Topics searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </QueryClientProvider>
    </div>
  );
}
