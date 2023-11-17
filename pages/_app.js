import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import '../pages/themes/classic/classic.css'
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
// import Layout from '../components/Layout'
import Router from "next/router";

// redux libraries
import { wrapper } from '../components/redux/store'; //actually store
import { PersistGate } from 'redux-persist/integration/react';
import { useStore } from 'react-redux';



Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {

  const store = useStore();

  return (
    <>
      <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
        <Component {...pageProps} />
      </PersistGate>

    </>
  )
}
export { reportWebVitals } from 'next-axiom';
// export default MyApp
export default wrapper.withRedux(MyApp);
