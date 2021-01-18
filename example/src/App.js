import React from 'react'
import { Schedule } from 'react-horizontal-schedule'
import 'react-horizontal-schedule/dist/index.css'

const App = () => {

  const SCHEDULE_DATA = JSON.parse(document.getElementById('schedule-data').textContent);

  const itemCreatedHandler = function(rowId, item){
    return new Promise((resolve, reject)=>{
      resolve({id:98}) //return an object with id like this if you want to assign the id to a created item
    })
  }

  const itemUpdatedHandler = function(item){
    return new Promise((resolve, reject)=>{
      resolve()
    })
  }

  return <Schedule 
          onScheduleItemCreated={itemCreatedHandler}
          onScheduleItemUpdated={itemUpdatedHandler}
          onScheduleItemRemoved={itemUpdatedHandler}
          newEventDays={4}
          filterWidth={250}
          startDate={SCHEDULE_DATA.startDate}
          endDate={SCHEDULE_DATA.endDate}
          timelineHeight={SCHEDULE_DATA.timelineHeight}
          dayWidth={SCHEDULE_DATA.dayWidth}
          rows={SCHEDULE_DATA.rows}
        />
}

export default App
