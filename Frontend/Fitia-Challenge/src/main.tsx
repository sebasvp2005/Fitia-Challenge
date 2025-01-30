import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/components/AppRouter'

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </PrimeReactProvider>
)