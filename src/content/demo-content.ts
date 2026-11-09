import type { Locale } from "@/i18n/routing";

/**
 * Demonstration records.
 *
 * These entries exist so the database-backed components can be reviewed before
 * JOLA supplies authorized stories and parent testimonials. Every record is
 * flagged with `isDemo: true` and labelled in the interface. They must be
 * replaced or unpublished before the site is publicly launched.
 */

export type DemoStory = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  locale: Locale;
  publishedAt: Date;
  isDemo: true;
};

export type DemoTestimonial = {
  author: string;
  content: string;
  locale: Locale;
  sortOrder: number;
  isDemo: true;
};

const storyImages = {
  learning: "/images/placeholders/story-learning.jpg",
  moments: "/images/placeholders/story-moments.jpg",
  stallions: "/images/placeholders/story-stallions.jpg",
};

export const demoStories: DemoStory[] = [
  {
    title: "Learning in Action",
    slug: "learning-in-action",
    category: "Learning",
    excerpt:
      "A space reserved for a real story about a JOLA student project.",
    content:
      "This is a demonstration story. It shows how classroom stories will appear once the JOLA news desk is connected to MySQL.\n\nReplace this entry with an authorized story about a real student project, including the students' own words and photographs supplied by JOLA.\n\nNo real student, teacher or event is represented by this content.",
    image: storyImages.learning,
    locale: "en",
    publishedAt: new Date("2026-01-15T12:00:00.000Z"),
    isDemo: true,
  },
  {
    title: "JOLA Moments",
    slug: "jola-moments",
    category: "Community",
    excerpt: "A space reserved for a real recap of a recent JOLA event.",
    content:
      "This is a demonstration story. It reserves the place for a recap of a recent JOLA event.\n\nOnce authorized material is available, this entry can include the date, the people involved, photographs and a short account of the moment.\n\nNo real JOLA event is represented by this content.",
    image: storyImages.moments,
    locale: "en",
    publishedAt: new Date("2026-01-08T12:00:00.000Z"),
    isDemo: true,
  },
  {
    title: "Meet Our Stallions",
    slug: "meet-our-stallions",
    category: "Student life",
    excerpt:
      "A space reserved for a student achievement or a Stallion spotlight.",
    content:
      "This is a demonstration story. It reserves the place for a student achievement or a Stallion spotlight.\n\nA real entry could celebrate a project, a performance, a sporting moment or a act of service — always with the authorization of the student and their family.\n\nNo real student is represented by this content.",
    image: storyImages.stallions,
    locale: "en",
    publishedAt: new Date("2026-01-01T12:00:00.000Z"),
    isDemo: true,
  },
  {
    title: "Aprender en acción",
    slug: "learning-in-action",
    category: "Aprendizaje",
    excerpt:
      "Un espacio reservado para una historia real sobre un proyecto de estudiantes de JOLA.",
    content:
      "Esta es una historia de demostración. Muestra cómo aparecerán las historias de aula cuando la redacción de JOLA esté conectada a MySQL.\n\nReemplaza esta entrada por una historia autorizada sobre un proyecto real, con las palabras de los estudiantes y fotografías proporcionadas por JOLA.\n\nNingún estudiante, docente o evento real está representado por este contenido.",
    image: storyImages.learning,
    locale: "es",
    publishedAt: new Date("2026-01-15T12:00:00.000Z"),
    isDemo: true,
  },
  {
    title: "Momentos JOLA",
    slug: "jola-moments",
    category: "Comunidad",
    excerpt:
      "Un espacio reservado para una crónica real de un evento reciente de JOLA.",
    content:
      "Esta es una historia de demostración. Reserva el lugar para una crónica de un evento reciente de JOLA.\n\nCuando exista material autorizado, esta entrada podrá incluir la fecha, las personas involucradas, fotografías y un breve relato del momento.\n\nNingún evento real de JOLA está representado por este contenido.",
    image: storyImages.moments,
    locale: "es",
    publishedAt: new Date("2026-01-08T12:00:00.000Z"),
    isDemo: true,
  },
  {
    title: "Conoce a nuestros Stallions",
    slug: "meet-our-stallions",
    category: "Vida estudiantil",
    excerpt:
      "Un espacio reservado para un logro estudiantil o el perfil de un Stallion.",
    content:
      "Esta es una historia de demostración. Reserva el lugar para un logro estudiantil o el perfil de un Stallion.\n\nUna entrada real podría celebrar un proyecto, una presentación, un momento deportivo o un acto de servicio, siempre con la autorización del estudiante y su familia.\n\nNingún estudiante real está representado por este contenido.",
    image: storyImages.stallions,
    locale: "es",
    publishedAt: new Date("2026-01-01T12:00:00.000Z"),
    isDemo: true,
  },
];

export const demoTestimonials: DemoTestimonial[] = [
  {
    author: "Sample format — JOLA Parent",
    content:
      "We chose JOLA because we wanted a school where our child would be challenged academically while also being supported as a person.",
    locale: "en",
    sortOrder: 1,
    isDemo: true,
  },
  {
    author: "Sample format — JOLA Parent",
    content:
      "We appreciate the close relationship between teachers and students.",
    locale: "en",
    sortOrder: 2,
    isDemo: true,
  },
  {
    author: "Sample format — JOLA Parent",
    content:
      "Our child feels known, supported and encouraged to grow.",
    locale: "en",
    sortOrder: 3,
    isDemo: true,
  },
  {
    author: "Formato de muestra — Madre/Padre JOLA",
    content:
      "Elegimos JOLA porque buscábamos un colegio donde nuestro hijo fuera desafiado académicamente y, al mismo tiempo, acompañado como persona.",
    locale: "es",
    sortOrder: 1,
    isDemo: true,
  },
  {
    author: "Formato de muestra — Madre/Padre JOLA",
    content:
      "Valoramos la relación cercana entre profesores y estudiantes.",
    locale: "es",
    sortOrder: 2,
    isDemo: true,
  },
  {
    author: "Formato de muestra — Madre/Padre JOLA",
    content:
      "Nuestro hijo se siente conocido, acompañado e incentivado a crecer.",
    locale: "es",
    sortOrder: 3,
    isDemo: true,
  },
];
