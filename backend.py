import feedparser
import json


with open('./input.json', 'r') as f:
  data = json.load(f)
  
output = ""

def getFeeds():
  out = ""
  feedURLs = getUrls(data)
  print("got feeds")
  deduplicated = deduplicate(feedURLs)
  print("deduplicated")
  out = ",".join(deduplicated)
  print('writing')
  return out
  
  

def getUrls(data):
  urls = []
  for i in data:
      feed = feedparser.parse(i["url"])
      for j in feed['entries']:
        
        urls.append(j["link"])
  return urls

def deduplicate(urls):
  return list(dict.fromkeys(urls))






""" for i in data:
    feed = feedparser.parse(i["url"])
    for j in feed['entries']:
      
      output+=j["link"]+"," """
output = getFeeds()
f = open("output.txt", "w")
f.write(output)
f.close()
  