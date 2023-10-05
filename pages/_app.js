import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from '../src/Context/UserContext'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfirmProvider } from 'material-ui-confirm';

function MyApp({ Component, pageProps }) {
  return (
      <UserContextProvider>
        <ConfirmProvider >
          <Component {...pageProps} />
          <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ConfirmProvider>
      </UserContextProvider>
  )

  
}

export default MyApp
