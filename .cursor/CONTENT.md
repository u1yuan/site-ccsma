# Content Inventory and Provenance

This file is the source of truth for all copy on the site. Every block of official FEU Tech text is captured verbatim here with its source URL, so a writer or reviewer can verify fidelity without re-scraping the live pages. Application code must read from typed modules in `src/content/` that mirror this file.

## The `PLACEHOLDER:` convention

FEU Tech does not publish official descriptions for the four CCSMA-affiliated RSOs (ACM, AITS, JPCS, PRISM) or the Student Coordinating Council on the CCSMA or SADU pages. Until the organizations or SADU supply real copy, their entries are placeholders.

Any placeholder block in `src/content/` must be wrapped in an object whose `status` field is `"placeholder"`, and the rendered site must show a visible "Content coming soon" note rather than the placeholder text. A placeholder must never ship to a public URL looking like real copy. When an org supplies official copy, replace the block, set `status: "official"`, and add the source to this file.

---

## Programs — Route `/`

Source for all six: <https://www.feutech.edu.ph/academics/ccsma> — captured verbatim, order preserved.

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

All five entries below are `PLACEHOLDER:` — no official copy exists on the source pages. Each must carry `status: "placeholder"` and a "Content coming soon" render note.

- `PLACEHOLDER:` ACM — FEU Tech student chapter of the Association for Computing Machinery, the computing society. Await official description.
- `PLACEHOLDER:` AITS — Alliance of Information Technology Students, the academic org for the IT program. Await official description.
- `PLACEHOLDER:` JPCS — Junior Philippine Computer Society, FEU Tech chapter. Await official description.
- `PLACEHOLDER:` PRISM — Pioneers of Relentless and Innovative Storytellers in Multimedia Arts, the BMMA academic org. Await official description.
- `PLACEHOLDER:` SCC — Student Coordinating Council, the highest governing student body of FEU Tech and official representative of its students. Await official description.

Roster source for the organization names: <https://www.feutech.edu.ph/campus_life/so> (recognized RSO list) and CCSMA program affiliation at <https://www.feutech.edu.ph/academics/ccsma>.

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
