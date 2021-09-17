import React, { createContext, useState, useEffect } from 'react';

import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
  getCartTotal,
  setLocalStorage,
  getLocalStorage,
} from './cart.utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

const CartProvider = ({ children }) => {
  // we useState to set default value which is the same as in cart context (true)
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState(() =>
    getLocalStorage('cartItems', []),
  );
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const toggleHidden = () => setHidden(!hidden);
  const clearItemFromCart = (item) =>
    setCartItems(filterItemFromCart(cartItems, item));

  const clearCart = () => {
    setCartItems([]);
  };

  const restoreCartFromLoggedInUser = (cart) => {
    setCartItems(cart);
  };

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setCartTotal(getCartTotal(cartItems));
    setLocalStorage('cartItems', cartItems);
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        cartItemsCount,
        removeItem,
        clearItemFromCart,
        cartTotal,
        clearCart,
        restoreCartFromLoggedInUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
