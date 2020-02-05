import React, { Component, Suspense } from 'react';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import TicketContainer from 'Containers/TicketContainer/TicketContainer';

import Config from 'Config';

import './App.scss';

const routes = [
  { path: '/',
    exact: true,
    content: (onError, {match, history}) => <TicketContainer onError={onError}></TicketContainer>
  }
]

const Loader = () => <div>loading...</div>;

class App extends Component {

  onError(e){

    console.error(e);

  }

  render(){

    return(

      <Router basename={Config.baseUrl}>

        <Suspense fallback={<Loader />}>

            <div className="app">

                <div className="content">

                  {routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.content.bind(this, this.onError.bind(this))}
                    />
                  ))}

                </div>

            </div>

        </Suspense>

      </Router>

    );

  }

}

export default App;
