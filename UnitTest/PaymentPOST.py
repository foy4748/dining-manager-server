import requests as rq

base_URL = "http://localhost:3001"

#Testing POST route
payload = { "payment_amount":"2500", "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102" }

response = rq.post(url=base_URL + "/payments",json=payload, headers={"Content-Type":"application/json"})

print(response.text);


# Testing GET route
response = rq.get(url=base_URL+"/payments")
print(response.text);
