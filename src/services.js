export const services = [
  {
    slug: 'diseno-web-para-pymes',
    title: 'Diseño web para pymes y emprendimientos',
    description: 'Diseño páginas web para negocios y profesionales de Argentina. Mostrá tus servicios, tus trabajos y cómo contactarte.',
    questions: [
      ['¿Qué puede incluir la página de mi negocio?', 'Una presentación de tu negocio, secciones para explicar tus servicios, fotos de tus trabajos y un formulario o un enlace a WhatsApp.'],
      ['¿Cuánto cuesta una página web?', 'El presupuesto depende de la cantidad de páginas, el contenido disponible y las funciones que necesitás. Para cotizar, contame qué ofrecés y qué querés que haga el visitante.'],
      ['¿Se puede coordinar a distancia?', 'Sí. Podés consultar desde Ituzaingó, Morón, Castelar o cualquier otra localidad de Argentina.'],
    ],
    examples: ['ilnonno', 'emkine'],
  },
  {
    slug: 'paginas-web-para-cabanas',
    title: 'Páginas web para cabañas y alojamientos',
    description: 'Diseño páginas web para cabañas y alquileres turísticos. Mostrá las unidades, su capacidad, el equipamiento y la ubicación.',
    questions: [
      ['¿Qué necesita saber el huésped?', 'Además de ver fotos, necesita saber cuántas personas entran, qué servicios incluye cada unidad y dónde queda el alojamiento. La web reúne esa información antes de la consulta.'],
      ['¿Puedo recibir consultas de disponibilidad por WhatsApp?', 'Sí. La página puede abrir un chat para que el huésped te indique sus fechas y la cantidad de personas. Si necesitás un calendario sincronizado o pagos online, se cotizan según el proyecto.'],
    ],
    examples: ['donisidro'],
  },
  {
    slug: 'catalogo-web-con-whatsapp',
    title: 'Diseño de catálogo web con WhatsApp',
    description: 'Diseño catálogos online para comercios. Mostrá tus productos por categoría y recibí consultas por WhatsApp.',
    questions: [
      ['¿Qué puede mostrar el catálogo?', 'Cada producto puede tener fotos, descripción, variantes como talle y color, y un precio si querés publicarlo. Podés compartir el enlace del catálogo en Instagram y WhatsApp.'],
      ['¿Necesito carrito o pagos online?', 'Podés empezar con un catálogo de consulta directa. Si querés gestionar stock, cobrar en la web o automatizar envíos, el alcance se define al cotizar.'],
    ],
    examples: ['sergio'],
  },
];

export const servicePath = ({ slug }) => `/${slug}/`;
