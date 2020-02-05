import React, { Component } from 'react';

import Tool from 'Classes/Tool';

import Data from 'Data/data.json';

import './JokeTicket.scss';
import 'Components/Tickets/Ticket.scss';

class JokeTicket extends Component {

  constructor(){

    super();

    this.state = {
      selectedJoke: Data.jokes[Tool.randomIntBetween(0, Data.jokes.length)]
    }

  }

  componentDidMount(){

    this.props.onLoaded();

  }

  render(){

    return(

      <div className="ticket joke-ticket">

        <span className="the-joke">{this.state.selectedJoke}</span>

      </div>

    );

  }  

}

export default JokeTicket;