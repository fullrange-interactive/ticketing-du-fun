import React, { Component } from 'react';

import Tool from 'Classes/Tool';

import JokeTicket from 'Components/Tickets/JokeTicket/JokeTicket';
import QOfferTicket from 'Components/Tickets/QOfferTicket/QOfferTicket';

import './TicketContainer.scss';

const tickets = [
  {
    content: (onError, onLoaded) => <QOfferTicket onError={onError} onLoaded={onLoaded}/>
  },
  {
    content: (onError, onLoaded) => <JokeTicket onError={onError} onLoaded={onLoaded}/>
  }  
]

class TicketContainer extends Component {

  constructor(){

    super();

    this.state = {

      loading: true,
      selectedTicket: tickets[Tool.randomIntBetween(0, tickets.length)]

    }

  }

  onLoaded(){

    this.setState({
      loading: false
    })

  }

  onError(e){

    console.error(e);

  }

  render(){

    return(

      <div>

        {/* PdfRendererFetcher wait until load-end is in the DOM.*/}
        {!this.state.loading && <span className="load-end"></span>}

        {this.state.selectedTicket.content(this.onError.bind(this), this.onLoaded.bind(this))}

      </div>

    );

  }

}

export default TicketContainer;
