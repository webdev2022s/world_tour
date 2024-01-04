import PageNav from "../Components/PageNav";
import styles from "../Pages/Pricing.module.css";
export default function Pricing() {
  return (
    <main className={styles.pricing}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple Pricing
            <br />
            Just $9/month
          </h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt,
            delectus reprehenderit esse beatae culpa mollitia tempore.
            Voluptatum, neque dolore, natus magni rerum ad eum, mollitia dolor
            dicta iusto doloremque unde!
          </p>
        </div>
        <img src="img-2.jpg" alt="view of a large city" className="image" />
      </section>
    </main>
  );
}
