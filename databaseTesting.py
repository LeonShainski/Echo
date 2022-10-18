import re
counter=0
f=open("uploadTestData.txt", "r", encoding='utf-8')
arrSummaries=[]
arrLink=[]
for line in f:
    result=re.search(' (.*) 0.', line)

    if result is not None:
        #print(result.group(0))
        #print(result.regs[1][1])
        a=result.regs[1][1]
        b=result.endpos
        c=result.string[a:b]
        #b=result.regs(1)[1]
        #c=result.regs(1)(1)
        summary=result.group(1)
        summarySplit = c.split()
        #if summary!='0':
        arrSummaries.append(result.group(1))
        counter=counter+1

        link = line[0:result.start()]
        arrLink.append(link)

        #sub1 = " "
        #sub2 = " 0."
    
        # getting index of substrings
        #idx1 = line.index(sub1)
        #idx2 = line.index(sub2)
    
        #res = ''
        # getting elements in between
        #for idx in range(idx1 + len(sub1) + 1, idx2):
        #    res = res + line[idx]

    print(link + '\n' + summary + '\n' + summarySplit[0] + '\n' + summarySplit[1] + '\n' + summarySplit[2])

    #print(link + " and " + summary)

