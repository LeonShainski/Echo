from fileinput import filename
import requests
import json

import feedparser

from supabase import create_client

from supabase import create_client
import json
API_URL='https://vsaxkocxddahwxlbzkjj.supabase.co'
API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzYXhrb2N4ZGRhaHd4bGJ6a2pqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MjU2MjYsImV4cCI6MTk3OTMwMTYyNn0.mUro088rMzVnGQAZRxtelwUyE-hLLCHJ5VfxoTHLbsM'
supabase = create_client(API_URL, API_KEY)
supabase



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
            # Code here will only run if the request is successful
            response = requests.get("https://api.smmry.com", params=params)

            #Taking the actual article from the JSON response
            try:
                jsonResponse=response.json()
            except:
                print("Failure to grab response from SMMRY API")

            #Making sure the script doesn't stop when the API encounters a website that it doesn't like
            try:
                summarizedText=jsonResponse["sm_api_content"]
            except:
                summarizedText="An Error occured"

            if (summarizedText != "An Error occured"):
                #Saving the summarized article to file303w8
                # endFile = open("demoTesting15.txt", "a", encoding="utf-8")
                # endFile.write(summarizedText)
                # endFile.write("\n")
                # endFile.close()

                #Saving URL an subsequent summarized text to a 2D array
                arr[i][0]=currentURL
                arr[i][1]=summarizedText
                try:
                    f = open("finalOutputDuringExecution9.txt", "a",encoding='utf-8')
                    f.write(arr[i][0] + " ") # works with any number of elements in a line
                    f.write((arr[i][1]) + " ") 
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
    #claims=[]
    #for i in range (len(urlArr)):
    #    claims.append(arr[i][0])

    #Looping through each URL

    factCheckRatingsArr=[]

    for i in range (len(urlArr)):
        input_claim=arr[i][1]
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
    for i in range (len(arr)):
        if arr[i][0]!='0':
            data={
                'link': arr[i][0],
                'summary':arr[i][1],
                'fact_score':arr[i][2]         
            }
            supabase.table('articles').insert(data).execute() # inserting one record

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

    
    f = open("finalOutput9.txt", "w", encoding='utf-8')
    for line in arr:
        if (line[0]!='0'):
            f.write(" ".join(line) + "\n") # works with any number of elements in a line
    f.close()
    
    #exec(open("./unifiedV3.py").read())

    #print("also comes here")
    #return "hello"
    #exit()

    print("Uploading to database...")
    uploadData()

    
    print("Upload complete.")

    print("All Done!")
    print(arr)

#Open the list and split the entries by "," to make an array of URLs
def readURLS(fileName):
    f = open("urlInput1.txt", "r", encoding='utf-8')
    urls=f.read().split(',')
    return urls


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