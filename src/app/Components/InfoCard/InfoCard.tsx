import styles from "./InfoCard.module.scss";
import Image from "next/image";

type Props = {
  image: string;
  playlistName: string;
  artistName: string;
};

const InfoCard = ({ image, playlistName, artistName }: Props) => {
  return (
    <div className={styles.container}>
      <Image src={image} width={138} height={138} alt={"Image"} />

      <div className={styles.CardInfo}>
        <span className={styles.txt1}>{playlistName}</span>
        <span className={styles.txt2}>{artistName}</span>
      </div>
    </div>
  );
};

export default InfoCard;
