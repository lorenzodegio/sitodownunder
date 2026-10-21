import { homeFaq } from "@/data/faq";

export function Faq() {
  return (
    <div className="faq-block" id="faq">
      <h2 className="display faq-title">Domande frequenti</h2>
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
  );
}
