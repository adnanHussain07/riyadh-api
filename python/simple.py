import requests

url2 = 'http://localhost:1880/'
myobj = {'somekey': 'somevalue'}

x = requests.post(url2, json = myobj)

print(x.text)

if state == True:
    msg = "Start_Cycle_is_True"
if state == False:
    # msg = "sfss"pritn(x)
    