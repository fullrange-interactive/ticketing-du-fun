class FetcherHelper{

  static getHeaders() {

    let headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    return {
      headers: headers
    };

  }

}

export default FetcherHelper;