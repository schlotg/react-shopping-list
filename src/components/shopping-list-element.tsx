import * as React from 'react';
import { Route } from 'react-router-dom';
import { ShoppingListService, Item } from '../services/shopping-list-service';

interface ShoppingListElementInterface {
  id: string;
  purchased: boolean;
  quantity: number;
  name: string;
  description: string;
  delete: {(id: string): void};
};

export class ShoppingListElement extends React.Component<ShoppingListElementInterface, Item> {

  constructor(props: ShoppingListElementInterface) {
    super(props);
    this.state = { _id: props.id, purchased: props.purchased, quantity: props.quantity,
      name: props.name, description: props.description };
  }

  render() {
    const item = this.state;
    return (
      <div style={{width: '100%', marginTop: '5px', marginBottom: '5px'}}>
        <input type="checkbox" checked={item.purchased} onChange={e => this.onCheckedChange(e)} />
        <span style={{width: '30px', display: 'inline-block'}}>{item.quantity}</span>
        <span style={{width: '100px', display: 'inline-block'}}>{item.name}</span>
        <span style={{width: '300px', display: 'inline-block'}}>{item.description}</span>
        <Route render={( rparams: any) => (
          <div style={{display: 'inline-block'}}>
            <button style={{padding: '1px'}} onClick={ () => this.delete(this.state._id)}>Delete</button>
            <button style={{padding: '1px', marginLeft: '5px'}}
              onClick={ () => this.edit(rparams)}>
              Edit
            </button>
          </div> )} />
      </div>
    );
  }

  delete (id: string) {
    this.props.delete(id);
  }

  edit (rparams: any) {
    rparams.history.push(`/edit/${this.props.id}`);
  }

  onCheckedChange(e: any) {
    const purchased = e.target.checked;
    this.setState({ purchased });
    setTimeout(() => ShoppingListService.update(this.state), 500);
  }
}