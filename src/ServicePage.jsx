import React from 'react';
import { projects } from './projects';
import { services, servicePath } from './services';

export default function ServicePage({ service }) {
  const examples = projects.filter(({ id }) => service.examples.includes(id));

  return <>
    <header className="index-header">
      <a className="brand" href="/">Diego Ariel</a>
      <a href="/proyectos/">Proyectos</a>
      <a href="/#contacto">Contacto</a>
    </header>
    <main className="service-page section-pad">
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <a className="text-link accent" href={`mailto:diegoariel3@gmail.com?subject=${encodeURIComponent(service.title)}`}>Pedir presupuesto por email ↗</a>
      {service.questions.map(([question, answer]) => <section key={question}>
        <h2>{question}</h2>
        <p>{answer}</p>
      </section>)}
      <section>
        <h2>Ejemplos del portfolio</h2>
        {examples.map(project => <article key={project.id}>
          <h3><a href={project.href}>{project.title} ↗</a></h3>
          <p>{project.description}</p>
        </article>)}
      </section>
      <nav aria-label="Otros servicios">
        <h2>Otros servicios</h2>
        <ul>{services.filter(other => other !== service).map(other =>
          <li key={other.slug}><a href={servicePath(other)}>{other.title}</a></li>
        )}</ul>
      </nav>
    </main>
    <footer className="site-footer section-pad">
      <nav className="legal-links" aria-label="Información legal"><a href="/privacidad/">Privacidad</a><a href="/terminos/">Términos de uso</a><a href="/arrepentimiento/">Botón de arrepentimiento</a></nav>
    </footer>
  </>;
}
