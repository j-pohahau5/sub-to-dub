import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PAYMENT } from '../../utils/mutations';

const PaymentForm = ({ userId }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [addPayment] = useMutation(ADD_PAYMENT);

  const handleSubmit = (event) => {
    event.preventDefault();
    addPayment({
      variables: { amount: parseFloat(amount), date, userId },
    }).then(() => {
      setAmount('');
      setDate('');
      alert('Payment created successfully');
    }).catch((error) => {
      alert(`Error creating payment: ${error.message}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Payment</h2>
      <label>
        Amount:
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </label>
      <button type="submit">Create Payment</button>
    </form>
  );
};

export default PaymentForm;
