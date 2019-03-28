import {DatePicker} from "antd";
import {useContext} from "react";
import MapContext from "../../context/MapContext";
interface ArrivalDatePickerProps {}

const ArrivalDatePicker: React.SFC<ArrivalDatePickerProps> = () => {
  // const { dateAndTime, setDateAndTime } = useContext(Context);
  const {activeMarker, setMarkerDate} = useContext(MapContext);

  function onChange(value: object, dateString: string) {
    console.log(typeof value, typeof dateString);
    setMarkerDate(activeMarker, value);
  }
  function onOk(value: object) {
    setMarkerDate(activeMarker, value);
  }
  return (
    <DatePicker
      // disabledDate={false}
      onChange={onChange}
      showTime
      format="YYYY-MM-DD HH:mm:ss"
      value={activeMarker.date}
      onOk={onOk}
      placeholder="Input Arrival Date"
    />
  );
};

export default ArrivalDatePicker;
