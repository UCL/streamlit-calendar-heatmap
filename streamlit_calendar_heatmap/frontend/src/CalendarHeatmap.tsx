import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import React, { ReactNode } from "react"

import 'react-calendar-heatmap/dist/styles.css';
import './streamlit-calendar-heatmap.css'

class StreamlitCalendarHeatmap extends StreamlitComponentBase {
  getTooltipDataAttrs = (value: { date: any; count: any; tooltip: any;}) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return null;
    }
    if (value.tooltip) {
      return {
        'data-tip': `${value.tooltip}`,
      };
    }
    else if (value.count) {
      return {
        'data-tip': `${value.date} has count: ${value.count}`,
      };
    } else {
      return {
        'data-tip': `${value.date}`,
      };
    }
  };

  getClassForValue = (value: { selected: any; date: any; }) => {
    if (!value) {
      return 'color-empty';
    }
    else if (value.selected) {
      return 'color-selected';
    } else {
      return 'color-filled';
    }
  }

  handleClick = (value: any) => {
    if (value) {
      if (!value.selected) {
        value.selected = true
      } else {
        value.selected = false
      }
      Streamlit.setComponentValue(value);
    }
  };

/*   componentDidMount() {
    var rects = document.querySelectorAll('.react-calendar-heatmap rect')

    Array.from(rects).forEach(function(rect) {
        rect.addEventListener('click', (evt => {
          if (evt.target) {
            const target = evt.target as Element;
            if (target.classList.contains('color-filled')) {
              target.classList.replace('color-filled','color-selected')
            } else if (target.classList.contains('color-selected')) {
              target.classList.replace('color-selected','color-filled')
            };
          };
        }));
    })
  } */

  public render = (): ReactNode => {
      const values = this.props.args["values"]
      const startDate = this.props.args["start_date"]
      const endDate = this.props.args["end_date"]
      return (
        <div>
          <CalendarHeatmap 
            startDate={startDate}
            endDate={endDate}
            values={values}
            onClick={this.handleClick}
            tooltipDataAttrs={this.getTooltipDataAttrs}
            classForValue={this.getClassForValue}
          />
          <ReactTooltip 
            multiline={true}
          />
        </div>
      )
  }
}

export default withStreamlitConnection(StreamlitCalendarHeatmap)
