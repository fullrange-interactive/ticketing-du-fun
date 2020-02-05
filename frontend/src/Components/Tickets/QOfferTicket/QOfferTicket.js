import React, { Component } from 'react';

import Tool from 'Classes/Tool';
import OfferProxy from 'Classes/Proxies/OfferProxy';

import './QOfferTicket.scss';
import 'Components/Tickets/Ticket.scss';

class QOfferTicket extends Component {

  constructor(){

    super();

    this.state = {
      loading: true,
      selectedOffer: null
    }

  }

  componentDidMount(){

    OfferProxy.list()
      .then((offers) => {

        console.log(offers);

        this.setState({
          selectedOffer: offers.data[Tool.randomIntBetween(0, offers.data.length)],
          loading: false
        }, this.props.onLoaded);

      })
      .catch(this.props.onError.bind(this));

  }

  getShopName(website){

    console.log(website);

    switch(website){

      case "qidsqoqach":
        return "Qids";

      case "qwineqoqach":
        return "Qwine";

      case "wwwqoqach":
        return "QoQa";

      case "qsportqoqach":
        return "Qsport";

      case "qbeerqoqach":
        return "Qbeer";

      case "qookingqoqach":
        return "Qooking";
    }

  }

  render(){

    if(this.state.loading)
      return(<div className="ticket joke-ticket"></div>);

    console.log(this.state.selectedOffer);

    return(

      <div className="ticket qoffer-ticket">

        <h2 className="title">Offre sur {this.getShopName(this.state.selectedOffer.attributes.website_identifier)}</h2>
        <p className="catchline">{this.state.selectedOffer.attributes.catchline}</p>        

        <img className="offerImage" src={this.state.selectedOffer.attributes.mobile_mosaic_url} />

        <p className="stockPercent">Etat du stock: <b>{this.state.selectedOffer.attributes.remaining_stock_percent}%</b></p>


      </div>

    );

  }  

}

export default QOfferTicket;