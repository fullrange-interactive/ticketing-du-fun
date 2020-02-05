class ErrorWrapper{

  constructor(errorType, message = '', innerException = null, user = null, ...value){

    this.errorType = errorType;
    this.innerException = innerException;
    this.caller = this.constructor.name;
    this.message = message;
    this.user = user;
    this.value = value;

    this.date = Date.now();

  }

  //Promise will always be resolved
  static handleError(error){

    return new Promise((resolve, reject) => {

      try{

        let toDealWith = ErrorWrapper.dealError(error);

        console.error(toDealWith);

        resolve(toDealWith);


      }catch (e){

        let err = ErrorWrapper.dealError(e);

        console.error(err);
        resolve(err);

      }


    });

  }

  static dealError(error){

    let toReturn = error;

    console.error(error);

    if(! (toReturn instanceof ErrorWrapper))
      toReturn = new ErrorWrapper(ErrorWrapper.unknown, 'Catched unwrapped error.', error);      

    return toReturn; 

  }

  toString(){

    var toReturn = '';

    toReturn = "[" + new Date(this.date).toISOString() + "] An error of type " + this.errorType + " has been thrown.\n\n"
    toReturn += this.message + "\n\n";
    toReturn += "User:" + (this.user === null ? 'no user' : this.user.name) + "\n\n";

    if(this.innerException !== null){

      toReturn += "InnerException (JSON):\n";
      toReturn += JSON.stringify(this.innerException) + "\n\n";
      toReturn += "InnerException (Text):\n";
      toReturn += typeof(this.innerException.stack) !== 'undefined' ? this.innerException.stack + "\n\n" : '';

    }

    return toReturn;

  }

  toJson(){

    try{

      if(JSON.stringify(this.innerException) === "{}")
        this.innerException = this.innerException.stack;

      return JSON.stringify(this);

    }
    catch(error){

      this.innerException = null;
      return JSON.stringify(this);

    }



  }

  getHttpStatusCode(){

    switch(this.type){

      case ErrorWrapper.notConnected:
        return 401;

      case ErrorWrapper.noAccess:
        return 403;

      case ErrorWrapper.notFound:
        return 404;

      case ErrorWrapper.cheatProtection:
        return 202;
        
      default:
        return 500;

    }

  }

  /* Error type ------------------------------------------------*/

  static get unknown(){

    return 'Unknown';

  }

  static get network(){

    return 'network';

  }

  static get notActive(){

    return 'notActive';

  }

  static get dbError(){

    return 'DbError'

  }

  static get notFound(){

    return 'NotFound';

  }

  static get loginError(){

    return "LoginError";

  }

  static get noTokenProvided(){

    return 'NoTokenProvided'

  }

  static get notConnected(){

    return 'NotConnected';

  }

  static get noAccess(){

    return 'NoAccess';

  }

  static get cheatProtection(){

    return 'CheatProtection';

  }

  static get notImplementedYet(){

    return 'notImplementedYet';

  }

}

export default ErrorWrapper;