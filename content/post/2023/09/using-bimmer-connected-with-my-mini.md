+++
date = "2023-09-04T07:00:00-00:00"
title = "Using bimmer connected with my mini"
slug = "2023/09/using-bimmer-connected-with-my-mini"
author = "Alan Pope"
tags = ['mini', 'ev', 'car', 'charging', 'axiom']
+++

tl;dr I own an BEV (Battery Electric Vehicle) BMW Mini. I previously [wrote](/blog/2023/08/charting-ev-car-charging/) and [talked](https://linuxmatters.sh/10/) about getting a 'takeout' of my car charging data from BMW, and putting it into [Axiom](https://app.axiom.co/) to answer some common questions from the 'EV Curious'. I'm now getting ongoing data from the car, but I had to use 3rd party tools to do it.

## BMW 

BMW has an API for getting car data (beyond the 'takeout' I used last time), to get the ongoing daily charge data.

I knew they had an api because my Ohme home charger has a feature where they can query the API for your car, using your BMW credentials. 

## Rejections

Tried to register for [AOS](https://aos.bmwgroup.com/web/oss/start) (BMW Aftersales Online System) for an API key but was rejected because I'm not an "entitled independent operator".

[![AOS says no](/blog/images/2023-09-04/aos-says-no.png)](/blog/images/2023-09-04/aos-says-no.png)

I tried pushing a little harder and ot redirected to another department, who also rejected me because I quote "do not fit to a publisher of technical information"

[![Also, no](/blog/images/2023-09-04/also-no.png)](/blog/images/2023-09-04/also-no.png)

End of the line for direct API access. I started looking for other options.

## Bimmer

With a bit of internet rummaging I found [bimmer_connected](https://github.com/bimmerconnected/bimmer_connected) which is a "library to query the status of your BMW or Mini from the ConnectedDrive portal"

It's a Python library you can use to query the API using your existing BMW user/password (and VIN) used when setting up the mobile app.

It also has a command-line tool you can use to get the data called `bimmerconnected`. You just pass it your BMW username, password, region (and sometimes VIN) to get car data. It returns a blob of JSON which can then be processed locally.

## What data

What car data do we get? Physical car attributes that don't change, like make, model, drivetrain, enabled capabilities

```bash
      "appVehicleType": "CONNECTED",
      "attributes": {
        "lastFetched": "2023-09-03T19:14:39.635Z",
        "model": "Cooper SE",
        "year": 2021,
        "color": 4290295992,
        "brand": "MINI",
        "driveTrain": "ELECTRIC",
        "headUnitType": "ENTRY_EVO",
        "headUnitRaw": "ENAVEVO",
        "hmiVersion": "ID5",
```


It provided the stuff I wanted, mileage, charge level, range, latitude, longitude, heading and inspection dates.

```bash
    "fuel_and_battery": {
      "remaining_range_fuel": [
        null,
        null
      ],
      "remaining_range_electric": [
        136,
        "mi"
      ],
      "remaining_range_total": [
        136,
        "mi"
      ],
      "remaining_fuel": [
        null,
        null
      ],
```

It also has stuff that doesn't change often like software versions, charging schedule, doors, windows and sunroof closed or open status.

```bash
      "is_metric": false,
      "fetched_at": "2023-09-03T19:14:38.181566+00:00",
      "state": {
        "isLeftSteering": false,
        "lastFetched": "2023-09-03T19:14:40.086Z",
        "lastUpdatedAt": "2023-09-03T17:41:51Z",
        "isLscSupported": true,
        "range": 136,
        "doorsState": {
          "combinedSecurityState": "SECURED",
          "leftFront": "CLOSED",
          "rightFront": "CLOSED",
          "combinedState": "CLOSED",
          "hood": "CLOSED",
          "trunk": "CLOSED"
        },
        "windowsState": {
          "leftFront": "CLOSED",
          "rightFront": "CLOSED",
          "combinedState": "CLOSED"
        },
        "roofState": {
          "roofState": "CLOSED",
          "roofStateType": "SUN_ROOF"
        },
```


### Shell to the rescue

So I wrote a 5 line shell script which calls `bimmerconnected`, to dump out json of all the above, every 5 minutes. I initially had it running every minute, which was a touch aggressive. Also, pointless, because it seems the backend only updates every 5 minutes anyway. 

It just sits on my home server and runs forever. I currently keep the json files for debugging, but will likely stop doing that once I flesh out the dashboard fully.

```bash
#!/bin/bash
BMW_USER="<my_email_address>"
BMW_PASSWORD="<my_bmw_website_password>"
BMW_REGION="rest_of_world"
BMW_VIN="<my_car_VIN>"
DATASET_NAME="<axiom_dataset_name>"
API_TOKEN="<axiom_dataset_api_key>"

while :
do

DATESTAMP="$(date +%Y%m%dT%H%M%S)"
JSONFILE="./$DATESTAMP.json"
bimmerconnected status -j -i "$BMW_USER" "$BMW_PASSWORD" "$BMW_REGION" | jq . > "$JSONFILE"
response=$(cat "$JSONFILE")
curl -X 'POST' 'https://api.axiom.co/v1/datasets/'$DATASET_NAME'/ingest' \
  -H 'Authorization: Bearer '$API_TOKEN \
  -H 'Content-Type: application/json' \
  -d  \
  "$response" 
sleep 300
done

```

Yes, I should probably do this properly in Python. :)

## New dashboard

Once I had the data flowing into [Axiom](https://app.axiom.co/), I could start building a dashboard. I've started with the mileage and charge level of the car. 

[![Dashboard](/blog/images/2023-09-04/dashboard.png)](/blog/images/2023-09-04/dashboard.png)

I'd like to add further charts, and add some alerts when services are due, given that data is returned from the API. Maybe even an alert if I've left the sunroof or windows open. 
