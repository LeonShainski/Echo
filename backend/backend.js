const fs = require('fs');
const rss = require('./rss-parser/index');
const deduplicate = require('./deduplicate');


var outFile = "./output.txt";
var inFile = "./input.json";


async function getFeeds (){
    var feedUrls = await rss.readRss(inFile);
     var feedArr = await deduplicate.deduplicate(feedUrls);
     var outString = '"' + feedArr.join(",") + '"';  
     fs.writeFileSync(outFile, outString);
 }

 getFeeds();


