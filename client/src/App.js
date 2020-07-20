import React, { useEffect, lazy, Suspense, useState, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';

import { GlobalStyle } from './global.styles';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './context/current-user/current-user.context';
import { CartContext } from './providers/cart/cart.provider';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SigninPage = lazy(() =>
  import('./pages/signinpage/signinpage.component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { restoreCartFromLoggedInUser } = useContext(CartContext);
  let unsubscribeFromAuth = null;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        const userObject = await userRef.get();
        const cart = userObject.data().cartItems;
        console.log(cart);
        restoreCartFromLoggedInUser(cart);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div>
      <GlobalStyle />
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Switch>
          <Suspense fallback={<div>...Loading</div>}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                currentUser ? <Redirect to='/' /> : <SigninPage />
              }
            />
          </Suspense>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
