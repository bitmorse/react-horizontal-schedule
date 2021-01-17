import React from 'react'
import { Schedule } from 'react-horizontal-schedule'
import 'react-horizontal-schedule/dist/index.css'

const App = () => {

  const SCHEDULE_DATA = JSON.parse(document.getElementById('schedule-data').textContent);
  
  return <Schedule 
          filterWidth={250}
          startDate={SCHEDULE_DATA.startDate}
          endDate={SCHEDULE_DATA.endDate}
          timelineHeight={SCHEDULE_DATA.timelineHeight}
          dayWidth={SCHEDULE_DATA.dayWidth}
          rows={SCHEDULE_DATA.rows}
        />
}

export default App
