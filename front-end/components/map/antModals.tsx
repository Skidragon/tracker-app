import {Modal} from "antd";

const confirm = Modal.confirm;
function showConfirmModal(
  title: string,
  description: string,
  okCb,
  okArgs: [],
  cancelCb,
  cancelArgs: [],
) {
  confirm({
    title,
    content: description,
    onOk() {
      if (okCb) {
        okCb(...okArgs);
      }
    },
    onCancel() {
      if (cancelCb) {
        cancelCb(...cancelArgs);
      }
    },
  });
}

export {showConfirmModal};
