import Image from "next/image";
import styles from './AlbumPlaylistInfoCard.module.scss'

type Props = {
  image: string;
  playlistName: string;
  artistName: string;
};

const AlbumPlaylistInfoCard = ({ image, playlistName, artistName }: Props) => {
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

export default AlbumPlaylistInfoCard;
