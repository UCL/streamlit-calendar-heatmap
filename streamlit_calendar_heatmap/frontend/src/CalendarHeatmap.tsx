import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import React, { ReactNode } from "react"

import 'react-calendar-heatmap/dist/styles.css';

class StreamlitCalendarHeatmap extends StreamlitComponentBase {
  getTooltipDataAttrs = (value: { date: any; count: any; }) => {
    // Temporary hack around null value.date issue
    if (!value || !value.date) {
      return null;
    }
    if (value.count) {
      return {
        'data-tip': `${value.date} has count: ${value.count}`,
      };
    } else {
      return {
        'data-tip': `${value.date}`,
      };
    }
  };

  handleClick = (value: any) => {
    if (value) {
      Streamlit.setComponentValue(value);
    }
  };

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
          />
          <ReactTooltip />
        </div>
      )
  }
}

export default withStreamlitConnection(StreamlitCalendarHeatmap)
