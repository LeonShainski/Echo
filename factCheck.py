# import requests
# import json
# from fileinput import filename
# #my_headers = {'Authorization' : 'Bearer {access_token}'}
# keyFile = open("key.txt", "r")
# key=keyFile.read()

# api_key = "c29a1376a21c44109eb78766e93772a9"
# input_claim = "Donald Trump is 75 years old."

# # Define the endpoint (url) with the claim formatted as part of it, api-key (api-key is sent as an extra header)
# api_endpoint = f"https://idir.uta.edu/claimbuster/api/v2/score/text/{input_claim}"
# request_headers = {"x-api-key": api_key}

# # Send the GET request to the API and store the api response
# api_response = requests.get(url=api_endpoint, headers=request_headers)

# # Print out the JSON payload the API sent back
# print(api_response.json())

#This is an app that will query the SMMRY API to summarize news articles
from fileinput import filename
import requests
import json
my_headers = {'Authorization' : 'Bearer {access_token}'}
keyFile = open("key.txt", "r")
key=keyFile.read()



#Open the list and split the entries by "," to make an array of URLs
def readURLS(fileName):
    f = open("demoTesting15.txt", "r")
    claims=f.read().split('\n')
    return claims

#Reading the URLS from a given file
#urls=readURLS("demoTesting15.txt")
api_key = "key.txt"

#Defining an array that will store the URLS for further processing
urlArr=[]
#for i in range (len(urls)):
#    urlArr.append(urls[i])

#Creating a 2D array to store a URL alongside the condesed version of the news it brings
rows, cols = (len(urlArr), 2)
#arr = [[0]*cols]*rows
arr = [[None]*cols for _ in range(rows)]
for i in range(len(urlArr)):
    arr[i][0]="0"
    arr[i][1]="0"

f = open("demoTesting15.txt", "r")
claims=f.read().split('\n')

#Looping through each URL

factCheckRatingsArr=[]

for i in range (len(claims)):
    input_claim=claims[i]
    print(input_claim)
    #Resetting the parameters each loop to reflect the current URL
    try:
        #Printing the URL and its type to make sure the program is running OK
        #print(input_claim, type(input_claim))

        # Code here will only run if the request is successful
        #$response = requests.get("https://api.smmry.com", params=params)
        #jsonResponse=response.json()
        #print (response.json())
        api_endpoint = 'https://idir.uta.edu/claimbuster/api/v2/score/text/', input_claim
        request_headers = {"x-api-key": api_key}

        # Send the GET request to the API and store the api response
        api_response = requests.get(url=api_endpoint, headers=request_headers)

        #Taking the actual article from the JSON response
        jsonResponse=api_response.json()

        #Making sure the script doesn't stop when the API encounters a website that it doesn't like
        try:
            rating=jsonResponse["results"][0]["score"]
            print(rating)
        except:
            rating="An Error occured"

        # if (rating != "An Error occured"):
        #     #Saving the summarized article to file
        #     endFile = open("demoTestingRatings17.txt", "a", encoding="utf-8")
        #     endFile.write(str(rating))
        #     endFile.write("\n")
        #     endFile.close()

            #Saving URL an subsequent summarized text to a 2D array
            #arr[i][0]=input_claim
            #arr[i][1]=rating
            factCheckRatingsArr.append(str(rating))

        
        
    except requests.ConnectionError as error:
        print(error)
        pass

endFile = open("demoTestingRatings17.txt", "a", encoding="utf-8")
for i in range (factCheckRatingsArr):
    endFile.write(factCheckRatingsArr[i])
    endFile.write("\n")
endFile.close()

#Transforming 2D array to JSON format
jsonArr=(json.dumps(arr, sort_keys=True, indent=4))
#Saving the 2D array (Now in JSON format) to a file
endFile = open("demoTesting17B.json", "a")
endFile.write(jsonArr)
endFile.close()
    
print("All done!")