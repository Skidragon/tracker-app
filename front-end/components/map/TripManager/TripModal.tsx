import TripFilter from "./TripFilter";
import {Modal} from "antd";
import TripCard from "./TripCard";
interface Trip {
  title: string;
  description: string;
  avatarImg: string;
  imageCoverSrc: string;
  isArchived: boolean;
}
interface Props {
  isModalVisible: boolean;
  setIsModalVisible: Function;
  trips: Trip[];
}

const TripModal: React.SFC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  trips,
}) => {
  return (
    <Modal
      title="Trips"
      visible={isModalVisible}
      onOk={() => {
        setIsModalVisible(false);
      }}
      onCancel={() => setIsModalVisible(false)}
    >
      <TripFilter />
      {trips.length
        ? trips.map(trip => {
            return (
              <TripCard
                title={trip.title}
                description={trip.description}
                avatarImg={trip.avatarImg}
                imageCoverSrc={trip.imageCoverSrc}
                isArchived={trip.isArchived}
              />
            );
          })
        : null}
    </Modal>
  );
};

export default TripModal;
