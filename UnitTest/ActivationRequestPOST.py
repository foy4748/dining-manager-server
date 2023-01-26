import requests as rq
from datetime import datetime

base_URL = "http://localhost:3001"

#Testing POST route
common_payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102" }


payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102", "activation_date": datetime.now().isoformat() }

response = rq.post(url=base_URL + "/activate-meal",json=payload, headers={"Content-Type":"application/json"})

print(response.text);
