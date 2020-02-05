import Axios from 'axios';

import Config from 'Config';
import FetcherHelper from 'Classes/Helpers/FetcherHelper';

class OfferProxy{

  static list(){

    return new Promise((resolve, reject) => {

      Axios.get(`${Config.qoqaApiEndpointUrl}/offers`, FetcherHelper.getHeaders())
        .then((response) => {

          resolve(response.data);

        })
        .catch((error) => {

          reject(error.response);

        })

    })  

  }


}

export default OfferProxy;