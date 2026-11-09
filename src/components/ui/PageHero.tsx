import { Link } from "@/i18n/navigation";

import { Photo } from "./Photo";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  children,
  pageLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  children?: React.ReactNode;
  pageLabel: string;
}) {
  return (
    <section className="relative isolate flex min-h-[58svh] items-end overflow-hidden bg-navy-deep pb-14 pt-32 text-white sm:min-h-[64svh] lg:pb-20 lg:pt-40">
      <Photo
        src={image}
        alt={alt}
        priority
        badge={false}
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
        imageClassName="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/88 to-navy-deep/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy-deep/80 to-transparent"
      />
      <div className="shell">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/50">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-gold-soft"
              >
                JOLA School
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gold-soft">
              {pageLabel}
            </li>
          </ol>
        </nav>
        <p className="eyebrow mb-5 text-gold-soft">{eyebrow}</p>
        <h1 className="display-lg max-w-4xl text-white">{title}</h1>
        <p className="body-lg mt-6 max-w-2xl text-white/72">{description}</p>
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
