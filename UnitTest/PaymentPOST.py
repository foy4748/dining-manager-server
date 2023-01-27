import requests as rq

base_URL = "http://localhost:3001"

#Testing POST route

# Testing GET route
response = rq.get(url=base_URL+"/payments")
print(response.text);
