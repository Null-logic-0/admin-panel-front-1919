import { ReactNode } from "react";
import styles from './layout.module.scss';
import Header from "../Components/Header/Header";
import Navigation from "../Components/NavMenu/Navigation/Navigation";

type Props = {
    children: ReactNode

}

const AuthLayout = (props: Props) => {
    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.container}>
                <div className={styles.nav}>
                    <Navigation />
                </div>
                <div className={styles.content}>
                    {props.children}
                </div>



            </div>


        </div>
    )
}

export default AuthLayout;