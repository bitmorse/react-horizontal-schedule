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
        this.onColorUpdated=this.onColorUpdated.bind(this);
        this.onRemoved=this.onRemoved.bind(this);
    }


    onRemoved(index){
      var item = {
        rowId: this.props.id,
        itemIndex: index
      }
      this.props.itemRemoved((item))
      this.setState({})
    }
    
    onDurationUpdated(index, duration){
      var item = {
        rowId: this.props.id,
        itemIndex: index,
        duration: duration 
      }

      this.props.rowUpdated((item))
    }

    onPositionUpdated(index, dimensions){

      var item = {
        rowId: this.props.id,
        itemIndex: index,
        dimensions: dimensions 
      }
      this.props.rowUpdated((item))
    }

    onTitleUpdated(index, title){
      var item = {
        rowId: this.props.id,
        itemIndex: index,
        title: title
      }
      this.props.rowUpdated((item))
    }

    onColorUpdated(index, color){
      var item = {
        rowId: this.props.id,
        itemIndex: index,
        color: color
      }
      this.props.rowUpdated((item))
    }

    render() {
      var style = {
        borderBottom: '1px solid #eee', 
        position: 'relative', 
        height: this.props.threads * this.props.grid.y,
        width: this.props.grid.width,
        backgroundSize: this.props.grid.x+'px 100%',
        left: this.props.grid.filterOffset
      }
      
      return <div style={{display: 'flex'}}>
              <div className={styles.filter} style={{display: 'flex', flexShrink: 0, width: this.props.grid.filterOffset}}>
                <img src={this.props.imgUrl} className={styles.roundAvatar} alt={this.props.title} />

                <div className={styles.title}>
                <h5>{this.props.title}</h5>
                <h6>{this.props.subtitle}</h6>
                </div>
              </div>
              <div style={style} className={styles.scheduleRow + ' schedule-row'} id={this.props.id} onDoubleClick={this.props.onRowClicked}>{this.props.items.map((item, i)=>{
                return <ScheduleItem
                          weeks={this.props.weeks}
                          color={item.color} 
                          grid={this.props.grid} 
                          key={i} 
                          onPositionUpdated={this.onPositionUpdated} 
                          onDurationUpdated={this.onDurationUpdated} 
                          onTitleUpdated={this.onTitleUpdated} 
                          onColorUpdated={this.onColorUpdated} 
                          onRemoved={this.onRemoved} 
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
