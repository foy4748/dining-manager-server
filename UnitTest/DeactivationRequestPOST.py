import requests as rq
from datetime import datetime, timedelta

base_URL = "http://localhost:3001"

#Testing POST route
common_payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102" }


payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102", "deactivation_start_date": "2023-02-11", "deactivation_end_date": "2023-02-14"}


response = rq.post(url=base_URL + "/deactivate-meal",json=payload, headers={"Content-Type":"application/json"})

print(response.text)
