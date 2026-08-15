import type { ContentStatus, SourceAttribution } from "./types";

export const saduSource: SourceAttribution = {
  label: "FEU Tech Student Activities page",
  url: "https://www.feutech.edu.ph/campus_life/sa",
};

export const sadu = {
  vision:
    "Is a recognized premier provider of holistic development programs that produce effective, dynamic, transformational and innovative leaders of the society.",
  mission: [
    "To mold innovative leaders who are guided by values of Fortitude, Excellence and Uprightness.",
    "To conduct exemplary programs for student development.",
    "To provide opportunities in the aspects of academic excellence, leadership, community service, diversity and innovation.",
  ],
  roles: [
    "The Student Activities and Development Unit (SADU) develops students to become effective leaders, efficient followers to other cognizant of their talents and skills and put these in productive endeavors not only in school but also in the community where they live. These shall be realized through students' active participation in co-curricular and extra-curricular activities.",
    "The unit allows the students to practice, discover, develop, and impart their talents and yearnings. It is through commitment in student activities that students get to live-out leadership in areas that cater to personal passions, that empower peers, and that uplift conditions of those in need.",
    "While in pursuit of these, significant support from the community is given to students and a strong sense of responsibility is expected of them. This will encourage and safeguard order and accord, as well as identify various support systems that aid in the successful achievement of students' desires.",
  ],
  developmentPrograms: [
    "Holistic Development",
    "Leadership Training Seminar",
    "Efficiency Training",
    "SADU sponsored Training and Seminars",
    "RSO sponsored Seminars and Trainings",
    "Personality enhancement",
    "Athletics",
  ],
  activityResponsibilities: [
    "Grant, renew, and revoke accreditation of organizations",
    "Recognition of organization advisers",
    "Approval of student activities",
    "Approval of postings on social media",
    "Selection of contingencies to national conventions and conferences",
  ],
  mantras: [
    {
      label: "Serve",
      headline:
        "Programs of the Student Activities and Development is gearing toward creating a community of leaders who are passionate, proactive, innovative and ever ready to be of service to others.",
      summary:
        "Service is the foundation of the unit's leadership training, teaching student leaders that success comes from contributing to others.",
      status: "summary" as Extract<ContentStatus, "summary">,
    },
    {
      label: "Lead",
      headline: "Leaders are hard to find.",
      summary:
        "The unit develops decision-makers who attract willing followers through charisma and vision, not hierarchy alone.",
      status: "summary" as Extract<ContentStatus, "summary">,
    },
    {
      label: "Excel",
      headline:
        "FEU TECH student leaders are expected to imbibe excellence in their personal lives.",
      summary:
        "Excellence is a core university value expressed through vision, collaboration, communication, accountability, and an innovative mindset.",
      status: "summary" as Extract<ContentStatus, "summary">,
    },
  ],
  contact: {
    room: "Room 1501",
    hours: "Office Hours: Monday to Friday, 8:00 a.m. – 5:00 p.m.",
    trunkline: "Trunkline: (02) 8281 8888 Local 128",
    email: "Email: sadu@feutech.edu.ph",
    address: "Address: P. Paredes St., Sampaloc, Manila 1015",
  },
} as const;
