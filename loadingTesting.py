from torch import nn
from torchtext.vocab import GloVe
from torchtext.data.utils import get_tokenizer
import torch
import numpy as np
import re
# pip install spacy
# py/python -m spacy download en_core_web_sm

# [happy, green, jump, bright, ...]
# hello = [0.05,0.1,0.7,0.2,...]
arrSentences=["what does the fox say", "Your mom is a very lovely lady", "Dog tragically killed in automobile crash"]
arrPredictions=[]
counter=0
f=open("finalOutput8.txt", "r", encoding='utf-8')
arrSummaries=[]
for line in f:
    result=re.search(' (.*) 0.', line)

    if result is not None:
        summary=result.group(1)
        #if summary!='0': 
        arrSummaries.append(result.group(1))
        counter=counter+1

#print(arrSummaries)


for i in range (len(arrSummaries)):

    class Baseline(nn.Module):

        def __init__(self, embedding_dim, vocab):
            super(Baseline, self).__init__()
            # embedding = word -> vector
            # embedding_dim = 300
            self.embedding = nn.Embedding.from_pretrained(vocab.vectors, freeze=True)
            # fully-connected
            # nn.Linear(# of inputs, # of outputs)
            self.fc = nn.Linear(embedding_dim, 3)

            torch.nn.init.uniform_(self.fc.weight,-1*(1/np.sqrt(embedding_dim)),(1/np.sqrt(embedding_dim)))

        def forward(self, x, verbose=False):
            # x is a list of indexes (representing words) "the" -> 1, "hello" -> 45, "rhugbnawo[iefbnpie" -> 400 000
            # shape of x -> [batch_size, sentence_length]
            # ex: x = "hello","my","name","is"
            embedded = self.embedding(x)
            # embedded is a list of vectors based on the words
            # embedded = [[300D],[300D],[300D],[300D]]
            # embedded = [batch_size, sentence_length, 300]
            average = embedded.mean(1) 
            # average is 1 300D vector representing the average of all the vectors in embedded
            # average = [300D]
            # average = [batch_size, 1, 300]
            fc1 = self.fc(average).squeeze(1)
            # fc1 = [0.01,0.02,0.03]
            output = nn.functional.softmax(fc1,dim=1)
            # output = [0.000001,0.001,0.999999]
            return output


    tokenizer = get_tokenizer('spacy')
    glove = GloVe('6B')
    glove.vectors = torch.cat((glove.vectors,torch.zeros(300).unsqueeze(0)))
    vocab = set(glove.stoi.keys())
    model = Baseline(300,glove)
    model.load_state_dict(torch.load('model_v2.pt'))
    def tokens_to_indexes(tokens):
        idxs = [glove.stoi[token] if token in vocab else 400000 for token in tokens]
        return idxs


    #test_sentance = "A delicious strawberry found in my yogurt" #Happy
    #test_sentance = "The senate met yesterday to discuss new information, and what the information means" #Info
    #test_sentance = "A disgusting strawberry found dead" #Sad
    test_sentance = arrSummaries[i]

    tokens = tokenizer(test_sentance.lower())
    idxs = tokens_to_indexes(tokens)
    tens = torch.tensor(idxs).unsqueeze(0)
    label_names = ['Happy','Sad','Information']
    #print("prediction: ",model(tens,verbose=False).detach().numpy()[0])
    #print("predicted label: {}".format(label_names[np.argmax(model(tens,verbose=False).detach().numpy()[0])]))
    arrPredictions.append(label_names[np.argmax(model(tens,verbose=False).detach().numpy()[0])])
    #print(arrPredictions[i])


#f=open("data_files/finalOutput8.txt", "a", encoding='utf-8')
arrSummaries=[]
counter=0
with open('outTest.txt', 'w') as out_file:
    with open('finalOutput8.txt', 'r') as in_file:
        for line in in_file:
            print(str(line) + " Counter: " + str(counter) + " prediction: " + arrPredictions[counter])
            
            #line = line + " " + arrPredictions[line]
            out_file.write(line.rstrip('\n') + " " + arrPredictions[counter] + '\n')
            counter=counter+1


