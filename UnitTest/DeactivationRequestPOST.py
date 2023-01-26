import requests as rq
from datetime import datetime, timedelta

base_URL = "http://localhost:3001"

#Testing POST route
common_payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102" }


payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102", "deactivation_start_date": datetime.now().isoformat(), "deactivation_end_date": (datetime.now() + timedelta(days=1)  ).isoformat()}

print((datetime.now() + timedelta(days=1)  ).isoformat())

response = rq.post(url=base_URL + "/deactivate-meal",json=payload, headers={"Content-Type":"application/json"})

print(response.text);
