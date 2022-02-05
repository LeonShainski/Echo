let Parser = require('rss-parser');
const fs = require('fs');
let parser = new Parser();

outFile = "./output.json";
inFile = "./input.json";

(async () => {

    var data = fs.readFileSync(inFile);
    var feedlist = JSON.parse(data);
    var feedString = [];
    //console.log(feedlist);
    for (entry of feedlist){
        url = entry.url;
        console.log(url);
  let feed = await parser.parseURL(url);
  console.log(feed.title);
  

  feed.items.forEach(item => {
      feedString.push(item);
   
  });
}
 fs.writeFileSync(outFile, JSON.stringify(feedString) );
})();