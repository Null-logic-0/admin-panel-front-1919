import styles from "./ArtistUserInfoCard.module.scss";
import Image from "next/image";

type Props = {
  image: string;
  userName: string;
};

const ArtistUserInfoCard = ({ image, userName}: Props) => {
  return (
    <div className={styles.container}>
      <Image src={image} width={48} height={48} alt={"Image"} />

      <div>
        <span className={styles.txt}>{userName}</span>
      </div>
    </div>
  );
};

export default ArtistUserInfoCard;
