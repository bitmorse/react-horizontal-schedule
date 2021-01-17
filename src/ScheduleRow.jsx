import React from 'react'
import ScheduleItem from './ScheduleItem.jsx'
import Moment from 'react-moment';
import moment from 'moment';
import styles from './styles.module.css'

class ScheduleRow extends React.Component {

    constructor(props) {
        super(props);

        this.onPositionUpdated=this.onPositionUpdated.bind(this);
        this.onDurationUpdated=this.onDurationUpdated.bind(this);
        this.onTitleUpdated=this.onTitleUpdated.bind(this);
    }
    
    onDurationUpdated(index, duration){
      var item = {
        rowIndex: this.props.id,
        itemIndex: index,
        duration: duration 
      }

      this.props.rowUpdated((item))
    }

    onPositionUpdated(index, dimensions){

      var item = {
        rowIndex: this.props.id,
        itemIndex: index,
        dimensions: dimensions 
      }
      this.props.rowUpdated((item))
    }

    onTitleUpdated(index, title){
      var item = {
        rowIndex: this.props.id,
        itemIndex: index,
        title: title
      }
      this.props.rowUpdated((item))
    }

    render() {
      var style = {
        borderBottom: '1px solid #eee', 
        position: 'relative', 
        height: this.props.threads * this.props.grid.y,
        width: this.props.grid.width
      }
            
      return <div style={{display: 'flex'}}>
              <div className={styles.filter} style={{display: 'flex', flexShrink: 0, width: this.props.grid.filterOffset}}>
                <img src={this.props.imgUrl} className={styles.roundAvatar} alt={this.props.title} />

                <div className={styles.title}>
                <h5>{this.props.title}</h5>
                <h6>{this.props.subtitle}</h6>
                </div>
              </div>
              <div className={styles.scheduleRow + ' schedule-row'} id={this.props.id} onDoubleClick={this.props.onRowClicked} style={style}>{this.props.items.map((item, i)=>{
                return <ScheduleItem
                          weeks={this.props.weeks}
                          color={item.color} 
                          grid={this.props.grid} 
                          key={i} 
                          onPositionUpdated={this.onPositionUpdated} 
                          onDurationUpdated={this.onDurationUpdated} 
                          onTitleUpdated={this.onTitleUpdated} 
                          id={i} 
                          title={item.title} 
                          days={item.days} 
                          startDate={item.startDate} 
                          thread={item.thread}/>
              })}
            </div>
          </div>;
    }
  }

export default ScheduleRow;
