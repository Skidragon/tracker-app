import {Form, Input} from "antd";
import {useState} from "react";

interface Props {
  form: {
    getFieldDecorator: Function;
    validateFields: Function;
    getFieldValue: Function;
  };
}
interface InputEventTarget {
  target: {name: string; value: string};
}
const FinishTripForm: React.SFC<Props> = ({form}) => {
  const {getFieldDecorator} = form;
  const [tripInfo, setTripInfo] = useState({
    title: "",
    description: "",
  });
  const TRIP_NAME_MAX_LEN = 25;
  const changeInputHandler = (e: InputEventTarget) => {
    setTripInfo({...tripInfo, [e.target.name]: e.target.value});
  };
  return (
    <Form style={{width: "100%"}}>
      <Form.Item
        label={`Trip Name - ${TRIP_NAME_MAX_LEN -
          tripInfo.title.length} characters left`}
      >
        {getFieldDecorator("trip-title", {
          rules: [
            {
              required: true,
              message: "Please input a title.",
            },
            {
              message: `Please keep the length to ${TRIP_NAME_MAX_LEN} characters.`,
              max: TRIP_NAME_MAX_LEN,
            },
          ],
        })(
          <Input
            placeholder="Enter Title of Trip"
            name="title"
            onChange={changeInputHandler}
            maxLength={TRIP_NAME_MAX_LEN}
          />,
        )}
      </Form.Item>
      <Form.Item label="Trip Description">
        {getFieldDecorator("trip-description", {
          rules: [
            {
              required: false,
            },
          ],
        })(
          <Input
            placeholder="Enter description of trip - optional"
            name="description"
            onChange={changeInputHandler}
          />,
        )}
      </Form.Item>
    </Form>
  );
};
const WrappedFinishTripForm = Form.create({name: "finish-trip-form"})(
  FinishTripForm,
);

export default WrappedFinishTripForm;
