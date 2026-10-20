import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";

type Page =
  | "home"
  | "services"
  | "products"
  | "projects"
  | "about"
  | "contact"
  | "auth"
  | "admin";

type IconName =
  | "arrow"
  | "bolt"
  | "check"
  | "chevron"
  | "droplet"
  | "egg"
  | "external"
  | "facebook"
  | "github"
  | "globe"
  | "google"
  | "grid"
  | "mail"
  | "map"
  | "menu"
  | "moon"
  | "phone"
  | "plus"
  | "search"
  | "settings"
  | "sun"
  | "user"
  | "whatsapp"
  | "x";

const images = {
  electric: "/assets/electrician.jpg",
  electricPortrait: "/assets/electrician-portrait.jpg",
  plumbing: "/assets/plumbing.jpg",
  poultry: "/assets/poultry.jpg",
};

const services = [
  {
    title: "Installation électrique",
    category: "Génie électrique",
    description: "Des installations fiables et conformes pour vos bâtiments résidentiels et professionnels.",
    image: images.electric,
    icon: "bolt" as IconName,
  },
  {
    title: "Rénovation & maintenance",
    category: "Génie électrique",
    description: "Diagnostic, mise aux normes et entretien préventif de vos équipements électriques.",
    image: images.electricPortrait,
    icon: "settings" as IconName,
  },
  {
    title: "Plomberie générale",
    category: "Plomberie",
    description: "Installation et dépannage de réseaux hydrauliques, sanitaires et évacuations.",
    image: images.plumbing,
    icon: "droplet" as IconName,
  },
  {
    title: "Montage de couveuses",
    category: "Agrotech",
    description: "Conception d'incubateurs performants et adaptés à la capacité de votre élevage.",
    image: images.poultry,
    icon: "egg" as IconName,
  },
  {
    title: "Maintenance de couveuses",
    category: "Agrotech",
    description: "Contrôle de température, ventilation, humidité et remise en état de vos équipements.",
    image: images.poultry,
    icon: "settings" as IconName,
  },
  {
    title: "Conseil technique",
    category: "Accompagnement",
    description: "Étude de votre besoin, recommandations et chiffrage clair avant chaque intervention.",
    image: images.electricPortrait,
    icon: "check" as IconName,
  },
];

const products = [
  {
    title: "Couveuse automatique 96 œufs",
    category: "Incubateurs",
    price: "185 000 FCFA",
    image: images.poultry,
  },
  {
    title: "Couveuse semi-automatique 48 œufs",
    category: "Incubateurs",
    price: "95 000 FCFA",
    image: images.poultry,
  },
  {
    title: "Tableau électrique pré-équipé",
    category: "Électricité",
    price: "Sur devis",
    image: images.electric,
  },
  {
    title: "Kit régulateur de température",
    category: "Accessoires",
    price: "28 000 FCFA",
    image: images.electricPortrait,
  },
  {
    title: "Kit plomberie sanitaire",
    category: "Plomberie",
    price: "Sur devis",
    image: images.plumbing,
  },
  {
    title: "Système de retournement automatique",
    category: "Accessoires",
    price: "45 000 FCFA",
    image: images.poultry,
  },
];

const projects = [
  {
    title: "Réseau électrique résidentiel",
    category: "Génie électrique",
    client: "Villa privée - Douala",
    image: images.electric,
  },
  {
    title: "Couveuse 500 œufs sur mesure",
    category: "Agrotech",
    client: "Ferme avicole - Japoma",
    image: images.poultry,
  },
  {
    title: "Rénovation du réseau sanitaire",
    category: "Plomberie",
    client: "Commerce - Bonamoussadi",
    image: images.plumbing,
  },
  {
    title: "Mise aux normes d'un atelier",
    category: "Génie électrique",
    client: "PME - Bassa",
    image: images.electricPortrait,
  },
  {
    title: "Installation avicole complète",
    category: "Agrotech",
    client: "Coopérative - Littoral",
    image: images.poultry,
  },
  {
    title: "Réseau hydraulique de bureaux",
    category: "Plomberie",
    client: "Entreprise - Akwa",
    image: images.plumbing,
  },
];

const navItems: { page: Page; label: string }[] = [
  { page: "home", label: "Accueil" },
  { page: "services", label: "Services" },
  { page: "products", label: "Produits" },
  { page: "projects", label: "Réalisations" },
  { page: "about", label: "À propos" },
  { page: "contact", label: "Contact" },
];

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    droplet: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
    egg: <path d="M18 14c0 4-2.7 7-6 7s-6-3-6-7 2.7-11 6-11 6 7 6 11Z" />,
    external: <><path d="M15 3h6v6M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-1.5 6-6A4.6 4.6 0 0 0 18.7 5 4.3 4.3 0 0 0 18.6 1S17.7.7 15 2.5a13.4 13.4 0 0 0-6 0C6.3.7 5.4 1 5.4 1A4.3 4.3 0 0 0 5.3 5 4.6 4.6 0 0 0 4 8.5c0 4.5 3 6 6 6A4.8 4.8 0 0 0 9 18v4" /><path d="M9 19c-3 .9-3-1.5-4-2" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" /></>,
    google: <><path d="M21 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5a4.3 4.3 0 0 1-1.9 2.8v2.7h3.6c2.1-1.9 3.3-4.8 3.3-7.5Z" /><path d="M12 21c3 0 5.5-1 7.4-2.7l-3.6-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.2-4.6H2.1v2.8A10 10 0 0 0 12 21Z" /><path d="M5.8 12.1a6 6 0 0 1 0-3.8V5.5H2.1a10 10 0 0 0 0 9.4l3.7-2.8Z" /><path d="M12 3.7c1.6 0 3 .5 4.2 1.6l3.1-3.1A10.4 10.4 0 0 0 2.1 5.5l3.7 2.8C6.6 5.7 9.1 3.7 12 3.7Z" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" /><path d="M9 3v15M15 6v15" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    moon: <path d="M20 15.3A9 9 0 1 1 8.7 4 7 7 0 0 0 20 15.3Z" />,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></>,
    whatsapp: <><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.2A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8.5 7.5c.5 4 3 6.5 7 7" /></>,
    x: <path d="M18 6 6 18M6 6l12 12" />,
  };
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  return <button className={`button button-${variant} ${className}`} {...props}>{children}</button>;
}

function Field({
  label,
  multiline = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; multiline?: boolean }) {
  return <label className="field"><span>{label}</span>{multiline ? <textarea className="input min-h-32 resize-none" placeholder={props.placeholder} required={props.required} /> : <input className="input" {...props} />}</label>;
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  if (!inverse) {
    return (
      <div className="flex items-center">
        <img
          src="/assets/emefep-logo.png"
          alt="EMEFEEP : Une autre vision de la technologie dans notre vie"
          className="h-12 w-36 object-contain object-left"
        />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2.5">
      <div className={`logo-mark ${inverse ? "bg-white text-brand-700" : "bg-brand-600 text-white"}`}>E</div>
      <div className="leading-none">
        <div className={`text-lg font-extrabold tracking-tight ${inverse ? "text-white" : "text-ink"}`}>EMEFEEP</div>
        <div className={`mt-1 text-[8px] font-bold uppercase tracking-[0.16em] ${inverse ? "text-white/60" : "text-slate-400"}`}>Expertise · Innovation</div>
      </div>
    </div>
  );
}

function Header({ page, navigate, dark, setDark }: { page: Page; navigate: (page: Page) => void; dark: boolean; setDark: (value: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const go = (target: Page) => { setOpen(false); navigate(target); };
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <div className="page-container flex h-20 items-center justify-between">
        <button onClick={() => go("home")} aria-label="Accueil"><Logo /></button>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {navItems.map((item) => (
            <button key={item.page} onClick={() => go(item.page)} className={`nav-link ${page === item.page ? "active" : ""}`}>{item.label}</button>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="ghost" className="!size-10 !p-0" onClick={() => setDark(!dark)} aria-label="Changer de thème"><Icon name={dark ? "sun" : "moon"} className="size-4" /></Button>
          <Button variant="ghost" className="!px-3">FR <span className="text-slate-300">|</span> EN</Button>
          <Button onClick={() => go("auth")} variant="secondary"><Icon name="user" className="size-4" /> Connexion</Button>
        </div>
        <Button variant="ghost" className="!size-11 !p-0 lg:hidden" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu"><Icon name={open ? "x" : "menu"} /></Button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => <button key={item.page} onClick={() => go(item.page)} className={`mobile-link ${page === item.page ? "active" : ""}`}>{item.label}<Icon name="chevron" className="size-4" /></button>)}
            <Button className="mt-3" onClick={() => go("auth")}>Connexion</Button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="bg-ink text-white">
      <div className="page-container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo inverse />
          <p className="mt-5 text-sm leading-7 text-slate-400">Une autre vision de la technologie dans notre vie. Des solutions techniques locales, durables et pensées pour vos ambitions.</p>
          <div className="mt-6 flex gap-2">
            {(["facebook", "globe", "whatsapp"] as IconName[]).map((icon) => <button key={icon} className="social-button" aria-label={icon}><Icon name={icon} className="size-4" /></button>)}
          </div>
        </div>
        <div>
          <div className="footer-title">Liens rapides</div>
          <div className="mt-5 grid gap-3 text-sm text-slate-400">
            {navItems.slice(0, 5).map((item) => <button key={item.page} className="w-fit transition hover:text-white" onClick={() => navigate(item.page)}>{item.label}</button>)}
          </div>
        </div>
        <div>
          <div className="footer-title">Nous contacter</div>
          <div className="mt-5 grid gap-4 text-sm text-slate-400">
            <div className="flex gap-3"><Icon name="map" className="mt-0.5 size-4 shrink-0 text-brand-400" /><span>Japoma Cocotier<br />Douala, Cameroun</span></div>
            <div className="flex gap-3"><Icon name="phone" className="size-4 shrink-0 text-brand-400" /><span>+237 6 90 00 00 00</span></div>
            <div className="flex gap-3"><Icon name="mail" className="size-4 shrink-0 text-brand-400" /><span>contact@emefep.cm</span></div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">© 2026 EMEFEEP. Tous droits réservés.</div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-2xl">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="section-title">{title}</h2>
        {description && <p className="mt-3 leading-7 text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function Home({ navigate }: { navigate: (page: Page) => void }) {
  const slides = [
    { kicker: "Génie électrique", title: "L'expertise technique qui donne vie à vos projets.", text: "Installation, rénovation et maintenance pour des bâtiments plus sûrs et plus performants.", image: images.electric },
    { kicker: "Plomberie générale", title: "Des installations fiables, conçues pour durer.", text: "De l'étude à la mise en service, nous maîtrisons chaque étape de votre réseau hydraulique.", image: images.plumbing },
    { kicker: "Agrotech", title: "L'innovation locale au service de votre élevage.", text: "Des incubateurs sur mesure, performants et faciles à maintenir pour développer votre activité.", image: images.poultry },
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);
  const current = slides[slide];
  return (
    <>
      <section className="hero">
        <img src={current.image} alt="" className="absolute inset-0 size-full object-cover transition-opacity duration-700" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,26,38,.92)_0%,rgba(8,26,38,.7)_48%,rgba(8,26,38,.12)_100%)]" />
        <div className="page-container relative flex min-h-[660px] items-center py-24">
          <div className="max-w-3xl text-white">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur"><span className="size-1.5 rounded-full bg-brand-400" />{current.kicker}</div>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.07] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{current.title}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">{current.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button onClick={() => navigate("services")}>Découvrir nos services <Icon name="arrow" className="size-4" /></Button>
              <Button variant="secondary" className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20" onClick={() => navigate("contact")}>Nous contacter</Button>
            </div>
            <div className="mt-14 flex items-center gap-4">
              {slides.map((item, index) => <button key={item.kicker} onClick={() => setSlide(index)} aria-label={`Voir ${item.kicker}`} className={`h-1 rounded-full transition-all ${index === slide ? "w-12 bg-brand-400" : "w-5 bg-white/35"}`} />)}
              <span className="ml-2 text-xs font-bold tracking-widest text-white/50">0{slide + 1} / 0{slides.length}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden w-[38%] grid-cols-3 bg-white/95 text-ink shadow-2xl backdrop-blur lg:grid">
          {[["8", "collaborateurs"], ["3", "expertises"], ["2019", "année de création"]].map(([value, label]) => <div key={label} className="border-l border-slate-200 px-7 py-6"><div className="text-2xl font-extrabold">{value}</div><div className="mt-1 text-xs text-slate-500">{label}</div></div>)}
        </div>
      </section>

      <section className="section bg-white">
        <div className="page-container">
          <SectionHeading eyebrow="Notre savoir-faire" title="Des solutions maîtrisées de bout en bout." description="Une équipe agile, des compétences complémentaires et un même niveau d'exigence sur chaque intervention." action={<Button variant="ghost" onClick={() => navigate("services")}>Tous les services <Icon name="arrow" className="size-4" /></Button>} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((service, index) => <ServiceCard key={service.title} item={service} index={index} onAction={() => navigate("contact")} />)}
          </div>
        </div>
      </section>

      <section className="section bg-sand">
        <div className="page-container">
          <SectionHeading eyebrow="Équipements" title="Des produits conçus pour votre réalité." description="Des solutions accessibles, robustes et accompagnées par notre équipe technique." action={<Button variant="ghost" onClick={() => navigate("products")}>Voir le catalogue <Icon name="arrow" className="size-4" /></Button>} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => <ProductCard key={product.title} item={product} />)}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="page-container">
          <SectionHeading eyebrow="Projets récents" title="Notre expertise, visible sur le terrain." action={<Button variant="ghost" onClick={() => navigate("projects")}>Toutes les réalisations <Icon name="arrow" className="size-4" /></Button>} />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => <ProjectCard key={project.title} item={project} />)}
          </div>
        </div>
      </section>

      <Cta navigate={navigate} />
    </>
  );
}

function ServiceCard({ item, index = 0, onAction }: { item: typeof services[number]; index?: number; onAction: () => void }) {
  return (
    <article className="card group overflow-hidden">
      <div className="relative h-56 overflow-hidden"><img src={item.image} alt={item.title} className="size-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" /><div className="absolute left-5 top-5 flex size-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-lg"><Icon name={item.icon} /></div><span className="absolute bottom-4 right-4 text-xs font-bold text-white/80">0{index + 1}</span></div>
      <div className="p-6"><div className="tag">{item.category}</div><h3 className="card-title">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p><Button variant="ghost" className="mt-5 !px-0" onClick={onAction}>Demander ce service <Icon name="arrow" className="size-4" /></Button></div>
    </article>
  );
}

function ProductCard({ item }: { item: typeof products[number] }) {
  const message = encodeURIComponent(`Bonjour EMEFEEP, je souhaite commander : ${item.title}.`);
  return (
    <article className="card group overflow-hidden">
      <div className="relative h-56 overflow-hidden bg-slate-100"><img src={item.image} alt={item.title} className="size-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute left-4 top-4 tag !bg-white">{item.category}</div></div>
      <div className="p-6"><h3 className="card-title">{item.title}</h3><div className="mt-3 text-lg font-extrabold text-brand-700">{item.price}</div><a href={`https://wa.me/237690000000?text=${message}`} target="_blank" rel="noreferrer" className="button button-secondary mt-5 w-full"><Icon name="whatsapp" className="size-4" /> Commander sur WhatsApp</a></div>
    </article>
  );
}

function ProjectCard({ item }: { item: typeof projects[number] }) {
  return (
    <article className="project-card group">
      <img src={item.image} alt={item.title} className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white"><div className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-300">{item.category}</div><h3 className="text-xl font-extrabold">{item.title}</h3><div className="mt-2 flex items-center justify-between text-sm text-slate-300"><span>{item.client}</span><span className="flex size-9 items-center justify-center rounded-full bg-white/15"><Icon name="external" className="size-4" /></span></div></div>
    </article>
  );
}

function Cta({ navigate }: { navigate: (page: Page) => void }) {
  return <section className="bg-brand-700 py-16 text-white"><div className="page-container flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div><div className="text-sm font-bold uppercase tracking-[0.18em] text-brand-200">Un projet en tête ?</div><h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Construisons une solution adaptée.</h2></div><Button className="!bg-white !text-brand-700 hover:!bg-slate-100" onClick={() => navigate("contact")}>Parler à un expert <Icon name="arrow" className="size-4" /></Button></div></section>;
}

function PageHero({ title, description, eyebrow = "EMEFEEP" }: { title: string; description: string; eyebrow?: string }) {
  return <section className="border-b border-slate-200 bg-sand"><div className="page-container py-14 md:py-20"><div className="eyebrow">{eyebrow}</div><h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-[-0.04em] text-ink md:text-5xl">{title}</h1><p className="mt-4 max-w-2xl leading-7 text-slate-500">{description}</p></div></section>;
}

function FilterBar({ query, setQuery, category, setCategory, categories }: { query: string; setQuery: (value: string) => void; category: string; setCategory: (value: string) => void; categories: string[] }) {
  return <div className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_220px_auto]"><label className="relative"><Icon name="search" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input className="input !pl-11" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher..." /></label><select className="input" value={category} onChange={(event) => setCategory(event.target.value)}><option value="">Toutes les catégories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><Button variant="secondary" onClick={() => { setQuery(""); setCategory(""); }}>Effacer</Button></div>;
}

function ListingPage({ type, navigate }: { type: "services" | "products" | "projects"; navigate: (page: Page) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const config = {
    services: { title: "Nos services", description: "Des prestations techniques pensées pour sécuriser, améliorer et faire grandir vos projets.", items: services },
    products: { title: "Nos produits", description: "Des équipements robustes, sélectionnés et assemblés pour répondre aux réalités du terrain.", items: products },
    projects: { title: "Nos réalisations", description: "Découvrez quelques projets menés avec exigence pour nos clients au Cameroun.", items: projects },
  }[type];
  const categories = [...new Set(config.items.map((item) => item.category))];
  const filtered = config.items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) && (!category || item.category === category));
  return (
    <>
      <PageHero title={config.title} description={config.description} eyebrow={type === "projects" ? "Portfolio" : "Notre offre"} />
      <main className="section bg-slate-50"><div className="page-container"><FilterBar query={query} setQuery={setQuery} category={category} setCategory={setCategory} categories={categories} /><div className={`grid gap-5 sm:grid-cols-2 ${type === "services" ? "lg:grid-cols-3" : "lg:grid-cols-3"}`}>{filtered.map((item, index) => type === "services" ? <ServiceCard key={item.title} item={item as typeof services[number]} index={index} onAction={() => navigate("contact")} /> : type === "products" ? <ProductCard key={item.title} item={item as typeof products[number]} /> : <ProjectCard key={item.title} item={item as typeof projects[number]} />)}</div>{filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center text-slate-500">Aucun résultat ne correspond à votre recherche.</div>}<div className="mt-10 flex justify-center gap-2"><Button variant="secondary" className="!size-10 !p-0">1</Button><Button variant="ghost" className="!size-10 !p-0">2</Button><Button variant="ghost" className="!size-10 !p-0"><Icon name="chevron" className="size-4" /></Button></div></div></main>
    </>
  );
}

function About() {
  return (
    <>
      <PageHero title="Une entreprise locale, une ambition durable." description="EMEFEEP associe expertise du bâtiment et innovation agrotech pour proposer des solutions concrètes, fiables et accessibles." eyebrow="À propos" />
      <section className="section bg-white"><div className="page-container grid items-center gap-12 lg:grid-cols-2"><div><div className="eyebrow">Qui sommes-nous ?</div><h2 className="section-title">Le savoir-faire traditionnel rencontre l'innovation.</h2><p className="mt-5 leading-8 text-slate-500">Basée à Japoma Cocotier, Douala, EMEFEEP intervient auprès des particuliers, commerces, bâtiments industriels et exploitants avicoles. Nous concevons chaque intervention comme un partenariat : comprendre le besoin, proposer juste, exécuter proprement et rester disponible.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Entreprise camerounaise", "Équipe de 8 spécialistes", "Solutions sur mesure", "Suivi après intervention"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold text-ink"><span className="flex size-7 items-center justify-center rounded-full bg-brand-50 text-brand-600"><Icon name="check" className="size-4" /></span>{item}</div>)}</div></div><div className="relative"><img src={images.electricPortrait} alt="Technicien EMEFEEP en intervention" className="aspect-[4/3] w-full rounded-3xl object-cover" /><div className="absolute -bottom-5 -left-5 rounded-2xl bg-brand-600 p-6 text-white shadow-xl"><div className="text-3xl font-extrabold">7+</div><div className="mt-1 text-xs font-semibold text-brand-100">années d'expérience</div></div></div></div></section>
      <section className="bg-ink py-16 text-white"><div className="page-container grid grid-cols-2 gap-8 lg:grid-cols-4">{[["8", "collaborateurs"], ["3", "domaines d'expertise"], ["120+", "interventions"], ["98%", "clients satisfaits"]].map(([value, label]) => <div key={label} className="text-center"><div className="text-4xl font-extrabold text-brand-300">{value}</div><div className="mt-2 text-sm text-slate-400">{label}</div></div>)}</div></section>
      <section className="section bg-sand"><div className="page-container"><SectionHeading eyebrow="Organisation" title="Une équipe agile et engagée." description="Une structure claire qui équilibre développement commercial et rigueur technique." /><div className="grid gap-5 md:grid-cols-3">{[["Direction générale", "Pilotage stratégique, gestion financière et relations partenaires.", "user"], ["Pôle commercial", "Un chef commercial et deux vendeuses au service de la relation client.", "grid"], ["Pôle technique", "Un chef d'atelier et trois techniciens garants de la qualité d'exécution.", "settings"]].map(([title, text, icon]) => <div key={title} className="card p-7"><span className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon name={icon as IconName} /></span><h3 className="card-title mt-6">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p></div>)}</div></div></section>
    </>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return (
    <>
      <PageHero title="Parlons de votre projet." description="Une question, un besoin précis ou une demande de devis ? Notre équipe vous répond dans les meilleurs délais." eyebrow="Contact" />
      <section className="section bg-slate-50"><div className="page-container grid gap-8 lg:grid-cols-[1.25fr_.75fr]"><form onSubmit={submit} className="card p-6 md:p-9"><h2 className="text-2xl font-extrabold text-ink">Envoyez-nous un message</h2><p className="mt-2 text-sm text-slate-500">Les champs marqués d'un astérisque sont obligatoires.</p>{sent ? <div className="mt-8 rounded-2xl bg-emerald-50 p-8 text-center text-emerald-800"><span className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100"><Icon name="check" /></span><div className="mt-4 font-extrabold">Message envoyé avec succès</div><p className="mt-2 text-sm">Notre équipe vous contactera très prochainement.</p><Button className="mt-5" type="button" onClick={() => setSent(false)}>Nouveau message</Button></div> : <div className="mt-8 grid gap-5 sm:grid-cols-2"><Field label="Nom complet *" placeholder="Votre nom" required /><Field label="Adresse email *" type="email" placeholder="vous@exemple.com" required /><Field label="Téléphone" type="tel" placeholder="+237 6…" /><Field label="Objet *" placeholder="Objet de votre message" required /><div className="sm:col-span-2"><Field label="Message *" placeholder="Décrivez-nous votre besoin…" required multiline /></div><Button className="sm:col-span-2 sm:w-fit" type="submit">Envoyer le message <Icon name="arrow" className="size-4" /></Button></div>}</form><aside className="space-y-5"><div className="card p-7"><h2 className="text-xl font-extrabold text-ink">Nos coordonnées</h2><div className="mt-6 grid gap-6">{[[ "map", "Localisation", "Japoma Cocotier, Douala"], ["phone", "Téléphone", "+237 6 90 00 00 00"], ["whatsapp", "WhatsApp", "+237 6 90 00 00 00"], ["mail", "Email", "contact@emefep.cm"]].map(([icon, label, value]) => <div key={label} className="flex gap-4"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon name={icon as IconName} className="size-4" /></span><div><div className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</div><div className="mt-1 text-sm font-bold text-ink">{value}</div></div></div>)}</div></div><div className="relative h-72 overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_30%_40%,#b7e2e9,transparent_35%),linear-gradient(145deg,#e7eef0,#cddde0)]"><div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(35deg,transparent 48%,#fff 49%,#fff 51%,transparent 52%),linear-gradient(-20deg,transparent 48%,#fff 49%,#fff 51%,transparent 52%)", backgroundSize: "90px 70px" }} /><div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"><span className="flex size-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-xl"><Icon name="map" /></span><span className="mt-2 rounded-full bg-white px-3 py-1 text-xs font-bold shadow">Japoma Cocotier</span></div></div></aside></div></section>
    </>
  );
}

function Auth({ navigate }: { navigate: (page: Page) => void }) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const submit = (event: FormEvent) => { event.preventDefault(); navigate("admin"); };
  return <main className="grid min-h-[calc(100vh-80px)] lg:grid-cols-2"><section className="relative hidden overflow-hidden lg:block"><img src={images.electric} alt="Technicien au travail" className="absolute inset-0 size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-brand-800/20" /><div className="absolute inset-x-0 bottom-0 p-14 text-white"><div className="eyebrow !text-brand-300">Bienvenue chez EMEFEEP</div><h1 className="mt-4 max-w-xl text-5xl font-extrabold leading-tight tracking-tight">Votre espace, pour aller plus loin ensemble.</h1><p className="mt-5 max-w-lg leading-7 text-slate-300">Suivez vos demandes, échangez avec nos équipes et retrouvez vos projets.</p></div></section><section className="flex items-center justify-center bg-slate-50 px-5 py-14"><form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/50 md:p-10"><div className="mb-8"><div className="eyebrow">Espace client</div><h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{tab === "login" ? "Heureux de vous revoir." : "Créons votre compte."}</h2></div><div className="mb-7 grid grid-cols-2 rounded-xl bg-slate-100 p-1"><button type="button" className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")}>Connexion</button><button type="button" className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Inscription</button></div><div className="grid gap-5">{tab === "signup" && <Field label="Nom complet" placeholder="Votre nom" required />}<Field label="Adresse email" type="email" placeholder="vous@exemple.com" required /><Field label="Mot de passe" type="password" placeholder="••••••••" required /><Button type="submit" className="mt-1 w-full">{tab === "login" ? "Se connecter" : "Créer mon compte"} <Icon name="arrow" className="size-4" /></Button></div><div className="my-7 flex items-center gap-3 text-xs text-slate-400 before:h-px before:flex-1 before:bg-slate-200 after:h-px after:flex-1 after:bg-slate-200">ou continuer avec</div><div className="grid grid-cols-3 gap-3">{(["google", "facebook", "github"] as IconName[]).map((icon) => <Button type="button" variant="secondary" key={icon} className="!px-0"><Icon name={icon} className="size-5" /></Button>)}</div></form></section></main>;
}

const adminSections = [
  ["dashboard", "Tableau de bord", "grid"],
  ["members", "Membres", "user"],
  ["services", "Services", "settings"],
  ["products", "Produits", "egg"],
  ["projects", "Réalisations", "check"],
  ["categories", "Catégories", "grid"],
  ["settings", "Paramètres", "settings"],
] as const;

function Admin({ navigate }: { navigate: (page: Page) => void }) {
  const [section, setSection] = useState<(typeof adminSections)[number][0]>("dashboard");
  const [sidebar, setSidebar] = useState(false);
  return <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[260px_1fr]"><aside className={`admin-sidebar ${sidebar ? "open" : ""}`}><div className="p-6"><Logo inverse /></div><nav className="mt-5 grid gap-1 px-3">{adminSections.map(([id, label, icon]) => <button key={id} onClick={() => { setSection(id); setSidebar(false); }} className={`admin-nav ${section === id ? "active" : ""}`}><Icon name={icon} className="size-4" />{label}</button>)}</nav><button className="admin-logout" onClick={() => navigate("home")}>Retour au site</button></aside><div><header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8"><div className="flex items-center gap-3"><Button variant="ghost" className="!size-10 !p-0 lg:hidden" onClick={() => setSidebar(!sidebar)}><Icon name="menu" /></Button><div><div className="text-xs font-bold uppercase tracking-widest text-slate-400">Administration</div><div className="font-extrabold text-ink">{adminSections.find(([id]) => id === section)?.[1]}</div></div></div><div className="flex items-center gap-3"><span className="hidden text-sm font-bold text-ink sm:block">Administrateur</span><span className="flex size-10 items-center justify-center rounded-full bg-brand-100 text-brand-700"><Icon name="user" className="size-5" /></span></div></header><main className="p-5 md:p-8">{section === "dashboard" ? <Dashboard setSection={setSection} /> : section === "settings" ? <SettingsPanel /> : <ManagementPanel section={section} />}</main></div></div>;
}

function Dashboard({ setSection }: { setSection: (section: (typeof adminSections)[number][0]) => void }) {
  const stats = [["Réalisations", "6", "check"], ["Produits", "6", "egg"], ["Services", "6", "settings"], ["Catégories", "4", "grid"], ["Membres", "8", "user"]];
  return <><div className="mb-8"><h1 className="text-3xl font-extrabold tracking-tight text-ink">Bienvenue, Administrateur</h1><p className="mt-2 text-sm text-slate-500">Voici un aperçu de l'activité du site.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{stats.map(([label, value, icon]) => <div key={label} className="card p-5"><span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon name={icon as IconName} className="size-4" /></span><div className="mt-5 text-3xl font-extrabold text-ink">{value}</div><div className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</div></div>)}</div><div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]"><div className="card p-6"><div className="flex items-center justify-between"><h2 className="text-lg font-extrabold text-ink">Notifications des clients</h2><Button variant="ghost" className="!text-xs">Tout voir</Button></div><div className="mt-5 divide-y divide-slate-100">{["Demande d'installation électrique", "Commande d'une couveuse 96 œufs", "Message depuis le formulaire de contact", "Demande de dépannage plomberie"].map((message, index) => <div key={message} className="flex items-center gap-4 py-4"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"><Icon name="mail" className="size-4" /></span><div className="min-w-0 flex-1"><div className="truncate text-sm font-bold text-ink">{message}</div><div className="mt-1 text-xs text-slate-400">Il y a {index + 1} h</div></div><Button variant="secondary" className="!px-3 !py-2 !text-xs">Répondre</Button></div>)}</div></div><div className="card p-6"><h2 className="text-lg font-extrabold text-ink">Informations de l'entreprise</h2><div className="mt-6"><Logo /><div className="mt-6 grid gap-4 text-sm text-slate-500"><div className="flex gap-3"><Icon name="map" className="size-4 text-brand-600" />Japoma Cocotier, Douala</div><div className="flex gap-3"><Icon name="phone" className="size-4 text-brand-600" />+237 6 90 00 00 00</div><div className="flex gap-3"><Icon name="mail" className="size-4 text-brand-600" />contact@emefep.cm</div></div><Button className="mt-7 w-full" onClick={() => setSection("settings")}>Modifier les informations</Button></div></div></div></>;
}

function ManagementPanel({ section }: { section: Exclude<(typeof adminSections)[number][0], "dashboard" | "settings"> }) {
  const config = {
    members: { singular: "membre", columns: ["Nom complet", "Rôle", "Catégorie", "Expérience"], rows: [["Alain M.", "Chef d'atelier", "Technique", "8 ans"], ["Diane N.", "Cheffe commerciale", "Commercial", "5 ans"], ["Junior E.", "Technicien", "Électricité", "4 ans"]] },
    services: { singular: "service", columns: ["Nom", "Catégorie", "Créé le", "Statut"], rows: services.slice(0, 3).map((item) => [item.title, item.category, "12/02/2026", "Publié"]) },
    products: { singular: "produit", columns: ["Nom", "Prix", "Catégorie", "Statut"], rows: products.slice(0, 3).map((item) => [item.title, item.price, item.category, "Publié"]) },
    projects: { singular: "réalisation", columns: ["Titre", "Client", "Catégorie", "Statut"], rows: projects.slice(0, 3).map((item) => [item.title, item.client, item.category, "Publié"]) },
    categories: { singular: "catégorie", columns: ["Nom", "Description", "Éléments", "Statut"], rows: [["Génie électrique", "Installations et maintenance", "7", "Publié"], ["Plomberie", "Réseaux hydrauliques", "5", "Publié"], ["Agrotech", "Équipements avicoles", "8", "Publié"]] },
  }[section];
  return <><div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><h1 className="text-2xl font-extrabold text-ink">Gestion des {section === "projects" ? "réalisations" : section === "members" ? "membres" : section === "categories" ? "catégories" : section}</h1><p className="mt-1 text-sm text-slate-500">Gérez les contenus affichés sur le site.</p></div><Button><Icon name="plus" className="size-4" /> Ajouter {config.singular === "catégorie" ? "une" : "un"} {config.singular}</Button></div><div className="card overflow-hidden"><div className="border-b border-slate-100 p-4"><div className="relative max-w-md"><Icon name="search" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input className="input !pl-11" placeholder="Rechercher..." /></div></div><div className="overflow-x-auto"><table className="admin-table"><thead><tr>{config.columns.map((column) => <th key={column}>{column}</th>)}<th>Actions</th></tr></thead><tbody>{config.rows.map((row, index) => <tr key={index}>{row.map((cell) => <td key={cell}>{cell}</td>)}<td><div className="flex gap-2"><Button variant="secondary" className="!px-3 !py-2 !text-xs">Modifier</Button><Button variant="ghost" className="!px-3 !py-2 !text-xs !text-red-600">Supprimer</Button></div></td></tr>)}</tbody></table></div></div><form className="card mt-6 p-6" onSubmit={(event) => event.preventDefault()}><h2 className="text-lg font-extrabold text-ink">Ajouter / modifier {config.singular === "catégorie" || config.singular === "réalisation" ? "une" : "un"} {config.singular}</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><Field label="Nom / titre" placeholder={`Nom ${config.singular === "service" ? "du" : "de la"} ${config.singular}`} /><Field label="Catégorie" placeholder="Sélectionner une catégorie" /><div className="md:col-span-2"><Field label="Description" placeholder="Ajoutez une description détaillée…" multiline /></div><div className="md:col-span-2 flex gap-3"><Button>Enregistrer</Button><Button variant="secondary" type="button">Annuler</Button></div></div></form></>;
}

function SettingsPanel() {
  return <><div className="mb-6"><h1 className="text-2xl font-extrabold text-ink">Paramètres de l'entreprise</h1><p className="mt-1 text-sm text-slate-500">Mettez à jour les informations publiques d'EMEFEEP.</p></div><form className="card p-6" onSubmit={(event) => event.preventDefault()}><h2 className="text-lg font-extrabold text-ink">Informations générales</h2><div className="mt-6 grid gap-5 md:grid-cols-2"><Field label="Nom de l'entreprise" defaultValue="EMEFEEP" /><Field label="Slogan" defaultValue="Une autre vision de la technologie dans notre vie" /><div className="md:col-span-2"><Field label="Description" defaultValue="Entreprise camerounaise spécialisée dans les prestations techniques du bâtiment et l'agrotech." multiline /></div><Field label="Localisation" defaultValue="Japoma Cocotier, Douala" /><Field label="Email" defaultValue="contact@emefep.cm" /><Field label="Numéro d'appel" defaultValue="+237 6 90 00 00 00" /><Field label="Numéro WhatsApp" defaultValue="+237 6 90 00 00 00" /><div className="md:col-span-2"><Button>Enregistrer les modifications</Button></div></div></form></>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [dark, setDark] = useState(false);
  const navigate = (target: Page) => { setPage(target); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const content = useMemo(() => {
    if (page === "home") return <Home navigate={navigate} />;
    if (page === "services" || page === "products" || page === "projects") return <ListingPage type={page} navigate={navigate} />;
    if (page === "about") return <About />;
    if (page === "contact") return <Contact />;
    if (page === "auth") return <Auth navigate={navigate} />;
    return null;
  }, [page]);
  if (page === "admin") return <Admin navigate={navigate} />;
  return <div className={dark ? "dark" : ""}><div className="min-h-screen bg-white text-slate-700"><Header page={page} navigate={navigate} dark={dark} setDark={setDark} />{content}<Footer navigate={navigate} /></div></div>;
}
