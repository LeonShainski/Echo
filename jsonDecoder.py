import json
import xlsxwriter
from datetime import date, datetime, time


today = date.today()
date = today.strftime("%b-%d-%Y")
now = datetime.now()
current_time = now.strftime("--%H-%M-%S")

workbook = xlsxwriter.Workbook('Files/TrainingArticles'+date+str(current_time)+'.xlsx')
worksheet = workbook.add_worksheet("Sheet1")


f = open('demoTesting05.json', "r")
arr=json.load(f)
print(arr[0][0])

row=0
col=0

headerArr=['Link', 'Article Body','Region', 'Happy', 'Sad', 'Information', 'Morbid', 'Environmental', 'Political', 'Geopolitical', 'Sports', 'Food & Wine', 
'Business', 'Technology', 'Arts & Culture', 'Entertainment', 'Health', 'Beauty', 'Science', 'Opinion', 'Travel', 'Education', 'Energy', 'Property & Infrastructure', 'Industry', 
'Justice', 'Finance', 'Music', 'Drugs and Alcohol', 'Weather', 'Satire', 'Conflict & Military']

for header in headerArr:
    worksheet.write(row, col, header)	
    col+=1															

row=1
col=0

for link, summary in (arr):

    worksheet.write(row, col, link)
    worksheet.write(row, col+1, summary)
    worksheet.write(row, col + 2, "Stop")
    row+=1



workbook.close()

