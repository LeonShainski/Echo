import feedparser
import json
import boto3
from botocore.exceptions import NoCredentialsError
ACCESS_KEY = ''
SECRET_KEY = ''



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


def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        s3.upload_file(local_file, bucket, s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

""" for i in data:
    feed = feedparser.parse(i["url"])
    for j in feed['entries']:
      
      output+=j["link"]+"," """
output = getFeeds()
f = open("output.txt", "w")
f.write(output)
f.close()

#Uploading to S3
print('Uploading...')
uploaded = upload_to_aws('output.txt', 'echo-storage-leon', 'testingName.txt')
print('Uploaded!')
  