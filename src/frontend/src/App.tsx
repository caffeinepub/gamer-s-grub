import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import {
  AlertCircle,
  Car,
  CheckCircle2,
  ChevronRight,
  Gamepad2,
  Library,
  Loader2,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Star,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

/* ============================================================
   TYPES
   ============================================================ */
interface FormState {
  name: string;
  email: string;
  message: string;
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home", ocid: "nav.home_link" },
    { label: "Services", href: "#services", ocid: "nav.services_link" },
    { label: "Pricing", href: "#pricing", ocid: "nav.pricing_link" },
    { label: "Contact", href: "#contact", ocid: "nav.contact_link" },
  ];

  const handleNav = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-[0_4px_30px_oklch(0_0_0/0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNav("#home")}
            className="flex items-center gap-2 group"
          >
            <img
              src="/assets/generated/gamers-grub-logo-transparent.dim_300x80.png"
              alt="Gamer's Grub"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                t.nextElementSibling?.removeAttribute("hidden");
              }}
            />
            <span
              hidden
              className="font-display text-xl font-bold text-neon-purple group-hover:text-neon-cyan transition-colors"
            >
              Gamer's Grub
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                type="button"
                key={link.label}
                data-ocid={link.ocid}
                onClick={() => handleNav(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:text-neon-cyan transition-colors rounded-md hover:bg-accent relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-neon-cyan group-hover:w-full transition-all duration-300 rounded" />
              </button>
            ))}
            <Button
              size="sm"
              className="ml-4 bg-neon-purple-dim border border-neon-purple text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-glow-purple transition-all duration-200 font-body"
              onClick={() => handleNav("#contact")}
            >
              Visit Us
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="nav.hamburger_toggle"
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/98 backdrop-blur-md border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  data-ocid={link.ocid}
                  onClick={() => handleNav(link.href)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-neon-cyan hover:bg-accent rounded-md transition-colors flex items-center justify-between text-left"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={ref}
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="/assets/generated/hero-banner.dim_1400x600.jpg"
          alt="Gaming setup"
          className="w-full h-full object-cover scale-110"
        />
        {/* Multi-layer dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/40" />
        {/* Neon glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.65_0.28_290/0.12)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,oklch(0.75_0.22_200/0.08)_0%,transparent_60%)]" />
      </motion.div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.22 200) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.22 200) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="h-px w-12 bg-neon-cyan" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-neon-cyan">
              Bangur, Kolkata
            </span>
            <Zap className="h-3 w-3 text-neon-cyan" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            Your Ultimate{" "}
            <span className="relative">
              <span
                className="text-neon-purple"
                style={{ textShadow: "0 0 40px oklch(0.65 0.28 290 / 0.6)" }}
              >
                Gaming Hub
              </span>
            </span>
            <br />
            <span className="text-foreground/90">in Bangur</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10 font-body"
          >
            Gamer's Grub — Kolkata's premier gaming café. PC, PS5, racing
            simulators &amp; game rentals.{" "}
            <span className="text-foreground/80 font-medium">Come play.</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              data-ocid="hero.cta_button"
              size="lg"
              onClick={handleScrollToServices}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold shadow-glow-purple hover:shadow-[0_0_30px_oklch(0.65_0.28_290/0.7),0_0_60px_oklch(0.65_0.28_290/0.3)] transition-all duration-300 font-body"
            >
              Explore Services
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-border/60 hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-neon-cyan-dim px-8 py-6 text-base transition-all duration-300 font-body"
            >
              Find Us
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-8 mt-14 pt-8 border-t border-border/40"
          >
            {[
              { value: "4", label: "Gaming Stations" },
              { value: "PS5", label: "Next-Gen Console" },
              { value: "500+", label: "Game Library" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl font-bold text-neon-cyan">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground mt-0.5 font-body">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}

/* ============================================================
   SERVICES SECTION
   ============================================================ */
const services = [
  {
    icon: Monitor,
    title: "PC Gaming",
    desc: "High-performance gaming rigs with the latest titles. RTX-powered machines for smooth, immersive gameplay.",
    accent: "purple" as const,
    ocid: "services.item.1",
  },
  {
    icon: Gamepad2,
    title: "PS5 Gaming",
    desc: "Next-gen console gaming with the full PS5 library. Exclusive titles and DualSense haptic feedback.",
    accent: "cyan" as const,
    ocid: "services.item.2",
  },
  {
    icon: Car,
    title: "Steering Wheel Racing",
    desc: "Immersive sim racing with force-feedback wheels. Feel every corner, curb, and crash.",
    accent: "purple" as const,
    ocid: "services.item.3",
  },
  {
    icon: Library,
    title: "Game Rentals",
    desc: "Borrow from our curated library and play your way. Hundreds of titles across all genres.",
    accent: "cyan" as const,
    ocid: "services.item.4",
  },
];

function ServicesSection() {
  return (
    <section
      id="services"
      data-ocid="services.section"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.65_0.28_290/0.06)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-neon-purple opacity-60" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon-purple">
              What We Offer
            </span>
            <div className="h-px w-8 bg-neon-purple opacity-60" />
          </div>
          <h2 className="section-heading text-foreground">Our Services</h2>
          <p className="section-subheading max-w-xl mx-auto">
            From casual gaming to hardcore sim racing — we have something for
            every player.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              data-ocid={service.ocid}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative card-glass border rounded-xl p-6 overflow-hidden cursor-default transition-all duration-300 hover:shadow-card-hover ${
                service.accent === "purple"
                  ? "border-neon-purple hover:border-[oklch(0.65_0.28_290/0.6)]"
                  : "border-[oklch(0.75_0.22_200/0.25)] hover:border-[oklch(0.75_0.22_200/0.5)]"
              }`}
            >
              {/* Background glow on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  service.accent === "purple"
                    ? "bg-[radial-gradient(ellipse_at_20%_20%,oklch(0.65_0.28_290/0.08)_0%,transparent_60%)]"
                    : "bg-[radial-gradient(ellipse_at_20%_20%,oklch(0.75_0.22_200/0.07)_0%,transparent_60%)]"
                }`}
              />

              {/* Icon */}
              <div
                className={`relative w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-300 ${
                  service.accent === "purple"
                    ? "bg-neon-purple-dim border border-[oklch(0.65_0.28_290/0.3)] group-hover:shadow-glow-purple"
                    : "bg-neon-cyan-dim border border-[oklch(0.75_0.22_200/0.3)] group-hover:glow-cyan"
                }`}
              >
                <service.icon
                  className={`h-5 w-5 ${service.accent === "purple" ? "text-neon-purple" : "text-neon-cyan"}`}
                />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-neon-purple transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {service.desc}
              </p>

              {/* Corner accent */}
              <div
                className={`absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  service.accent === "purple"
                    ? "bg-[radial-gradient(circle,oklch(0.65_0.28_290/0.12)_0%,transparent_70%)]"
                    : "bg-[radial-gradient(circle,oklch(0.75_0.22_200/0.1)_0%,transparent_70%)]"
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING SECTION
   ============================================================ */
interface PricingRow {
  label: string;
  price: string;
  note?: string;
}

interface PricingCategory {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  rows: PricingRow[];
  badge?: string;
  highlight: boolean;
  accent: "purple" | "cyan";
  ocid: string;
}

const pricingCategories: PricingCategory[] = [
  {
    title: "Gaming Computer",
    subtitle: "PC Gaming · Per Hour",
    icon: Monitor,
    highlight: false,
    accent: "cyan",
    ocid: "pricing.item.1",
    rows: [
      { label: "Personal ID", price: "₹100/hr" },
      { label: "GG ID (Club)", price: "₹130/hr" },
      { label: "Extra Time", price: "₹25/10 min" },
    ],
  },
  {
    title: "Playstation 4",
    subtitle: "PS4 · Single & Multiplayer",
    icon: Gamepad2,
    highlight: false,
    accent: "cyan",
    ocid: "pricing.item.2",
    rows: [
      { label: "30 min", price: "₹60" },
      { label: "60 min", price: "₹100" },
      { label: "Multiplayer · 30 min", price: "₹60/person" },
      { label: "Multiplayer · 60 min", price: "₹100/person" },
    ],
  },
  {
    title: "Playstation 5",
    subtitle: "PS5 · Next-Gen Gaming",
    icon: Gamepad2,
    highlight: true,
    badge: "Popular",
    accent: "purple",
    ocid: "pricing.item.3",
    rows: [
      { label: "30 min", price: "₹80" },
      { label: "60 min", price: "₹130" },
      { label: "Exclusive Games", price: "₹200" },
      { label: "Multiplayer · 30 min", price: "₹60/person" },
      { label: "Multiplayer · 60 min", price: "₹100/person" },
    ],
  },
  {
    title: "VR / Racing Simulator",
    subtitle: "Virtual Reality & Wheel Sim",
    icon: Car,
    highlight: false,
    accent: "cyan",
    ocid: "pricing.item.4",
    rows: [
      { label: "30 min", price: "₹150" },
      { label: "60 min", price: "₹250" },
      { label: "VR + Racing · 30 min", price: "₹230", note: "Combo" },
      { label: "VR + Racing · 60 min", price: "₹350", note: "Combo" },
    ],
  },
];

function PricingSection() {
  return (
    <section
      id="pricing"
      data-ocid="pricing.section"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,oklch(0.75_0.22_200/0.05)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-neon-cyan opacity-60" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon-cyan">
              Rates
            </span>
            <div className="h-px w-8 bg-neon-cyan opacity-60" />
          </div>
          <h2 className="section-heading text-foreground">Pricing</h2>
          <p className="section-subheading max-w-md mx-auto">
            Simple, transparent rates. No hidden fees.
          </p>
        </motion.div>

        {/* Pricing grid — 2×2 on md+, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pricingCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              data-ocid={cat.ocid}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 ${
                cat.highlight
                  ? "border-2 border-neon-purple shadow-glow-purple bg-[oklch(0.12_0.025_285)]"
                  : "border border-border card-glass hover:border-[oklch(0.65_0.28_290/0.4)] hover:shadow-card-hover"
              }`}
            >
              {/* Top glow line for highlighted */}
              {cat.highlight && (
                <div className="absolute -top-px left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
              )}

              <div className="p-6">
                {/* Card header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        cat.highlight
                          ? "bg-neon-purple-dim border border-[oklch(0.65_0.28_290/0.4)]"
                          : "bg-accent border border-border"
                      }`}
                    >
                      <cat.icon
                        className={`h-5 w-5 ${cat.highlight ? "text-neon-purple" : "text-muted-foreground group-hover:text-neon-cyan transition-colors"}`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-display text-base font-bold leading-tight ${
                          cat.highlight
                            ? "text-neon-purple"
                            : "text-foreground group-hover:text-neon-cyan transition-colors"
                        }`}
                        style={
                          cat.highlight
                            ? {
                                textShadow:
                                  "0 0 16px oklch(0.65 0.28 290 / 0.45)",
                              }
                            : {}
                        }
                      >
                        {cat.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 font-mono tracking-wide">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  {cat.badge && (
                    <Badge className="bg-neon-purple-dim border border-neon-purple text-neon-purple text-[10px] font-mono tracking-wider flex-shrink-0">
                      <Star className="h-2.5 w-2.5 mr-1" />
                      {cat.badge}
                    </Badge>
                  )}
                </div>

                {/* Divider */}
                <div
                  className={`h-px mb-4 ${cat.highlight ? "bg-neon-purple/20" : "bg-border/60"}`}
                />

                {/* Pricing rows */}
                <div className="space-y-2.5">
                  {cat.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-sm text-muted-foreground font-body flex items-center gap-1.5">
                        {row.note && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider bg-neon-cyan-dim text-neon-cyan border border-[oklch(0.75_0.22_200/0.35)]">
                            {row.note}
                          </span>
                        )}
                        {row.label}
                      </span>
                      <span
                        className={`font-mono text-sm font-semibold flex-shrink-0 ${
                          cat.highlight ? "text-neon-purple" : "text-foreground"
                        }`}
                      >
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-8 font-mono"
        >
          * Visit us for group discounts and tournament rates.
        </motion.p>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT FORM HOOK
   ============================================================ */
function useContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: FormState) => {
      if (!actor) throw new Error("Connection unavailable. Please try again.");
      await actor.submitContactForm(data.name, data.email, data.message);
    },
  });
}

/* ============================================================
   CONTACT SECTION
   ============================================================ */
function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const mutation = useContactForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await mutation.mutateAsync(form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,oklch(0.65_0.28_290/0.07)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,oklch(0.75_0.22_200/0.05)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-neon-purple opacity-60" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-neon-purple">
              Reach Us
            </span>
            <div className="h-px w-8 bg-neon-purple opacity-60" />
          </div>
          <h2 className="section-heading text-foreground">Get In Touch</h2>
          <p className="section-subheading max-w-md mx-auto">
            Drop by, give us a call, or send us a message — we'd love to hear
            from you.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Address & Phone */}
            <div className="card-glass border border-border rounded-xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-neon-purple-dim border border-[oklch(0.65_0.28_290/0.3)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-neon-purple" />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1">
                    Address
                  </p>
                  <p className="text-sm text-foreground leading-relaxed font-body">
                    19, Bangur Ave, Block C, Bangur,
                    <br />
                    Bangur, Kolkata,
                    <br />
                    West Bengal 700055
                  </p>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-neon-cyan-dim border border-[oklch(0.75_0.22_200/0.3)] flex items-center justify-center flex-shrink-0">
                  <Phone className="h-4 w-4 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-widest text-muted-foreground uppercase mb-1">
                    Phone
                  </p>
                  <a
                    href="tel:8697751440"
                    className="text-sm font-medium text-neon-cyan hover:text-foreground transition-colors font-mono"
                  >
                    86977 51440
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="rounded-xl overflow-hidden border border-border shadow-[0_0_0_1px_oklch(0.65_0.28_290/0.1)] flex-1">
              <iframe
                src="https://maps.google.com/maps?q=19+Bangur+Ave+Block+C+Bangur+Lake+Town+Kolkata+700055&output=embed"
                width="100%"
                height="300"
                style={{ border: 0, display: "block", minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Gamer's Grub Location"
                data-ocid="contact.map_marker"
              />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="card-glass border border-border rounded-xl p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    data-ocid="contact.success_state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-neon-purple-dim border border-neon-purple flex items-center justify-center shadow-glow-purple">
                      <CheckCircle2 className="h-8 w-8 text-neon-purple" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs font-body">
                      Thanks for reaching out. We'll get back to you as soon as
                      possible.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-border hover:border-neon-purple/50 hover:text-neon-purple font-body"
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="mb-6">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        Send a Message
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1 font-body">
                        We'll reply within 24 hours.
                      </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
                      >
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        data-ocid="contact.name_input"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-accent/50 border-border focus:border-neon-purple focus:ring-neon-purple/20 placeholder:text-muted-foreground/50 font-body text-sm h-11"
                        autoComplete="name"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        data-ocid="contact.email_input"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="bg-accent/50 border-border focus:border-neon-purple focus:ring-neon-purple/20 placeholder:text-muted-foreground/50 font-body text-sm h-11"
                        autoComplete="email"
                      />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="text-xs font-mono tracking-widest uppercase text-muted-foreground"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        data-ocid="contact.message_textarea"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        rows={5}
                        className="bg-accent/50 border-border focus:border-neon-purple focus:ring-neon-purple/20 placeholder:text-muted-foreground/50 font-body text-sm resize-none"
                      />
                    </div>

                    {/* Error state */}
                    {mutation.isError && (
                      <motion.div
                        data-ocid="contact.error_state"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive"
                      >
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        <span className="font-body">
                          Failed to send. Please try again.
                        </span>
                      </motion.div>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={mutation.isPending}
                      className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow-purple hover:shadow-[0_0_25px_oklch(0.65_0.28_290/0.6)] transition-all duration-300 font-body"
                    >
                      {mutation.isPending ? (
                        <span
                          data-ocid="contact.loading_state"
                          className="flex items-center gap-2"
                        >
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="relative border-t border-border/40 py-10 bg-[oklch(0.07_0.012_285)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,oklch(0.65_0.28_290/0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="font-display text-base font-bold text-foreground">
              Gamer's Grub
            </p>
            <p className="text-xs text-muted-foreground font-body">
              19, Bangur Ave, Block C, Bangur, Kolkata 700055
            </p>
            <a
              href="tel:8697751440"
              className="text-xs text-neon-cyan hover:text-foreground transition-colors font-mono"
            >
              86977 51440
            </a>
          </div>

          {/* Center: Copyright */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-body">
              © {year} Gamer's Grub. All rights reserved.
            </p>
          </div>

          {/* Caffeine attribution */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-body">
              Built with <span className="text-neon-purple">♥</span> using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon-cyan hover:text-foreground transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      data-theme="dark"
    >
      <Toaster position="bottom-right" theme="dark" />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
