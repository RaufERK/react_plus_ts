import React, { useState } from 'react'
import pizzasArr from '../data/pizzas.json'
import { PizzaIF } from '../models/pizza.model'
import Pizza from './Pizza'
import AppCSS from './App.module.css'
import PizzaSVG from '../svg/pizza.svg'
import Cart from './Cart'
import { AppStateProvider } from './AppState'


const App = () => {
  const [pizzas, setPizzas] = useState<PizzaIF[]>(pizzasArr);
  return <AppStateProvider>
    <div className={AppCSS.container}>
      <div className={AppCSS.header}>
        <PizzaSVG width={120} height={120} />
        <div className={AppCSS.siteTitle}>Delecios Pizza</div>
        <Cart />
      </div>
      <ul>{pizzas.map((pizza) => <Pizza pizza={pizza} key={pizza.id} />)
      }
      </ul>
    </div>
  </AppStateProvider>
};

export default App;
