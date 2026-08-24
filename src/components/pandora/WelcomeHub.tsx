import Link from "next/link";

const hubCards = [
  {
    href: "/programs/",
    eyebrow: "Academics",
    title: "Explore the programs",
    blurb:
      "Six degree programs across computing, media, cybersecurity, marketing, and financial technology — with Computer Science offering Data Science, Artificial Intelligence, and Software Engineering tracks.",
    cta: "Find your degree",
  },
  {
    href: "/organizations/",
    eyebrow: "Community",
    title: "Meet your organizations",
    blurb:
      "ACM, AITS, JPCS, and PRISM are the student organizations under CCSMA, connected by the Student Coordinating Council. This is the community you can join.",
    cta: "Meet the orgs",
  },
  {
    href: "/student-activities/",
    eyebrow: "Student life",
    title: "Get involved with SADU",
    blurb:
      "The Student Activities and Development Unit runs leadership training, development programs, and events that shape you beyond the classroom.",
    cta: "See student activities",
  },
];

const essentials = [
  {
    label: "Academic calendar",
    value: "FEU Tech runs on a trimester system — three terms each year.",
  },
  {
    label: "Core values",
    value: "Fortitude · Excellence · Uprightness.",
  },
  {
    label: "The college",
    value: "6 degree programs and 4 student organizations under one CCSMA.",
  },
  {
    label: "Where to find us",
    value: "FEU Tech, P. Paredes St., Sampaloc, Manila.",
  },
];

export function WelcomeHub() {
  return (
    <section id="story-start" className="hub" aria-label="Explore CCSMA">
      <ul className="hub__cards">
        {hubCards.map((card) => (
          <li key={card.href}>
            <Link className="hub-card" href={card.href}>
              <p className="utility-label">{card.eyebrow}</p>
              <h2>{card.title}</h2>
              <p className="hub-card__blurb">{card.blurb}</p>
              <span className="hub-card__cta">
                {card.cta}
                <span aria-hidden="true"> →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="freshie">
        <p className="utility-label">New here? Freshie essentials</p>
        <dl className="freshie__grid">
          {essentials.map((item) => (
            <div key={item.label} className="freshie__item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
