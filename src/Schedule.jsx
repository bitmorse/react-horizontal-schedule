import React from 'react'
import ScheduleItem from './ScheduleItem.jsx';
import ScheduleRow from './ScheduleRow.jsx'
import Moment from 'react-moment';
import moment from 'moment';
import { current } from 'immer';
import axios from 'axios';
import styles from './styles.module.css'

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          'grid': {
            filterOffset: props.filterWidth,
            y: props.timelineHeight, x: props.dayWidth,  //y: pixels per timeline, x: pixels per day
            'startDate': props.startDate,
            'endDate': props.endDate,
          },
          'rows': props.rows
        };

        this.rowUpdated=this.rowUpdated.bind(this);
        this.addNewItem=this.addNewItem.bind(this);
        this.onZoomChanged=this.onZoomChanged.bind(this);
    }

    rowUpdated(row){
      var inc = this.state.grid.x

      var rows = [...this.state.rows]

      if(row.dimensions != undefined){
        rows[row.rowIndex]['items'][row.itemIndex].startDate = row.dimensions.startDate
        rows[row.rowIndex]['items'][row.itemIndex].thread = row.dimensions.thread

        if(rows[row.rowIndex]['items'][row.itemIndex].days == 0){
          delete rows[row.rowIndex]['items'][row.itemIndex];
        }
      }

      if(row.title != undefined){
        rows[row.rowIndex]['items'][row.itemIndex].title = row.title 
      }


      if(row.duration != undefined){
        rows[row.rowIndex]['items'][row.itemIndex].days = row.duration 
      }
      
      //save changes
      if(this.props.postUrl){
        axios.post(this.props.postUrl, { rows })
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
      }

      this.setState({rows: rows})

    }

    addNewItem(e){
      if(e.target.className.indexOf('scheduleRow') > 0){

        var bounds = e.target.getBoundingClientRect()
        var headerHeight = 50 //height of the week title header
        var y = e.clientY - bounds.y - headerHeight
        var x = e.clientX - bounds.x
        var rowId = e.target.id

        var s = new ScheduleItem()
        var start = s.computeStartDate(x, this.state.grid)
        var thread = s.computeThread(y, this.state.grid)
        
        var rows = [...this.state.rows]
        var row = {
          startDate: start.startDate,
          days: 3,
          color: '#eee',
          title: 'New event',
          thread: thread
        }

        rows[rowId]['items'].push(row)
        this.setState({rows: rows})
      }
      
    }

    onZoomChanged(e){
      var newX = e.target.value
      var timelineWidth = newX * this.state.weeks.length * 7
      this.setState({'grid': {...this.state.grid,  width: timelineWidth, x: newX}})
    }

    componentWillMount(){
      //iso weeks start on monday

      var weeks = []
      var gridStartDate = moment(this.state.grid.startDate)
      var currentDate = gridStartDate.add(1-gridStartDate.day(),'d') //gets date of the start of the week of startDate
      var endDate = {}
      while(currentDate < moment(this.state.grid.endDate)){
        weeks.push({
          weekNumber: moment(currentDate).isoWeek(),
          startDate: moment(currentDate),
          endDate: moment(currentDate).add(6, 'd')
        })
        currentDate = currentDate.add(7, 'd')
      }
      var timelineWidth = this.state.grid.x * weeks.length * 7
      this.setState({grid: {...this.state.grid, width: timelineWidth}})

      this.setState({weeks: weeks})
    }

    render() {
      return <div className={styles.schedule}>

          <div className={styles.weekHeader}>
            <div style={{width: this.state.grid.filterOffset}}>
              <input onChange={this.onZoomChanged} value={this.state.grid.x} id="zoom" type="range" min="5" max="50" step="5" /> 
            </div>
            {this.state.weeks.map((week, i)=>{
              return <div key={i} style={{width: 7*this.state.grid.x}}>
                {week.weekNumber}<br /> 
                {this.state.grid.x > 15 &&
                  <span>
                  {week.startDate.format('MMM D')} - {week.endDate.format('D')}
                  </span>
                }
              </div>
            })}
          </div>

          {this.state.rows.map((row, i) => {
            return <ScheduleRow 
                    title={row.title}
                    subtitle={row.subtitle}
                    imgUrl={row.imgUrl}
                    weeks={this.state.weeks} 
                    onRowClicked={this.addNewItem} 
                    grid={this.state.grid} 
                    key={i} 
                    id={i} 
                    items={row.items} 
                    threads={row.threads} 
                    rowUpdated={this.rowUpdated} />
          })}
        
        </div>
    }
  }

export default Schedule;
