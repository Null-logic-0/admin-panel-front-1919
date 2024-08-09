import styles from "./ArtistUserInfoCard.module.scss";
import Image from "next/image";

type Props = {
  image: string;
  UserName: string;
};

const ArtistUserInfoCard = ({ image, UserName}: Props) => {
  return (
    <div className={styles.container}>
      <Image src={image} width={48} height={48} alt={"Image"} />

      <div>
        <span className={styles.txt}>{UserName}</span>
      </div>
    </div>
  );
};

export default ArtistUserInfoCard;
