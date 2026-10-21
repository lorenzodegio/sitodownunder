import { Foglie } from "@/components/Foglie";
import { homeFaq } from "@/data/faq";

export function Faq() {
  return (
    <section id="faq" className="chapter chapter-paper" aria-labelledby="faq-title">
      <Foglie where="faq" />
      <div className="chapter-wrap chapter-stack">
        <div className="chapter-intro">
          <span className="kicker">capitolo VI · domande frequenti</span>
          <h2 id="faq-title" className="display">
            Domande frequenti
          </h2>
        </div>
        <div className="faq-grid">
          {homeFaq.map((item) => (
            <article key={item.q} className="faq-card">
              <span aria-hidden="true">?</span>
              <div>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
