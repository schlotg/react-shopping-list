import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ShoppingList } from './shopping-list';
import { ShoppingListAdd } from './shopping-list-add';

export const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={ShoppingList}/>
      <Route exact path="/add" component={ShoppingListAdd}/>
      <Route exact path="/edit/:id" component={ShoppingListAdd}/>
    </Switch>
  </div>
);