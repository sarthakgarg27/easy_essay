const rp = require('request-promise');
const cheerio = require('cheerio');
const request = require('request');
const pdfMakePrinter = require('pdfmake/src/printer');
const express=require('express');
var app=express();
const base_url="https://en.wikipedia.org/wiki/"

app.get('/:topic',function(req,res){
  var url=base_url+req.params.topic;
request(url,function(error, response ,html){
  //console.log("Here");
  if(!error)
  {//console.log(html);
    var $=cheerio.load(html);
    //console.log($.text());
    var info="";
    $("p").each(function(index,element){
      //console.log("Text is :"+$(this).text());
      info=info+"\n"+$(this).text();
    })
  res.send(info);
  /*  var docDefinition = {
      content: info
      };
      try
    {
      const fontDescriptors = {
                Roboto: { normal: "font/Roboto-Black.ttf",
                          bold: "font/Roboto-Black.ttf",
                          italics: "font/Roboto-Black.ttf",
                          bolditalics: "font/Roboto-Black.ttf" }};
    const printer = new pdfMakePrinter(fontDescriptors);
    const doc = printer.createPdfKitDocument(docDefinition);
    let chunks = [];

    doc.on('data', (chunk) => {
    chunks.push(chunk);
    });

    doc.on('end', () => {
    response(Buffer.concat(chunks));
    });
    doc.end();
  }
    catch(err) {
   throw(err);
 }
*/
  }
  else {
    console.log("error is :"+error);
  }

});
});
app.listen(process.env.PORT || 3000);
