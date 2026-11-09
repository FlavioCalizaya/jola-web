export type NavChild = {
  key: string;
  href: string;
};

export type PrimaryNavItem = {
  key: "about" | "academics" | "life" | "admissions" | "stories";
  href: string;
  children?: NavChild[];
};

export const primaryNav: PrimaryNavItem[] = [
  {
    key: "about",
    href: "/about",
    children: [
      { key: "philosophy", href: "/about#philosophy" },
      { key: "mission", href: "/about#mission-vision" },
      { key: "values", href: "/about#values" },
      { key: "team", href: "/about#team" },
      { key: "history", href: "/about#history" },
    ],
  },
  {
    key: "academics",
    href: "/academics",
    children: [
      { key: "earlyYears", href: "/academics#early-years" },
      { key: "elementary", href: "/academics#elementary" },
      { key: "middleSchool", href: "/academics#middle-school" },
      { key: "highSchool", href: "/academics#high-school" },
      { key: "steam", href: "/academics#steam" },
      { key: "english", href: "/academics#english" },
      { key: "technology", href: "/academics#technology" },
    ],
  },
  {
    key: "life",
    href: "/life-at-jola",
    children: [
      { key: "campus", href: "/life-at-jola#campus" },
      { key: "sports", href: "/life-at-jola#sports" },
      { key: "arts", href: "/life-at-jola#arts" },
      { key: "music", href: "/life-at-jola#music" },
      { key: "clubs", href: "/life-at-jola#clubs" },
      { key: "equestrian", href: "/life-at-jola#equestrian" },
      { key: "stallions", href: "/life-at-jola#stallions" },
    ],
  },
  {
    key: "admissions",
    href: "/admissions",
    children: [
      { key: "process", href: "/admissions#process" },
      { key: "requirements", href: "/admissions#requirements" },
      { key: "bookVisit", href: "/admissions/book-a-visit" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    key: "stories",
    href: "/stories",
  },
];

export const footerColumns = [
  {
    key: "about",
    links: [
      { key: "philosophy", href: "/about#philosophy" },
      { key: "mission", href: "/about#mission-vision" },
      { key: "values", href: "/about#values" },
      { key: "team", href: "/about#team" },
      { key: "history", href: "/about#history" },
    ],
  },
  {
    key: "academics",
    links: [
      { key: "earlyYears", href: "/academics#early-years" },
      { key: "elementary", href: "/academics#elementary" },
      { key: "middleSchool", href: "/academics#middle-school" },
      { key: "highSchool", href: "/academics#high-school" },
      { key: "steam", href: "/academics#steam" },
      { key: "english", href: "/academics#english" },
      { key: "technology", href: "/academics#technology" },
    ],
  },
  {
    key: "life",
    links: [
      { key: "campus", href: "/life-at-jola#campus" },
      { key: "sports", href: "/life-at-jola#sports" },
      { key: "arts", href: "/life-at-jola#arts" },
      { key: "music", href: "/life-at-jola#music" },
      { key: "clubs", href: "/life-at-jola#clubs" },
      { key: "equestrian", href: "/life-at-jola#equestrian" },
      { key: "stallions", href: "/life-at-jola#stallions" },
    ],
  },
  {
    key: "admissions",
    links: [
      { key: "process", href: "/admissions#process" },
      { key: "requirements", href: "/admissions#requirements" },
      { key: "bookVisit", href: "/admissions/book-a-visit" },
      { key: "contact", href: "/contact" },
    ],
  },
] as const;

export const academicLevels = [
  { key: "earlyYears", anchor: "early-years", image: "/images/placeholders/journey-early-years.jpg" },
  { key: "elementary", anchor: "elementary", image: "/images/placeholders/journey-elementary.jpg" },
  { key: "middleSchool", anchor: "middle-school", image: "/images/placeholders/journey-middle.jpg" },
  { key: "highSchool", anchor: "high-school", image: "/images/placeholders/journey-high.jpg" },
] as const;
