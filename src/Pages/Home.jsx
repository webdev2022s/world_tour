import styles from "../Pages/Home.module.css";
import Logo from "../Components/Logo";
import { Link } from "react-router-dom";
import PageNav from "../Components/PageNav";
export default function Home() {
  return (
    <>
      <main className={styles.homepage}>
        <PageNav />
        <section>
          <Logo />
          <h1>
            My Travel List of the World
            <br />
            World Tour keeps track of you adventures.
          </h1>
          <h2>
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends
            how you have wandered the world.
          </h2>
          <Link to="/world_tour/login" className="cta">
            Start The App
          </Link>
        </section>
      </main>
    </>
  );
}
