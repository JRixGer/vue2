curl -X GET http://localhost:3000/library

# Get A book
curl -X GET http://localhost:3000/library/1

curl -X POST -H "Content-Type: application/json" \
    -d '{ "description": "Larvel",      "active_start_date": "2022-01-01",       "active_end_date": null     }' \
   http://localhost:3000/library