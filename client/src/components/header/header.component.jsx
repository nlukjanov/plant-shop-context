import React, { useContext } from 'react';
import { auth } from '../../firebase/firebase.utils';
import { useHistory, withRouter } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/plant.svg';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import CurrentUserContext from '../../context/current-user/current-user.context';
import { CartContext } from '../../providers/cart/cart.provider';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './header.styles';

const Header = () => {
  const currentUser = useContext(CurrentUserContext);
  const { hidden, cartItems, clearCart } = useContext(CartContext);
  const history = useHistory();

  const signOut = () => {
    auth.signOut();
    clearCart(cartItems);
    localStorage.removeItem('cartItems');
    history.push('/');
  };
  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        <OptionLink to='/contact'>CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as='div' onClick={() => signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

export default withRouter(Header);
