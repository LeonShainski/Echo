from fileinput import filename
import requests
import json
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from firebase_admin import db
import feedparser
import json
import boto3
from botocore.exceptions import NoCredentialsError


def summarize():
    my_headers = {'Authorization' : 'Bearer {access_token}'}
    keyFile = open("key.txt", "r")
    key=keyFile.read()


    #Looping through each URL

    for i in range (0,len(arr)):
        currentURL=urlArr[i]
        #Resetting the parameters each loop to reflect the current URL
        params={
            "SM_API_KEY":key, 
            "SM_URL": currentURL
        }
        try:
            #Printing the URL and its type to make sure the program is running OK
            #print(currentURL, type(currentURL))

            # Code here will only run if the request is successful
            response = requests.get("https://api.smmry.com", params=params)
            #jsonResponse=response.json()
            #print (response.json())

            #Taking the actual article from the JSON response
            try:
                jsonResponse=response.json()
            except:
                print("Exception occured on line 43")
                #f = open("finalOutputIncomplete.txt", "w")
                #for line in arr:
                #    f.write(" ".join(line) + "\n") # works with any number of elements in a line

            #Making sure the script doesn't stop when the API encounters a website that it doesn't like
            try:
                summarizedText=jsonResponse["sm_api_content"]
            except:
                summarizedText="An Error occured"

            if (summarizedText != "An Error occured"):
                #Saving the summarized article to file
                # endFile = open("demoTesting15.txt", "a", encoding="utf-8")
                # endFile.write(summarizedText)
                # endFile.write("\n")
                # endFile.close()

                #Saving URL an subsequent summarized text to a 2D array
                arr[i][0]=currentURL
                arr[i][1]=summarizedText
                try:
                    f = open("finalOutputDuringExecution7.txt", "a",encoding='utf-8')
                    f.write(arr[i][0]) # works with any number of elements in a line
                    f.write((arr[i][1])) 
                    f.write((arr[i][2]) + "\n") 
                except: 
                    print("Error in writing to file during execution")

                print(summarizedText)
            
            print(i, '/',len)

            
            
        except requests.ConnectionError as error:
            print(error)
            pass

def factCheck():
    my_headers = {'Authorization' : 'Bearer {access_token}'}
    keyFile = open("keyFactCheck.txt", "r",encoding='utf-8')
    api_key=keyFile.read()

    #f = open("demoTesting15.txt", "r")
   # claims=f.read().split('\n')
    claims=[]
    for i in range (len(urlArr)):
        claims.append(arr[i][0])

    #Looping through each URL

    factCheckRatingsArr=[]

    for i in range (len(claims)):
        input_claim=claims[i]
        #Resetting the parameters each loop to reflect the current URL
        try:
            #Printing the URL and its type to make sure the program is running OK

            # Code here will only run if the request is successful
            api_endpoint = 'https://idir.uta.edu/claimbuster/api/v2/score/text/'+ input_claim
            request_headers = {"x-api-key": api_key}

            # Send the GET request to the API and store the api response
            api_response = requests.get(url=api_endpoint, headers=request_headers)

            #Taking the actual article from the JSON response
            jsonResponse=api_response.json()

            #Making sure the script doesn't stop when the API encounters a website that it doesn't like
            try:
                rating=jsonResponse["results"][0]["score"]
                #print(rating)
            except:
                rating="An Error occured"

            #Appending the fact check rating
            factCheckRatingsArr.append(str(rating))
            arr[i][2]=str(rating)

            
            
        except requests.ConnectionError as error:
            print(error)
            pass

def uploadData():
    keyFile = open("databaseUrl.txt", "r",encoding='utf-8')
    database_url=keyFile.read()
    cred = credentials.Certificate("firebaseCredentials.json")
    firebase_admin.initialize_app(cred, {
        'databaseURL': database_url
    })

    ref=db.reference()


    ref = ref.child('articles')
    for i in range (len(arr)):
        ref.push({
            'link': arr[i][0],
            'summary':arr[i][1],
            #'categories': [
            #    'temp',
            #    'temporary',
            #    'temp and temporary'
            #],
            'fact_score':arr[i][2]
            

            
        })

    #print(ref.get())
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

def main():
    #Getting RSS feeds
   
    print("Summarizing...")
    summarize()
    print("Summarization Complete")

    print("Fact Checking...")
    factCheck()
    print("Fact Check Complete")

    print("Uploading to database...")
    #uploadData()
    f = open("finalOutput6.txt", "w", encoding='utf-8')
    for line in arr:
        f.write(" ".join(line) + "\n") # works with any number of elements in a line
    #f.write(arr)
    f.close()
    print("Upload complete.")

    print("All Done!")
    print(arr)

#Open the list and split the entries by "," to make an array of URLs
def readURLS(fileName):
    f = open("output7.txt", "r", encoding='utf-8')
    urls=f.read().split(',')
    return urls

#Dont need for now, uncomment later on
# def getInputList(local_file, bucket, s3_file):
#     s3 = boto3.client('s3')
#     s3 = boto3.resource('s3')
#     #obj = s3.get_object(Bucket=bucket, Key=s3_file)
#     obj=s3.Bucket(bucket).download_file(s3_file, 'input4.json')

#This is getting the input list from S3 Bucket (NORMALLY NOT COMMENTED OUT)
#getInputList('output.txt', 'echo-storage-leon', 'input.json')
#Using the inputs retrived above
with open('./input4.json', 'r',encoding='utf-8') as f:
    data = json.load(f)

output = getFeeds()
f = open("output7.txt", "w", encoding='utf-8')
f.write(output)
f.close()
#Reading the URLS from a given file
urls=readURLS("output7.txt")

#Defining an array that will store the URLS for further processing
urlArr=[]
for i in range (len(urls)):
    urlArr.append(urls[i])

#Creating a 2D array to store a URL alongside the condesed version of the news it brings
rows, cols = (len(urlArr), 3)
#arr = [[0]*cols]*rows
arr = [[None]*cols for _ in range(rows)]
for i in range(len(arr)):
    arr[i][0]="0"
    arr[i][1]="0"
    arr[i][2]="0"

main()