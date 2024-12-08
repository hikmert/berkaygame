import { ThemeProvider } from "./context/ThemeContext";
import { AppRouter } from "./Router";

function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
