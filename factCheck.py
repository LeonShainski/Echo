#This is an app that returns a fact-check rating of our articles, in chronological order to recieving them.
from fileinput import filename
import requests
import json
my_headers = {'Authorization' : 'Bearer {access_token}'}
keyFile = open("key.txt", "r")
key=keyFile.read()
api_key = "c29a1376a21c44109eb78766e93772a9"

f = open("demoTesting15.txt", "r")
claims=f.read().split('\n')

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
            print(rating)
        except:
            rating="An Error occured"

        #Appending the fact check rating
        factCheckRatingsArr.append(str(rating))

        
        
    except requests.ConnectionError as error:
        print(error)
        pass

#main output is to a textfile 
endFile = open("demoTestingRatings18b.txt", "a", encoding="utf-8")
for i in range (len(factCheckRatingsArr)):
    endFile.write(factCheckRatingsArr[i])
    endFile.write("\n")
endFile.close()

print("All done!")