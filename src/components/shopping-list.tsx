import * as React from 'react';
import { Route } from 'react-router-dom';
import { ShoppingListService, Item } from '../services/shopping-list-service';
import { ShoppingListElement } from './shopping-list-element';

interface ShoppingListState {
  items: Item[];
}

export class ShoppingList extends React.Component<{}, ShoppingListState> {

  constructor(props: any) {
    super(props);
    let items: Item[] = [];
    ShoppingListService.forEach((item) => {
      items.push(item);
    });
    this.state = { items };
  }

   render() {
    return (
        <Route render={( rparams: any) => (
          <div>
            <button style={{color: '#00c700'}} onClick={() => this.add(rparams)}>Add</button>
            <button style={{color: '#ff6e6e', marginLeft: '5px'}} onClick={() => this.clear()}>Clear</button>
            <div style={{marginTop: '20px', width:'630px', padding:'5px', backgroundColor: '#eeeeee'}}>
              { this.renderItems() }
            </div>
          </div>
        )} />
    );
  }

  renderItems() {
    return this.state.items.map((item: Item) => {
      return (
        <ShoppingListElement
          key={item._id}
          id={item._id}
          name={item.name}
          quantity={item.quantity}
          purchased={item.purchased}
          description={item.description}
          delete={(id: string) => this.delete(id)}
          />
      );
    });
  }

  add(rparams: any) {
    rparams.history.push('/add');
  }

  clear() {
    ShoppingListService.clear();
    this.setState({items:[]});
  }

  delete(id: string) {
    let items: Item[] = [];
    ShoppingListService.removeItem(id);
    ShoppingListService.forEach(item => items.push(item));
    this.setState({ items });
  }
}