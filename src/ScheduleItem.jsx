import React from 'react'
import { Rnd } from "react-rnd";
import EasyEdit, { Types } from "react-easy-edit";
import moment from 'moment';
import styles from './styles.module.css'


class ScheduleItem extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      }

      this.onPositionUpdated = this.onPositionUpdated.bind(this)
      this.onSizeUpdated = this.onSizeUpdated.bind(this)
      this.computeStartX = this.computeStartX.bind(this)
      this.computeStartDate = this.computeStartDate.bind(this)
      this.computeThread = this.computeThread.bind(this)
    }

    computeThread(y, grid){
      var inc = grid.y
      var thread = Math.ceil(y/inc)

      return thread
    }

    computeStartX(startDate, weeks, grid){
      var x = 0
      var startDay = moment(startDate).isoWeekday() - 1 //monday should be 0 (iso week starts on monday.
                                                        // isoWeekday() returns 1 for monday)
      var week = weeks.find(o => moment(o.startDate) <= moment(startDate) && moment(startDate) <= moment(o.endDate))
      var startWeek = weeks.indexOf(week)
      x = (startWeek * 7 + startDay) * grid.x

      return x
    }

    computeStartDate(x, grid){
      x += 1 //adding one pixel fixes the case where the position is unchanged but the date is recomputed to currentDate minus one
      var inc = grid.x
      var daysInWeek = 7
      var startsInWeek = Math.floor(Math.ceil(x/inc)/daysInWeek)
      var startsOnDay = Math.ceil(x/inc) - startsInWeek*daysInWeek
      var gridStartDateWeek = moment(grid.startDate).week()
      var gridStartDate = moment().week(gridStartDateWeek)
      var itemStartDate = gridStartDate.add(startsOnDay, 'd').add(startsInWeek, 'w')

      return {startDate: itemStartDate.format('YYYY-MM-DD')}
    }

    onSizeUpdated(id, size){
      var inc = this.props.grid.x
      var newDays = this.props.days + size.widthDelta/inc
      this.props.onDurationUpdated(id, newDays)

      var start = this.computeStartDate(size.x, this.props.grid) // computes start  of event
      var thread = this.computeThread(size.y, this.props.grid)
      var position = {
        startDate: start.startDate,
        thread: thread,
      }
      this.props.onPositionUpdated(id, position)
    }

    onPositionUpdated(id, position){
      var start = this.computeStartDate(position.x, this.props.grid) // computes start  of event
      var thread = this.computeThread(position.y, this.props.grid)
      position.startDate = start.startDate
      position.thread = thread
      this.props.onPositionUpdated(id, position)
    }

    render() {
      var x = this.computeStartX(this.props.startDate, this.props.weeks, this.props.grid)
      var y = this.props.thread * this.props.grid.y

      return <Rnd
          bounds="parent"

          onResizeStop={(e, direction, ref, delta, position)=>{
            this.onSizeUpdated(this.props.id, {x:position.x, y: position.y, widthDelta: delta.width})
          }}

          onDragStop={(e,d)=>{
            this.onPositionUpdated(this.props.id, {x: d.x, y: d.y, widthDelta: 0})
          }}

          position={{ x: x, y: y }}
          enableResizing={{
            top: false,
            right: true,
            bottom: false,
            left: true,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false
          }}
          size={{
            width: this.props.grid.x * this.props.days,
            height: this.props.grid.y 
          }}
          
          dragGrid={[1, 1]}
          resizeGrid={[this.props.grid.x, 1]}
        >
          <div
            className={styles.scheduleItem}
            style={{
              background: this.props.color,
              height: this.props.grid.y,
              userSelect: 'none',
              overflow: 'none',
              padding: 3,
              border: '1px solid white',
              borderRadius: '5px',
              fontSize: '10px'
            }}
          > 
          <div className={styles.scheduleItemDate}>{moment(this.props.startDate).format('D MMM')} for {this.props.days}d</div>
          <div>
            <EasyEdit
                className={styles.scheduleItemInput}
                placeholder={this.props.title}
                onSave={(e)=>{this.props.onTitleUpdated(this.props.id, e)}}
                type={Types.TEXT}
                hideSaveButton={true}
                hideCancelButton={true}
                saveOnBlur={true}
                attributes={{ name: "awesome-input", id: 1 }}
              />
          </div>
          </div>
          </Rnd>;
    }
  }

export default ScheduleItem;
