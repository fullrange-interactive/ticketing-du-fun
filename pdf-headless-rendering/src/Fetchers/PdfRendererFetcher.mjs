import Puppeteer from 'puppeteer';

import ErrorWrapper from '../Classes/ErrorWrapper';
import Config from '../Config';

class PdfRendererFetcher{

  constructor(){

    this.browser = null;
    this.page = null;    

  }

  async init(){

    this.browser = await Puppeteer.launch({ headless: true, args: [
      '--no-sandbox'
    ]});
    this.page = await this.browser.newPage();

  }

  renderWebpage(url){

    return new Promise(async (resolve, reject) => {

      await this.page.goto(url, {waitUntil: 'networkidle0'});
      await this.page.waitFor('.load-end');
      const pdf = await this.page.pdf({
        preferCSSPageSize: true,
        printBackground: true,
      });

      resolve(pdf);

    });    

  }

}

export default PdfRendererFetcher;