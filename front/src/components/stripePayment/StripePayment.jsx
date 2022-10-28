import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import SetupForm from "./SetupForm";
import axios from "axios";
import { base_url, stripe_publishable_key } from "../../api";
import { Button } from "antd";

function StripePayment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    setStripePromise(loadStripe(stripe_publishable_key, {
      stripeAccount: 'acct_1BLjfKBC4BDRWjqb'
    }));
  }, []);

  const setSecret = () => {
    axios.get(base_url + "/users/" + props.user_id + '/payment-intent').then((res) => {
      console.log(res.data);
      var { client_secret } = res.data;
      setClientSecret(client_secret);
    }).catch((err) => console.log(err))
  }

  console.log(clientSecret, stripePromise);
  return (
    <>
      <h1>React Stripe and the StripePayment Element</h1>
      {!clientSecret && <Button onClick={setSecret}>Pay</Button>}
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{clientSecret}}>
          <SetupForm />
        </Elements>
      )}
    </>
  );
};
export default StripePayment;