import React from 'react';
import { useLocation } from 'react-router-dom';
import Counter from './Counter';

export const CounterWrapper = (props) => {
  
  const location = useLocation();
  return (
    <Counter location={location} {...props}/>   
  )
}


export default CounterWrapper;
