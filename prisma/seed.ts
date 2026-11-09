import { AdminRole, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  demoStories,
  demoTestimonials,
} from "../src/content/demo-content";

const prisma = new PrismaClient();

const demoGallery = [
  ["Classrooms", "campus-classrooms"],
  ["Science", "campus-science"],
  ["Robotics", "campus-robotics"],
  ["Arts", "campus-arts"],
  ["Music", "campus-music"],
  ["Sports", "campus-sports"],
  ["Outdoor spaces", "campus-outdoor"],
  ["Students", "campus-students"],
].map(([title, file], index) => ({
  title,
  imageUrl: `/images/placeholders/${file}.jpg`,
  category: title,
  published: true,
  isDemo: true,
  sortOrder: index,
}));

async function main() {
  // Demo content is replaced on every seed run so it stays clearly isolated.
  await prisma.story.deleteMany({ where: { isDemo: true } });
  await prisma.testimonial.deleteMany({ where: { isDemo: true } });
  await prisma.galleryImage.deleteMany({ where: { isDemo: true } });

  await prisma.story.createMany({
    data: demoStories.map((story) => ({
      title: story.title,
      slug: story.slug,
      excerpt: story.excerpt,
      content: story.content,
      image: story.image,
      category: story.category,
      locale: story.locale,
      published: true,
      publishedAt: story.publishedAt,
      isDemo: true,
    })),
  });

  await prisma.testimonial.createMany({
    data: demoTestimonials.map((testimonial) => ({
      author: testimonial.author,
      content: testimonial.content,
      locale: testimonial.locale,
      published: true,
      isDemo: true,
      sortOrder: testimonial.sortOrder,
    })),
  });

  await prisma.galleryImage.createMany({ data: demoGallery });

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "JOLA Administrator";

  if (email && password) {
    if (password.length < 12) {
      throw new Error(
        "ADMIN_PASSWORD must be at least 12 characters. Update .env and run the seed again.",
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.adminUser.upsert({
      where: { email },
      update: { name, passwordHash, role: AdminRole.ADMIN },
      create: { name, email, passwordHash, role: AdminRole.ADMIN },
    });
    console.log(`✓ Admin user ready: ${email}`);
  } else {
    console.warn(
      "• Admin user skipped: set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD to create one.",
    );
  }

  console.log(
    `✓ Seed complete: ${demoStories.length} demo stories, ${demoTestimonials.length} demo testimonials, ${demoGallery.length} gallery images.`,
  );
  console.log(
    "  Demo content is flagged in the database and labelled in the UI. Replace or unpublish it before launch.",
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
