import requests as rq
from datetime import datetime, timedelta

base_URL = "http://localhost:3001"

#Testing POST route
common_payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102" }


payload = { "User_id":"123456789123456789123456", "card_no":"242","committee_no":"102", "deactivation_start_date":( datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d'), "deactivation_end_date":( datetime.today() + timedelta(days=4)).strftime('%Y-%m-%d') }


response = rq.post(url=base_URL + "/deactivate-meal",json=payload, headers={"Content-Type":"application/json"})

print(response.text)
