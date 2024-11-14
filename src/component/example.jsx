import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exampleSlice } from '../App';

export const Example = () => {
  const [input, setInput] = useState('');
  const [amount, setAmount] = useState('');
  const [isIncome, setIsIncome] = useState(false);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.  example.examplelist);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleIncomeChange = () => {
    setIsIncome(true);
  };

  const handleOutChange = () => {
    setIsIncome(false);
  };

  const handleAdd = () => {
    if (amount.trim() !== '') {
      const amountValue = parseFloat(amount);
      if (!isNaN(amountValue)) {
        dispatch(exampleSlice.actions.ADD({ text: isIncome ? '(수입)' : '(지출)', 
          amount: isIncome ? amountValue : -amountValue
        }));
        setInput('');
        setAmount('');
        setIsIncome(false);
      } 
    }
  };

  const totalAmount = list.reduce((total, item) => total + item.amount, 0)
  
  const handleDelete = (id) => {
    dispatch(exampleSlice.actions.DELETE(id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>가계부</h1>
        <label>
          수입
          <input type="radio" checked={isIncome} onChange={handleIncomeChange} />
        </label>
        <label>
          지출
          <input type="radio" checked={!isIncome} onChange={handleOutChange} />
        </label>
        <br />
        금액
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="금액을 입력하세요"
        />
        <button onClick={handleAdd}>등록</button>
        <br />
        <h5>총금액: {totalAmount} 원</h5>
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              {item.text} {item.amount} 원
              <button onClick={() => handleDelete(item.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
};