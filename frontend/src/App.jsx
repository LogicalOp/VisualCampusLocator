import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './RoutesComponent';
import { ThemeProvider } from "@/components/themes/theme-provider"

function App() {

  return (
    <>
      <Router>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RoutesComponent />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
