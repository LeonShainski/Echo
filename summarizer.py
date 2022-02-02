#This is an app that will query the SMMRY API to summarize news articles
from fileinput import filename
import requests
import json
my_headers = {'Authorization' : 'Bearer {access_token}'}
keyFile = open("key.txt", "r")
key=keyFile.read()


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

#Looping through each URL
for i in range (len(urlArr)):
    currentURL=urlArr[i]
    #Resetting the parameters each loop to reflect the current URL
    params={
        "SM_API_KEY":key, 
        "SM_URL": currentURL
    }
    try:
        #Printing the URL and its type to make sure the program is running OK
        print(currentURL, type(currentURL))

        # Code here will only run if the request is successful
        response = requests.get("https://api.smmry.com", params=params)
        #jsonResponse=response.json()
        print (response.json())

        #Taking the actual article from the JSON response
        jsonResponse=response.json()
        summarizedText=jsonResponse["sm_api_content"]

        #Saving the summarized article to file
        endFile = open("demoTesting2.txt", "a")
        endFile.write(summarizedText)
        endFile.close()
        

    except requests.ConnectionError as error:
        print(error)

    
print("All done!")


