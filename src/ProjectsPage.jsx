import React, { useEffect, useState } from 'react';
import { projects } from './projects';
export default function ProjectsPage() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  useEffect(() => { document.title = 'Proyectos — Diego Ariel'; }, []);
  return <div className="project-index" style={{ '--project-tone': project.tone }}>
    <a className="skip-link" href="#indice">Saltar al índice</a>
    <header className="index-header"><a className="brand" href="/">Diego Ariel</a><a href="/">Volver al inicio ↗</a><a href="/#contacto">Contacto ↗</a></header>
    <main className="index-stage" id="indice">
      <div className="index-top"><h1>Proyectos seleccionados</h1><span>Diseño & desarrollo web</span></div>
      <div className="index-images" aria-hidden="true">
        {projects.map((p, i) => (
          <img key={p.id} className={active === i ? 'active' : ''} src={p.preview} alt="" />
        ))}
      </div>
      <ol className="index-list">{projects.map((p, i) => <li key={p.id} className={active === i ? 'active' : ''} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
        <button onClick={() => setActive(i)} aria-pressed={active === i} aria-label={`Vista previa de ${p.title}`}><span className="index-small-number">{String(i + 1).padStart(2, '0')}</span><span className="index-name">{p.title}</span></button>
        <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`Visitar ${p.title} (otra pestaña)`}>↗</a>
      </li>)}</ol>
      <aside className="index-detail" key={project.id}><span className="index-number" aria-hidden="true">{String(active + 1).padStart(2, '0')}</span><div className="index-description"><p className="index-category">{project.category}</p><p>{project.description}</p><a className="index-visit" href={project.href} target="_blank" rel="noopener noreferrer">Visitar sitio ↗</a></div></aside>
      <div className="index-bottom"><span>Seis proyectos. Seis identidades.</span><span>Diego Ariel © {new Date().getFullYear()}</span></div>
    </main>
  </div>;
}
