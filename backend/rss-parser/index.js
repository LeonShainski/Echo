let Parser = require('rss-parser');
const fs = require('fs');



async function readRss(inFile) {
    return new Promise(async (resolve, reject) => {
        const parser = new Parser();
        var data = fs.readFileSync(inFile);
        var feedlist = JSON.parse(data);
        feedUrls = [];
        for (entry of feedlist) {
            url = entry.url;
            console.log(url);
            var feed = await parser.parseURL(url);
            //console.log(feed.title);
            feed.items.forEach(async item => {
            
                feedUrls.push(item.link.trim());
            });
        } resolve(feedUrls);
    })
}


module.exports = {readRss}








 