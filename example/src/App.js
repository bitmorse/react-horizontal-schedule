import React from 'react'
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
