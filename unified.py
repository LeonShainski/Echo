from fileinput import filename
import requests
import json
import firebase_admin
from firebase_admin import db
from firebase_admin import credentials
from firebase_admin import db

def summarize():
    my_headers = {'Authorization' : 'Bearer {access_token}'}
    keyFile = open("key.txt", "r")
    key=keyFile.read()


    #Looping through each URL

    for i in range (len(arr)):
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
            jsonResponse=response.json()

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

            
            
        except requests.ConnectionError as error:
            print(error)
            pass

def factCheck():
    my_headers = {'Authorization' : 'Bearer {access_token}'}
    keyFile = open("keyFactCheck.txt", "r")
    api_key=keyFile.read()

    #f = open("demoTesting15.txt", "r")
   # claims=f.read().split('\n')
    claims=[]
    for i in range (len(arr)):
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
    keyFile = open("databaseUrl.txt", "r")
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
            'categories': [
                'temp',
                'temporary',
                'temp and temporary'
            ],'fact_score':arr[i][2]
            

            
        })

    #print(ref.get())

def main():
    print("Summarizing...")
    summarize()
    print("Summarization Complete")

    print("Fact Checking...")
    factCheck()
    print("Fact Check Complete")

    print("Uploading to database...")
    uploadData()
    print("Upload complete.")

    print("All Done!")
    print(arr)

#Open the list and split the entries by "," to make an array of URLs
def readURLS(fileName):
    f = open("urlList.txt", "r")
    urls=f.read().split(',')
    return urls

#Reading the URLS from a given file
urls=readURLS("urlList.txt")

#Defining an array that will store the URLS for further processing
urlArr=[]
for i in range (len(urls)):
    urlArr.append(urls[i])

#Creating a 2D array to store a URL alongside the condesed version of the news it brings
rows, cols = (len(urlArr), 3)
#arr = [[0]*cols]*rows
arr = [[None]*cols for _ in range(rows)]
for i in range(len(urlArr)):
    arr[i][0]="0"
    arr[i][1]="0"
    arr[i][2]="0"

main()