# This is a unified version of our backend components
## More specifically, this version takes two of our existing components, the fact checker and the summarizer, and combines them into one program

The purpose of this unified program is to twofold: 

-Firstly, this unification allows for easier data consolidation, making writing connective tissue between the backend components easier. 

-Secondly, this *is* connective tissue, in a sense, as consolidating our components does what connective tissue does - connect our components together. Unification is the ultimate connection.

unifiedV2 adds functionality to the original unified, namely including support for working with the S3 bucket and producing data ready for categorization during execution. The latter is the reason for the articleFixerUpper, as it works to take the data outputted by unifiedV2, normalizing the results, and outputting a properly formatted excel spreadsheet.



