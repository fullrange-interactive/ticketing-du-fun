import ErrorWrapper from '../Classes/ErrorWrapper';
import RequestHandler from '../Classes/RequestHandler';

import PdfRendererFetcher from '../Fetchers/PdfRendererFetcher';

import Config from '../Config';

class PdfRendererController{

  constructor(){

    this.pdfRendererFetcher = new PdfRendererFetcher();

  }  

  async init(expressApp){

    expressApp.get(
      Config.apiBaseUrl + '/render/random',
      RequestHandler.handle.bind(this, this.randomRender.bind(this))
    );

    await this.pdfRendererFetcher.init();

  }  

  randomRender(req, res){

    return new Promise((resolve, reject) => {

      this.pdfRendererFetcher.renderWebpage("http://localhost:3000")
        .then((pdf) => {

          res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdf.length
          });
          res.send(pdf);
          resolve();

        })
        .catch(reject);

    })

  } 

}

export default PdfRendererController;