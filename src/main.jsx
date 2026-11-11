import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { projects } from './projects';
import './styles.css';
import ProjectsPage from './ProjectsPage';

gsap.registerPlugin(ScrollTrigger);

const email = 'diegoariel3@gmail.com';


function Arrow({ diagonal = false, className = '' }) {
  return <svg className={`arrow ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M3 12h17m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" /></svg>;
}

function RollingText({ children }) {
  return <span className="rolling"><span className="rolling-main">{children}</span><span className="rolling-copy" aria-hidden="true">{children}</span></span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
    const header = headerRef.current;
    let lastY = Math.max(0, window.scrollY);
    let lastDirection = 0;
    let distance = 0;
    let frame = 0;
    const show = (hidden) => {
      header.classList.toggle('is-hidden', hidden);
      header.inert = hidden;
    };
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;
      const keyboardFocus = header.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
      if (y < 24 || open || keyboardFocus) {
        show(false);
        distance = 0;
        return;
      }
      const direction = Math.sign(delta);
      if (!direction) return;
      distance = direction === lastDirection ? distance + Math.abs(delta) : Math.abs(delta);
      lastDirection = direction;
      if (distance >= 8) {
        show(direction > 0);
        distance = 0;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onKeyDown = (event) => { if (event.key === 'Tab') show(false); };
    const onFocus = () => show(false);
    show(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    header.addEventListener('focusin', onFocus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
      header.removeEventListener('focusin', onFocus);
      show(false);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === 'Escape') { setOpen(false); menuRef.current?.focus(); }
      if (e.type === 'pointerdown' && !navRef.current?.contains(e.target) && !menuRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close); };
  }, [open]);
  return <header className="site-header" ref={headerRef}>
    <a className="brand" href="#inicio" aria-label="Diego Ariel, volver al inicio"><RollingText>Diego Ariel</RollingText></a>
    <span className="header-note">Diseño que se ve. Webs que se sienten.</span>
    <button className="menu-button" ref={menuRef} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? 'Cerrar' : 'Menú'}<span className={open ? 'menu-mark open' : 'menu-mark'} aria-hidden="true"><i /><i /></span></button>
    <nav className={`main-nav ${open ? 'is-open' : ''}`} id="main-nav" aria-label="Navegación principal" ref={navRef}>
      {[['/proyectos', 'Proyectos'], ['#sobre-mi', 'Sobre mí'], ['#contacto', 'Contacto']].map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}><RollingText>{label}</RollingText></a>)}
    </nav>
  </header>;
}

const featuredProject = projects.find(({ id }) => id === 'nuestro-dia');
const homeProjects = projects.filter(({ id }) => id === 'sergio' || id === 'donisidro');

function Project({ project }) {
  return <article className={`project project-${project.id}`}>
    <a className="project-visual" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`${project.action}: ${project.title} (se abre en otra pestaña)`}>
      <div className="project-image-wrap"><img src={project.preview} alt={`Portada de ${project.title}`} width="1280" height="720" loading="lazy" decoding="async" /></div>
      <span className="visit-label"><RollingText>{project.action}</RollingText><Arrow diagonal /></span>
      <span className="project-cursor" aria-hidden="true"><Arrow diagonal /></span>
    </a>
    <div className="project-caption"><h3><a href={project.href} target="_blank" rel="noopener noreferrer">{project.title}<Arrow diagonal /></a></h3><span>{project.category}</span></div>
    <div className="project-info"><p>{project.description}</p><span className="project-type">{project.type}</span></div>
  </article>;
}

function App() {
  const appRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useLayoutEffect(() => {
    let lenis;
    let tick;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false, anchors: { offset: -84 } });
      lenis.on('scroll', ScrollTrigger.update);
      tick = time => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
      intro.from('.hero-letter', { yPercent: 112, rotate: 3, duration: 1.2, stagger: 0.035, clearProps: 'transform' }, 0.08)
        .from('.hero-intro > *', { y: 22, opacity: 0, duration: 0.9, stagger: 0.09, clearProps: 'all' }, 0.45)
        .from('.featured-image', { scale: 1.075, duration: 1.8, clearProps: 'transform' }, 0.25);
      gsap.to('.hero-intro', { autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=120', scrub: true } });
      gsap.utils.toArray('.reveal-line').forEach(line => {
        gsap.from(line, { yPercent: 85, rotate: 1.5, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: line.parentElement, start: 'top 92%', once: true }, clearProps: 'transform' });
      });
      const accent = getComputedStyle(appRef.current).getPropertyValue('--accent').trim();
      gsap.fromTo('.about-manifesto .word', { color: '#777570' }, {
        color: accent,
        stagger: 0.075,
        ease: 'none',
        scrollTrigger: { trigger: '.about-manifesto', start: 'top 82%', end: 'bottom 55%', scrub: 0.6 },
      });
      const contactLink = appRef.current.querySelector('.contact-marquee');
      gsap.fromTo(contactLink, { x: 0 }, {
        x: () => contactLink.parentElement.clientWidth - contactLink.offsetWidth,
        ease: 'none',
        scrollTrigger: { trigger: '.contact-title', start: 'top bottom', end: 'bottom 65%', scrub: 0.5, invalidateOnRefresh: true },
      });
      return () => { gsap.ticker.remove(tick); lenis.destroy(); };
    }, appRef);
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch { window.location.href = `mailto:${email}`; }
  }

  const manifesto = 'Una buena web se ve bien. Una gran web también se siente tuya.';
  return <div ref={appRef}>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <Header />
    <main id="contenido">
      <section className="hero section-pad" id="inicio" aria-labelledby="hero-title">
        <h1 className="hero-title" id="hero-title" aria-label="Diego Ariel"><span aria-hidden="true">{'DIEGO ARIEL'.split('').map((c, i) => <span className={c === ' ' ? 'hero-space' : 'hero-letter'} key={i}>{c === ' ' ? '\u00a0' : c}</span>)}</span></h1>
        <div className="hero-intro"><h2>Diseño & desarrollo web</h2><p>Webs con identidad, pensadas para conectar.</p><a className="text-link accent" href="#contacto"><RollingText>Hablemos</RollingText><Arrow /></a></div>
        <a className="withdrawal-link" href="/arrepentimiento/">Botón de arrepentimiento <Arrow /></a>
        <figure className="featured">
          <a className="featured-image" href={featuredProject.href} target="_blank" rel="noopener noreferrer" aria-label="Ver sitio de Nuestro Día (se abre en otra pestaña)">
            <img src={featuredProject.preview} alt="Portada de Nuestro Día, con una pareja al atardecer" width="1265" height="712" fetchPriority="high" />
          </a>
          <figcaption>
            <a href={featuredProject.href} target="_blank" rel="noopener noreferrer">
              <h3>{featuredProject.title}</h3><span>{featuredProject.category}</span>
              <span className="featured-action">Ver sitio <Arrow diagonal /></span>
            </a>
          </figcaption>
        </figure>
      </section>

      <section className="work section-pad" id="proyectos" aria-labelledby="work-title">
        <div className="section-heading"><h2 className="line-mask" id="work-title"><span className="reveal-line">Proyectos seleccionados</span></h2><span className="section-aside">Una idea. Su propia identidad.</span></div>
        <div className="project-grid">{homeProjects.map(project => <Project key={project.id} project={project} />)}</div>
        <a className="text-link archive-link" href="/proyectos/"><RollingText>Ver más proyectos</RollingText><Arrow diagonal /></a>
      </section>

      <section className="about section-pad" id="sobre-mi" aria-labelledby="about-title">
        <div className="about-heading"><h2 className="line-mask" id="about-title"><span className="reveal-line">Detrás de cada web,<br />una forma de mirar.</span></h2><p>Soy Diego Ariel. Diseño y desarrollo páginas web, combinando identidad visual, detalle y código para darle forma a cada proyecto.</p></div>
        <p className="about-manifesto" aria-label={manifesto}>{manifesto.split(' ').map((word, i) => <React.Fragment key={i}><span className="word" aria-hidden="true">{word}</span>{' '}</React.Fragment>)}</p>
        <div className="approach"><p className="approach-intro">De la primera idea<br />{' '}al último detalle.</p><div className="service-list">
          <div className="service"><h3>Diseño web</h3><p>Una dirección visual que conecte con tu marca y ordene lo que querés contar.</p></div>
          <div className="service"><h3>Desarrollo frontend</h3><p>Una experiencia que funcione con claridad en escritorio, tablet y celular.</p></div>
          <div className="service"><h3>Movimiento & detalle</h3><p>Transiciones e interacciones que acompañen el contenido y hagan memorable el recorrido.</p></div>
        </div></div>
      </section>

      <section className="contact section-pad" id="contacto" aria-labelledby="contact-title">
        <div className="contact-intro"><p>¿Tenés una idea en mente?</p><span>La próxima web puede ser la tuya.</span></div>
        <h2 id="contact-title" className="contact-title"><a href={`mailto:${email}`} className="contact-marquee"><RollingText>Hablemos</RollingText><Arrow diagonal /></a></h2>
        <div className="contact-bottom"><div><a className="email-link" href={`mailto:${email}`}><RollingText>{email}</RollingText><Arrow diagonal /></a><button className="copy-email" onClick={copyEmail} aria-label="Copiar dirección de email"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M16 5V3H3v13h2" stroke="currentColor" strokeWidth="1.5"/></svg><span aria-live="polite">{copied ? 'Copiado' : 'Copiar email'}</span></button></div><a className="text-link" href="tel:1130837555"><RollingText>Llamame: 11 3083-7555</RollingText><Arrow diagonal /></a></div>
      </section>
    </main>
    <footer className="site-footer section-pad">
      <span>© {new Date().getFullYear()} Diego Ariel</span>
      <span>Diseñado con intención. Desarrollado con detalle.</span>
      <nav className="legal-links" aria-label="Información legal"><a href="/privacidad/">Privacidad</a><a href="/terminos/">Términos de uso</a></nav>
      <a href="#inicio" className="text-link"><RollingText>Volver arriba</RollingText><Arrow className="arrow-up" /></a>
    </footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode>{window.location.pathname.startsWith('/proyectos') ? <ProjectsPage /> : <App />}</React.StrictMode>);

