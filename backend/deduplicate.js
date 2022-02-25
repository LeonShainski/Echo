async function deduplicate(feedString) {
    return new Promise(async (resolve, reject) => {
        var uniqueFeeds = feedString.filter(async (elem, pos) => {
            return feedString.indexOf(elem) == pos;
        })
        resolve(uniqueFeeds);

    })

}

module.exports = {deduplicate};
