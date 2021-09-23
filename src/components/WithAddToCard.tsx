

import React from 'react';
import { useDispatchState } from './AppState';
import { PizzaIF } from '../models/pizza.model'
import { AddToCartProps } from './AddToCart'


const WithAddToCart: React.FC<{ children: (props: AddToCartProps) => JSX.Element }> = ({ children }) => {

  const dispatch = useDispatchState()
  const addToCart = (payload: PizzaIF) => {
    dispatch({ type: 'ADD_TO_CARD', payload })
  }

  return children({ addToCart })
}

export default WithAddToCart

export const useAddToCard = () => {
  const dispatch = useDispatchState()
  return (payload: PizzaIF) => {
    dispatch({ type: 'ADD_TO_CARD', payload })
  }
}
