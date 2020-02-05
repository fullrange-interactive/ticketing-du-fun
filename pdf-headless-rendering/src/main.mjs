import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';
import fs from 'fs';
import Cors from 'cors';

import PdfRendererController from './Controllers/PdfRendererController';

import Config from './Config';
import ErrorWrapper from './Classes/ErrorWrapper';


/* HTTP Client -------------------------------------------------------------------- */

// Config part -----------------------------------------------------------------------

var app = Express();

app.use(Cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: true
}));


// Routes ----------------------------------------------------------------------------


var pdfRendererController = new PdfRendererController();
pdfRendererController.init(app);

// Bootstrap -------------------------------------------------------------------------


let server = app.listen({
  port: Config.srvPort
}, () => {

  console.log("HTTP Server listening on port " + Config.srvPort);

});
