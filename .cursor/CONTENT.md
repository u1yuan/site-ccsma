# Content Inventory and Provenance

This file is the source of truth for all copy on the site. Every block of official FEU Tech text is captured verbatim here with its source URL, so a writer or reviewer can verify fidelity without re-scraping the live pages. Application code must read from typed modules in `src/content/` that mirror this file.

## The `PLACEHOLDER:` convention

Any content block still tagged `status: "placeholder"` in `src/content/` must render a visible "Content coming soon" note rather than looking like real copy. A placeholder must never ship to a public URL looking official. When an org supplies officially blessed copy, replace the block, set `status: "official"`, drop the "Community description" label, and add the source to this file.

The five organization entries are **not** placeholders. They carry `status: "summary"` compiled community descriptions (see below).

---

## Programs — Route `/`

Source for all six: <https://www.feutech.edu.ph/academics/ccsma> — captured verbatim, order preserved.

The programs hero also shows an accreditation strip (PAASCU, PICAB, Cisco, SAP, Oracle Academy, MIE, AutoCAD) as text chips until PNGs are added under `/logos/accreditation/`. Do not assert accreditations beyond those labels.

### Bachelor of Science in Computer Science (BSCS)

> Includes the study of computing concepts and theories, algorithmic foundations, and new developments in computing. The program prepares students to design and create algorithmically complex software and develop new and effective algorithms for solving computing problems. Graduates of this program can expect a successful and rewarding career in specification design, coding, and software testing. It also focuses on software engineering, database, and large-scale software.

### Bachelor of Science in Information Technology (BSIT)

> The study of the use of computers and computer software to plan, install, customize, operate, manage, administer, and maintain information technology infrastructure. The program also deals with the study of design, development, and implementation of solutions that integrate information technology into businesses and organizations. It aims to prepare students to be IT professionals, well-versed in IT infrastructure development and administration, and experts in systems design and development for implementation in an organization.

### Bachelor of Multimedia Arts (BMMA)

> The program aligns itself with the rapid convergence of media technologies and practices by developing conceptual, technical, aesthetic, and professional competencies for effective, critical, and innovative storytelling.

### Bachelor of Science in Cybersecurity (BSCY)

> The program is designed to provide students with a comprehensive education in the principles and practices of cybersecurity, covering fundamental concepts of computer systems, networks, and software. As well as advanced topics in cybersecurity, including threat analysis, risk management, and incident response.

### Bachelor of Digital Marketing and Management (BDMM)

> The program focuses on developing students' skills in planning, designing, and executing digital marketing campaigns while ensuring adherence to ethical standards, data privacy, and sustainability.

### Bachelor of Science in Financial Technology Engineering (BSFTE)

> This program integrates finance, technology, and engineering principles to develop cutting-edge financial solutions. It covers blockchain, artificial intelligence (AI) in finance, cybersecurity, data analytics, and financial systems engineering, preparing students to create secure, efficient, and innovative financial products.

---

## Organizations — Route `/organizations`

The four CCSMA-affiliated academic RSOs are the **Association for Computing Machinery (ACM)**, **Alliance of Information Technology Students (AITS)**, **Junior Philippine Computer Society (JPCS)**, and **PRISM — Pioneers of Relentless and Innovative Storytellers in Multimedia Arts** (the multimedia arts org). The **Student Coordinating Council (SCC)** is FEU Tech's highest governing student body.

All five entries carry `status: "summary"`: compiled from public sources (org Facebook/Instagram pages and FEU Tech pages), **not** verbatim official FEU copy. Each card shows a quiet **Community description** provenance label. Do not present this copy as FEU's official text. If a specific org is later officially blessed, set that entry to `status: "official"` and drop the label.

Logo files live under `/logos/orgs/` (e.g. `/logos/orgs/acm.png`) and are added by hand with the orgs' permission. Until a `logo` path is set, the card renders a themed monogram fallback. Do not scrape or invent logos.

Each org also has a detail route `/organizations/<id>/` (acm, aits, jpcs, prism, scc) with the same copy plus empty activity-photo and directors galleries from `src/content/media.ts`. Those manifests start empty; the UI shows a "Photos coming soon" panel until the human adds `{ src, alt }` entries. Invent no director names or titles.

SCC's motto "Serve. Lead. Excel." is the same institutional language SADU already carries on `/student-activities`. Both surface it by design.

### Association for Computing Machinery — FEU Tech Student Chapter (ACM)

> Driven by innovation and united by passion, the FEU Tech ACM Student Chapter is a recognized student organization that stands as the mother organization of the Computer Science department of the institution and the Philippines' second internationally accredited ACM student chapter — empowering students to explore their passion for technology, spark innovation, and shape the future, one line of code at a time.

Mission:

> Organized and operated exclusively for educational and scientific purposes: to promote increased knowledge of and greater interest in the science, design, development, construction, languages, management, and applications of modern computing; to foster greater interest in computing and its applications; and to provide a means of communication between persons interested in computing.

Vision:

> To help students become future-ready and grow both academically and personally by creating platforms that develop technical skills, foster innovation, and build confidence in real-world applications — being the voice of the students, opening opportunities inside and outside the school, and growing ACM as a strong, supportive community of learners and future professionals.

Values: Aptitude, Competence, Magnanimity.

### Alliance of Information Technology Students (AITS)

> The Alliance of Information Technology Students (AITS) is the official academic organization for IT students at the FEU Institute of Technology. Established in 2014, AITS creates an inclusive space for growth by offering technical seminars, coding challenges, and peer-led tutorials. Driven by its mission to empower student growth and its vision to foster a passion-driven IT community, the organization shapes future-ready tech leaders while upholding the university values of Fortitude, Excellence, and Uprightness.

### Junior Philippine Computer Society — FEU Tech (JPCS)

> The Junior Philippine Computer Society – FEU Tech (JPCS–FEU Tech) is the student chapter of the national Philippine Computer Society. Recognized as one of the oldest student organizations at the FEU Institute of Technology, it serves students in IT, Computer Science, Multimedia Arts, and Engineering, bridging classroom knowledge, industry standards, and emerging technologies through real-world networking, hackathons, and corporate partnerships.

Mission:

> To enhance the knowledge, leadership, and technical skills of the youth in Information and Communication Technology (ICT), providing the critical, complementary real-life experiences needed to shape students into world-class IT professionals.

Vision:

> To bridge academic knowledge with industry demand, building a deeply connected community where students and industry partners actively collaborate on technological advancements.

### PRISM — Pioneers of Relentless and Innovative Storytellers in Multimedia Arts

> The Pioneers of Relentless and Innovative Storytellers in Multimedia Arts (PRISM) is the official academic organization of the Multimedia Arts Department at the FEU Institute of Technology. Serving students majoring in animation and digital film, PRISM is a creative hub that connects freshmen and senior student-artists — helping them navigate their art journeys, master creative tools, and showcase visual storytelling.

Mission:

> Empowering multimedia arts students to push creative boundaries and master digital landscapes across graphic design, photography, video, and animation.

Vision:

> Fostering an inventive, highly collaborative artistic ecosystem.

Motto: Beyond Mastery, Magnifying Artistry.

### Student Coordinating Council (SCC)

> The FEU Tech Student Coordinating Council (SCC) is the highest governing student body and the official student representative at the FEU Institute of Technology. Run by student leaders, it serves as the voice of the student body — bridging the gap between the university administration and the learners, and overseeing the Recognized Student Organizations on campus.

Mission:

> To foster a progressive campus environment where critical thinking prevails, uniting the student population to assert student rights and systematically address welfare concerns.

Vision:

> To build an empowered community of principled servant leaders through student-led activities, leadership initiatives, and civic service projects.

Motto: Serve. Lead. Excel.

Roster source for the organization names: <https://www.feutech.edu.ph/campus_life/so> (recognized RSO list) and CCSMA program affiliation at <https://www.feutech.edu.ph/academics/ccsma>. Body copy is compiled from public org and campus sources, not those two pages verbatim.

---

## Student Activities and Development Office — Route `/student-activities`

Source for all blocks: <https://www.feutech.edu.ph/campus_life/sa> — captured verbatim.

### Vision

> Is a recognized premier provider of holistic development programs that produce effective, dynamic, transformational and innovative leaders of the society.

### Mission

> To mold innovative leaders who are guided by values of Fortitude, Excellence and Uprightness.
> To conduct exemplary programs for student development.
> To provide opportunities in the aspects of academic excellence, leadership, community service, diversity and innovation.

### Roles and Function

> The Student Activities and Development Unit (SADU) develops students to become effective leaders, efficient followers to other cognizant of their talents and skills and put these in productive endeavors not only in school but also in the community where they live. These shall be realized through students' active participation in co-curricular and extra-curricular activities.
>
> The unit allows the students to practice, discover, develop, and impart their talents and yearnings. It is through commitment in student activities that students get to live-out leadership in areas that cater to personal passions, that empower peers, and that uplift conditions of those in need.
>
> While in pursuit of these, significant support from the community is given to students and a strong sense of responsibility is expected of them. This will encourage and safeguard order and accord, as well as identify various support systems that aid in the successful achievement of students' desires.

### Student Development programs

> Holistic Development; Leadership Training Seminar; Efficiency Training; SADU sponsored Training and Seminars; RSO sponsored Seminars and Trainings; Personality enhancement; Athletics

### Student Activities responsibilities

> Grant, renew, and revoke accreditation of organizations; Recognition of organization advisers; Approval of student activities; Approval of postings on social media; Selection of contingencies to national conventions and conferences

### The Mantra — Serve / Lead / Excel

Present the mantra as three labeled sections: **Serve**, **Lead**, **Excel**. Keep the three labels verbatim. For each section, use its verbatim lead sentence from the source page as the section headline, and summarize the remaining long-form paragraph as concise supporting copy marked `status: "summary"`. Do not paraphrase the three labels themselves, and do not invent FEU claims in the summaries — stay faithful to the source's meaning.

#### Serve

Label: **Serve**

Headline (verbatim lead sentence):

> Programs of the Student Activities and Development is gearing toward creating a community of leaders who are passionate, proactive, innovative and ever ready to be of service to others.

#### Lead

Label: **Lead**

Headline (verbatim lead sentence):

> Leaders are hard to find.

#### Excel

Label: **Excel**

Headline (verbatim lead sentence):

> FEU TECH student leaders are expected to imbibe excellence in their personal lives.

### Contact block (verbatim, must appear exactly)

- Room 1501
- Office Hours: Monday to Friday, 8:00 a.m. – 5:00 p.m.
- Trunkline: (02) 8281 8888 Local 128
- Email: sadu@feutech.edu.ph
- Address: P. Paredes St., Sampaloc, Manila 1015

The Student Development programs list items are keyboard-openable illustration triggers (`programIllustrations` in `src/content/media.ts`). GlowTree lights on the org and SADU heroes open `activityMedia` panels. Both manifests start empty. A directors gallery on this route and on each org detail page is also empty until the human supplies names, titles, and photos. Do not invent SADO details beyond this file.
