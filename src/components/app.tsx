import * as React from 'react';
import { Routes } from './routes';

interface AppInterface {
  name: string;
}

export class App extends React.Component<AppInterface, {}> {

  constructor(props: AppInterface) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}> {this.props.name} </h1>
        <Routes />
      </div>
    );
  }
}
