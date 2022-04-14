import re
import json
import xlsxwriter
from datetime import date, datetime, time

f = open("finalOutput6.txt", "r", encoding='utf-8')
arrLink=[]
arrSummary=[]
stopwords = {'"',':','link','summary'}

# for line in f:
#     if '"link' in line:
#         currentLine=line.replace('"link": "', '', 1)
#         finalLine=currentLine.replace('",', '', 1)
#         if finalLine not in arrLink:
#             arrLink.append(finalLine)
#             print(finalLine)
#     elif '"summary' in line:
#         currentLine=line.replace('"summary": "', '', 1)
#         #finalLine=currentLine.replace('"', '', 1)
#         if currentLine not in arrSummary:
#             arrSummary.append(currentLine)
#             print(currentLine)


def goodOutput():
    counter=0
    for line in f:
        result = re.search(' (.*) 0.', line)
        #if resultw[!.?"]0
        #result = re.search(' (.*)[!.?"]0', line)
        if result is not None:
            arrSummary.append(result.group(1))
            counter=counter+1
        #print(result.start())

        link = line[0:result.start()]
        arrLink.append(link)

        sub1 = " "
        sub2 = " 0."
        
        # # getting index of substrings
        idx1 = line.index(sub1)
        idx2 = line.index(sub2)
        
        res = ''
        # getting elements in between
        for idx in range(idx1 + len(sub1) + 1, idx2):
           res = res + line[idx]
        #print(result)
        #print(result.group(1))
        
    #print(arr[85])
    #print(arrLink[85])
    print(counter)
            
    if len(arrLink)==len(arrSummary):
        print("all good")
    else:
        print("no bueno")

def salvagedOutput():
    counter=0
    for line in f:
        #result = re.search(' (.*) 0.', line)
        #if resultw[!.?"]0
        result = re.search(' (.*)[!.?"]0', line)
        if result is not None:
            arrSummary.append(result.group(1))
            counter=counter+1
        #print(result.start())

        link = line[0:result.start()]
        arrLink.append(link)

        # sub1 = " "
        # sub2 = " 0."
        
        # # getting index of substrings
        # idx1 = line.index(sub1)
        # idx2 = line.index(sub2)
        
        res = ''
        # getting elements in between
        #for idx in range(idx1 + len(sub1) + 1, idx2):
        #    res = res + line[idx]
        #print(result)
        #print(result.group(1))
        
    #print(arr[85])
    #print(arrLink[85])
    print(counter)
            
    if len(arrLink)==len(arrSummary):
        print("all good")
    else:
        print("no bueno")




def save(date):
    #Time and Date stuff
    today = date.today()
    date = today.strftime("%b-%d-%Y")
    now = datetime.now()
    current_time = now.strftime("--%H-%M-%S")

    #Excel Saving
    workbook = xlsxwriter.Workbook('Files/TrainingArticles'+date+str(current_time)+'.xlsx')
    worksheet = workbook.add_worksheet("Sheet1")

    headerArr=['Link', 'Article Body','Region', 'Happy', 'Sad', 'Information', 'Environmental', 'Political', 'Geopolitical', 'Sports', 'Food & Wine', 
    'Business', 'Technology', 'Arts & Culture', 'Entertainment', 'Health', 'Beauty', 'Science', 'Opinion', 'Travel', 'Education', 'Energy', 'Property & Infrastructure', 'Industry', 
    'Justice', 'Finance', 'Music', 'Drugs and Alcohol', 'Weather', 'Satire', 'Conflict & Military']
    row=0
    col=0
    for header in headerArr:
        worksheet.write(row, col, header)	
        col+=1	
    row=1
    col=0

    for i in range(len(arrLink)):

        worksheet.write(row, col, arrLink[i])
        worksheet.write(row, col+1, arrSummary[i])
        worksheet.write(row, col + 2, "Stop")
        row+=1

    workbook.close()

#Program lies primarily here

userSelection = input("Enter 1 for good output, 2 for salvaged output: ")
if (userSelection == '1'):
    goodOutput()
    save(date)
elif (userSelection == '2'):
    salvagedOutput()
    save(date)
else:
    print("Please make a valid selection")