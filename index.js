// Lista de módulos docentes (cada tarjeta es un tema que debe dominar un R4)
const MODULES = [
  { id: 1, color: "bg-indigo-500", icon: "🧠", title: "Principios de la Entrevista", subtitle: "Alianza y obtención de info útil" },
  { id: 2, color: "bg-emerald-500", icon: "💬", title: "Afecto y Pensamiento", subtitle: "Introspectivo vs inspectivo" },
  { id: 3, color: "bg-rose-500", icon: "🤝", title: "Transferencia y Alianza", subtitle: "Dependencia y desconfianza" },
  { id: 4, color: "bg-amber-500", icon: "🧩", title: "Estilos de Personalidad", subtitle: "Adaptar tu técnica" },
  { id: 5, color: "bg-cyan-500", icon: "🚑", title: "Situaciones Especiales", subtitle: "Urgencias, ingreso, cultura" },
  { id: 6, color: "bg-purple-500", icon: "🎓", title: "Rol del R4", subtitle: "De recoger datos a formular casos" },
];

// Genera el HTML de cada tarjeta de módulo
function cardHTML(m) {
  return `
    <div class="w-full text-left rounded-2xl p-4 shadow-md bg-slate-800 text-white border border-slate-700 flex gap-4 mb-3">
      <div class="flex-none ${m.color} text-white rounded-xl w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-inner">
        ${m.icon}
      </div>
      <div class="flex-1 min-w-0">
        <h2 class="text-base font-semibold flex items-center gap-2 text-white">
          <span>${m.id}. ${m.title}</span>
        </h2>
        <p class="text-sm text-slate-300 leading-snug">${m.subtitle}</p>
        <div class="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
          <span class="inline-block px-2 py-[2px] rounded-full bg-slate-700">objetivos</span>
          <span class="inline-block px-2 py-[2px] rounded-full bg-slate-700">quiz</span>
        </div>
      </div>
    </div>
  `;
}

// Pintamos toda la app en la página
document.getElementById("root").innerHTML = `
  <!-- CABECERA -->
  <header class="bg-slate-900 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-10">
    <div class="flex items-center gap-2">
      <span class="text-2xl">🩺</span>
      <div class="leading-tight">
        <h1 class="text-lg font-bold">Entrevista Psiquiátrica R4</h1>
        <p class="text-xs text-slate-400">Formación clínica interactiva</p>
      </div>
    </div>
    <div class="text-right text-[10px] text-slate-400">
      <p>Basado en MacKinnon et al. 2008</p>
      <p class="italic">v1.0 · Offline Ready</p>
    </div>
  </header>

  <!-- CONTENIDO -->
  <main class="flex-1 p-4 overflow-y-auto">
    <div class="max-w-xl mx-auto space-y-6">

      <!-- Intro del curso -->
      <section class="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-slate-200 shadow-xl">
        <h2 class="text-base font-semibold flex items-start gap-2">
          <span class="text-2xl">📚</span>
          <span>
            Curso interactivo
            <span class="block text-slate-400 text-xs font-normal leading-snug">
              Guía práctica de la entrevista psiquiátrica en la práctica clínica para R4
            </span>
          </span>
        </h2>
        <p class="text-xs text-slate-400 leading-relaxed mt-3">
          Este material está diseñado para residentes de Psiquiatría de cuarto año.
          No es solo DSM. Es alianza terapéutica real, manejo emocional en vivo,
          lectura de transferencia y adaptación a estilos de personalidad.
        </p>

        <p class="text-[11px] text-slate-500 leading-relaxed mt-3">
          Basado en “La entrevista psiquiátrica en la práctica clínica”
          (MacKinnon et al., Ars Medica 2008).  :contentReference[oaicite:1]{index=1}
        </p>

        <div class="mt-4 flex flex-wrap gap-2 text-[10px] text-slate-300">
          <span class="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
            📱 100% móvil
          </span>
          <span class="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
            🔒 Offline / PWA
          </span>
          <span class="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
            🧪 Quiz inmediato
          </span>
        </div>
      </section>

      <!-- Lista de módulos -->
      <section id="module-list" class="space-y-3"></section>

      <!-- Disclaimer -->
      <section class="text-[10px] text-center text-slate-600 pt-8 pb-16">
        <p>
          Uso docente. No sustituye tu juicio clínico ni los protocolos de seguridad de tu hospital.
        </p>
      </section>
    </div>
  </main>
`;

// Ahora metemos las tarjetas dentro de la lista de módulos
document.getElementById("module-list").innerHTML =
  MODULES.map(cardHTML).join("");
