import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Moment from "moment";
const localizer = momentLocalizer(Moment);

const MainCalenderSchedule = (props) => {
  return (
    <div>
      <BigCalendar {...props} localizer={localizer} />
    </div>
  );
};

export default MainCalenderSchedule;
