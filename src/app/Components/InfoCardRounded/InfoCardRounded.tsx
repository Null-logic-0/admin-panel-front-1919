import styles from "./InfoCardRounded.module.scss";
import Image from "next/image";

type Props = {
  image: string;
  UserName: string;
};

const InfoCardRounded = ({ image, UserName }: Props) => {
  return (
    <div className={styles.container}>
      <Image src={image} width={48} height={48} alt={"Image"} />

      <div>
        <span className={styles.txt2}>{UserName}</span>
      </div>
    </div>
  );
};

export default InfoCardRounded;
