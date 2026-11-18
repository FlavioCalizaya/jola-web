/**
 * Academic detail pages.
 *
 * Both educational stages (Early Years, Elementary, ...) and academic areas
 * (English, STEAM, ...) get their own dedicated page under `/academics/[slug]`.
 * Keeping the slugs in one place lets the navigation, the home cards and the
 * detail routes stay in sync.
 */

export const academicDetailSlugs = [
  // Educational stages
  "early-years",
  "elementary",
  "middle-school",
  "high-school",
  // Academic areas
  "english",
  "mathematics",
  "science",
  "social-studies",
  "reading",
  "steam",
  "technology",
  "arts",
  "self-society",
  // Cross-curricular approach
  "small-classes",
] as const;

export type AcademicDetailSlug = (typeof academicDetailSlugs)[number];
export type AcademicDetailKind = "stage" | "area" | "approach";

export function isAcademicDetailSlug(value: string): value is AcademicDetailSlug {
  return (academicDetailSlugs as readonly string[]).includes(value);
}

/** Convert the camelCase keys used in messages (e.g. `selfSociety`) to URL slugs. */
export function academicSlug(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

export function academicHref(key: string) {
  return `/academics/${academicSlug(key)}`;
}

export const academicDetailKind: Record<AcademicDetailSlug, AcademicDetailKind> = {
  "early-years": "stage",
  elementary: "stage",
  "middle-school": "stage",
  "high-school": "stage",
  english: "area",
  mathematics: "area",
  science: "area",
  "social-studies": "area",
  reading: "area",
  steam: "area",
  technology: "area",
  arts: "area",
  "self-society": "area",
  "small-classes": "approach",
};

export const academicDetailImages: Record<AcademicDetailSlug, string> = {
  "early-years": "/images/placeholders/journey-early-years.jpg",
  elementary: "/images/placeholders/journey-elementary.jpg",
  "middle-school": "/images/placeholders/journey-middle.jpg",
  "high-school": "/images/placeholders/journey-high.jpg",
  english: "/images/placeholders/why-bilingual.jpg",
  mathematics: "/images/placeholders/campus-classrooms.jpg",
  science: "/images/placeholders/campus-science.jpg",
  "social-studies": "/images/placeholders/campus-students.jpg",
  reading: "/images/placeholders/story-learning.jpg",
  steam: "/images/placeholders/why-steam.jpg",
  technology: "/images/placeholders/why-technology.jpg",
  arts: "/images/placeholders/campus-arts.jpg",
  "self-society": "/images/placeholders/what-makes-jola.jpg",
  "small-classes": "/images/placeholders/why-small-classes.jpg",
};
