import * as React from 'react';
import { Route } from 'react-router-dom';
import { ShoppingListService, Item } from '../services/shopping-list-service';

interface ShoppingListAddInterface {
  id?: string;
  match?: any;
};

export class ShoppingListAdd extends React.Component<ShoppingListAddInterface, Item> {

  constructor(props: ShoppingListAddInterface) {
    super(props);
    const params: any = props.match && props.match.params || {};
    const id = params.id;
    this.state = { _id: '', name: '', description: '', quantity: 0, purchased: false};
    if (id) {
        this.state = ShoppingListService.getItem(id);
    }
  }

  stateChanged(event: any) {
    const target = event.target;
    const name = target.name as string;
    const value = (name === 'quantity') ? parseInt(target.value) : target.value;
    const data: any  = {};
    data[name] = value;
    this.setState(data);
  }

  render() {
    return (
      <div>
        <h3>{this.props.id ? 'Edit' : 'Add Item'}</h3>
        <table><tbody>
          <tr>
            <th>Quantity</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
          <tr>
            <td><input type="number" style={{width: '60px'}}
              name="quantity"
              onChange={(e) => this.stateChanged(e)}
              value={this.state.quantity}/>
            </td>
            <td><input type="text" style={{width: '100px'}}
              name="name"
              onChange={(e) => this.stateChanged(e)}
              value={this.state.name}/>
            </td>
            <td><input type="text" style={{width: '300px'}}
              name="description"
              onChange={(e) => this.stateChanged(e)}
              value={this.state.description}/>
            </td>
          </tr>
        </tbody></table>
        <Route render={( rparams: any) => (
          <div>
            <button onClick={ () => this.save(rparams)}>Save</button>
            <button style={{marginLeft: '5px'}}
              onClick={ () => rparams.history.goBack()}>Back
            </button>
        </div>) } />
      </div>
    );
  }

  save (rparams: any) {
    ShoppingListService.addItem(this.state);
    rparams.history.goBack();
  }
}