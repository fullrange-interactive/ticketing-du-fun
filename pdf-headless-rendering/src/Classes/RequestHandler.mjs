import ErrorWrapper from './ErrorWrapper';

import Config from '../Config';

class RequestHandler{

  static handle(callback, req, res){

      callback(req, res)
        .catch(RequestHandler.handleError.bind(this, res))

  }

  static handleError(res, e){

    ErrorWrapper.handleError(e)
      .then((error) => {

        res.setHeader('Content-Type', 'application/json');
        res.status(error.getHttpStatusCode()).send(error.toJson());

      })

  }

}

export default RequestHandler;