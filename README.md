# react-horizontal-schedule

> A horizontally scrolling week view for scheduling things like rooms, meetings, projects, resources.

[![NPM](https://img.shields.io/npm/v/react-horizontal-schedule.svg)](https://www.npmjs.com/package/react-horizontal-schedule) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


![screenshot](screenshot.png)

## Install

```bash
npm install --save react-horizontal-schedule
```

## Usage

[Demo](https://bitmorse.github.io/react-horizontal-schedule/)


```jsx
import React, { Component } from 'react'

import { Schedule } from 'react-horizontal-schedule'
import 'react-horizontal-schedule/dist/index.css'

const App = () => {

  const SCHEDULE_DATA = JSON.parse(document.getElementById('schedule-data').textContent);
  const itemHandler = function(r){
          return new Promise((resolve, reject)=>{
            resolve({id:98}) //return an object with id like this if you want to assign the id to a created item
          })
  }

  return <Schedule 
          onScheduleItemUpdated={itemHandler}
          onScheduleItemCreated={itemHandler}
          onScheduleItemRemoved={itemHandler}
          filterWidth={250}
          zoomMin={25}
          zoomMax={250}
          zoomStep={5}
          newEventDays={1}
          startDate={SCHEDULE_DATA.startDate}
          endDate={SCHEDULE_DATA.endDate}
          timelineHeight={SCHEDULE_DATA.timelineHeight}
          dayWidth={SCHEDULE_DATA.dayWidth}
          rows={SCHEDULE_DATA.rows}
        />
}
```

You can let the server present data via a script tag (of course you can also fetch from an API):
```html
    <script id="schedule-data" type="application/json">
       {
        "postUrl": "http://jsonplaceholder.typicode.com/posts",
        "startDate": "2021-01-01",
        "endDate": "2021-07-01",
        "dayWidth": 25,
        "timelineHeight": 40,
        "rows": [
          { "id": 1,
            "title": "Bert Macklin",
            "subtitle": "Dev",
            "imgUrl": "https://placekitten.com/50/50",
            "threads": 3,
            "items": [
              {
                "id": 1,
                "startDate": "2021-01-04",
                "thread": 0,
                "days": 7,
                "title": "A",
                "color": "green"
              }
            ]
          },
          {
            "id":2,
            "title": "Max Must",
            "subtitle": "Agent",
            "imgUrl": "https://placekitten.com/50/50",
            "threads": 3,
            "items": [
              {
                "id": 23,
                "startDate": "2021-02-15",
                "thread": 0,
                "days": 5,
                "title": "C",
                "color": "purple"
              },
              {
                "id": 24,
                "startDate": "2021-02-25",
                "thread": 1,
                "days": 5,
                "title": "D",
                "color": "yellow"
              }
            ]
          }
        ]
      }
    </script>

```

## License

MIT © [bitmorse](https://github.com/bitmorse)
