import Artist from "../Components/Artist/Artist";
import AuthGuard from "../Components/AuthGuard/AuthGuard";
import styles from "./page.module.css";


export default function Home() {

  return (
    <AuthGuard>
      <main>
        <Artist />
      </main>
    </AuthGuard>

  );
}
