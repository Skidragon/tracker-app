import {Card, Icon, Avatar} from "antd";

const {Meta} = Card;

interface Props {
  title: string;
  description: string;
  avatarImg: string;
  imageCoverSrc: string;
  isArchived: boolean;
}

const TripCard: React.SFC<Props> = ({
  title,
  description,
  avatarImg,
  imageCoverSrc,
  isArchived,
}) => {
  return (
    <Card
      style={{width: 300}}
      cover={<img alt="" src={imageCoverSrc} />}
      actions={[<Icon type={isArchived ? "import" : "folder"} />]}
    >
      <Meta
        avatar={<Avatar src={avatarImg} />}
        title={title}
        description={description}
      />
    </Card>
  );
};

export default TripCard;
