import dateFormat from "dateformat";

const REGEX = "dddd, mmmm d, yyyy";

class DateUtil {
    static getCurrentTime = () => {  
      let time = dateFormat(new Date(), REGEX);
      return time;
    }  
  }

  export default DateUtil