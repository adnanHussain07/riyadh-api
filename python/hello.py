import json
from re import X
import requests

print(json.dumps(42))
value1 = 42
status="true"
payload = dict(key1=value1, key2=status)
# url = 'http://localhost:5000/'
url = 'http://localhost:1880/'
myobj = {'somekey': 'somevalue'}

# x = requests.post(url, json = myobj)
x = requests.post(url, json = payload)

#print the response text (the content of the requested file):

print(x.text)


r = requests.get('http://localhost:1880/')
  
# check status code for response received
# success code - 200
# print(r)
  
# print content of request
print(r.content)