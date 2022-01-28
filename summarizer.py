#This is an app that will query the SMMRY API to summarize news articles
import requests
import json
my_headers = {'Authorization' : 'Bearer {access_token}'}

try:
    response = requests.get("https://api.smmry.com", params={"SM_API_KEY":"38CCF65DE1", "SM_URL": "https://www.buzzfeednews.com/article/kadiagoba/republican-medical-boards-covid-treatments",})
    # Code here will only run if the request is successful
except requests.ConnectionError as error:
    print(error)

print (response.json())

jsonResponse=response.json()

summarizedText=jsonResponse["sm_api_content"]

f = open("demo.txt", "a")
f.write(summarizedText)
f.close()