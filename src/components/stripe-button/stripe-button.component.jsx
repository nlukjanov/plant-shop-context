import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableStripeKey =
    'pk_test_51GwquRKIfF8I2iweRTePPmfzqSVH4JgkBhZMtEhmostDNje03nIgkB2lmN9GY8mxd9lNpdiu2vu5crmWgQhuFzLR00klTXMTmn';

  const onToken = (token) => {
    console.log(token);
    alert('Payment Successful');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableStripeKey}
    />
  );
};

export default StripeCheckoutButton;
