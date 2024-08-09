import Link from 'next/link';
import styles from './NavItem.module.scss';
import Image from 'next/image'

type navitemProps = {
    link:string;
    iconSrc:string;
    text:string;
    classname:string;

  };
const NavItem =({link,iconSrc,text,classname}:navitemProps)=>{
    
    return (
        <li className={styles.navItem}>
            <Link href={link} passHref
              className={`${styles.navLink} ${classname}`}>
              <Image
                src={iconSrc}
                alt={text || "Link icon"}
                width={32}
                height={32}
                className={styles.navIcon}
              />
              {text}
            </Link>
          </li>
    )
}

export default NavItem;