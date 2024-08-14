import styles from "./ArtistUserInfoCard.module.scss";
import Image from "next/image";

type Props = {
  image: string;
  firstName: string;
  lastName:string;
};

const ArtistUserInfoCard = ({ image, firstName,lastName}: Props) => {
  return (
    <div className={styles.container}>
      <Image src={image} width={48} height={48} alt={"Image"} />

      <div>
        <span className={styles.txt}>{ `${firstName} ${lastName}`}</span>
      </div>
    </div>
  );
};

export default ArtistUserInfoCard;
