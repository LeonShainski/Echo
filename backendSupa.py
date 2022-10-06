from email.mime import image
import feedparser
import json
from supabase import create_client
from newspaper import Article
import re
ACCESS_KEY = ''
SECRET_KEY = ''

API_URL = 'https://nnlrqgvazhqblcszxovj.supabase.co'
API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ubHJxZ3ZhemhxYmxjc3p4b3ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwMzk1MDcsImV4cCI6MTk3OTYxNTUwN30.7NhfGtTTR_qzUCdyAHon1OMdR7mIvzwBisOzfW17NNM'
supabase = create_client(API_URL, API_KEY)
supabase

with open('./sampleInput.json', 'r') as f:
  data = json.load(f)
  
output = []

def getUrls(data):
 
  for i in data:
      feed = feedparser.parse(i["url"])
      print(i["url"])
      print("\n")
      for e in feed.entries:
        #print(e)
        #print("\n")
        img = ''
        desc = ''
        feedStr = json.dumps(e)
        imageFound = False
        for i in feedStr.split():
           
          if i.find('jpg') > -1 or i.find('png') > -1 or i.find('JPG') > -1:
            imageFound = True
            img = i
            if i.endswith('}],'):
              img = i[1:-4]
              '''print(img)
              print('\n')'''
            if i.endswith('\\"'):
              img = i[6:-2]
            if i.endswith('",'):
              img = i[1:-2]
            if i.endswith("'"):
              img = i[5:-1]
            
        if hasattr(e, 'description'):
          summary = e.description
          if summary.startswith('<'):
            start = summary.find("<p>")
            end = summary.find("</p>")
            summary = summary[start+3:end]
          if len(summary) >0 and summary != None:
              desc = summary
          else:
            desc = e.title
        elif hasattr(e, 'summary'):
          print(e.summary)
          print("\n")
        '''
        else:
          print(summary)
        if len(summary) ==0:
          print(e)
        #print (feedStr[feedStr.find(start):feedStr.rfind(end)])
        #print(e.description)
          print("\n")'''
                      


        '''if not imageFound:
          print(e)
          print("\n")'''
          
          
        
        article = {
            'title': e.title,
            'url': e.link,
            'img': img,
            'summary': desc
            
          }
      
       

        output.append(article)
      

getUrls(data)
'''
for j in output:
    print(j)
    print("\n")
'''
supabase.table('articles').delete().gt("id", 1).execute()
supabase.table('articles').insert(output).execute()
