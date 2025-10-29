import React, { useState } from "react";

/*
App.jsx
Aplicación formativa independiente (PWA-ready) para residentes de Psiquiatría (R4).
Basado en "La entrevista psiquiátrica en la práctica clínica" de MacKinnon et al. (ed. esp. Ars Medica, 2008).  :contentReference[oaicite:1]{index=1}

Arquitectura didáctica:
- Pantalla inicial tipo hub con tarjetas por módulo (inspirado en PeriPEDPALQuest).
- Cada módulo: objetivos clínicos claros, perlas accionables y quiz con feedback inmediato.
- Enfoque R4: alianza terapéutica, lectura de transferencia, manejo emocional en vivo.
*/

// --- DATA MODEL --------------------------------------------------

const MODULES = [
  {
    id: 1,
    color: "bg-indigo-500",
    icon: "🧠",
    title: "Principios de la Entrevista",
    subtitle: "Construir alianza y obtener información útil",
    learningGoals: [
      "Diferenciar entrevista psiquiátrica vs. entrevista médica clásica.",
      "Explicar por qué toda entrevista psiquiátrica es ya intervención terapéutica, no sólo cribado.",
      "Definir 'contenido' y 'proceso' en una entrevista clínica.",
    ],
    pearls: [
      "No digas 'no te preocupes'. Di: 'Veo que esto te angustia'. Validas emoción y creas alianza.",
      "Entrevistar ≠ checklist DSM. Tu objetivo inicial es entender al paciente como persona, no encajarle en un código.",
      "Observa cómo el paciente se relaciona contigo (evasivo, seductor, controlador): eso YA es información diagnóstica.  :contentReference[oaicite:2]{index=2}",
    ],
    quiz: [
      {
        q: "¿Qué define mejor la diferencia clave entre entrevista médica estándar y entrevista psiquiátrica?",
        options: [
          "La psiquiátrica se centra sólo en síntomas actuales.",
          "La psiquiátrica incluye biografía emocional, defensas y patrones relacionales, no sólo síntomas.",
          "No hay diferencia relevante.",
        ],
        correct: 1,
        why: "El diagnóstico y plan en psiquiatría se basan tanto en la vida emocional y estilo relacional del paciente como en la 'enfermedad actual'.  :contentReference[oaicite:3]{index=3}",
      },
      {
        q: "Cuando dices 'entiendo que esto te hizo sentir muy avergonzado', ¿qué estás haciendo?",
        options: [
          "Sugiriendo tratamiento farmacológico inmediato.",
          "Mostrando comprensión emocional y fortaleciendo alianza terapéutica.",
          "Desviando el tema para ganar tiempo.",
        ],
        correct: 1,
        why: "La sensación compartida de comprensión es criterio de éxito de la entrevista inicial y ya es terapéutica.  :contentReference[oaicite:4]{index=4}",
      },
    ],
  },
  {
    id: 2,
    color: "bg-emerald-500",
    icon: "💬",
    title: "Afecto y Pensamiento",
    subtitle: "Datos introspectivos vs. datos observables",
    learningGoals: [
      "Explorar emoción actual y su disparador inmediato.",
      "Distinguir dato introspectivo (lo que el paciente dice) de dato inspectivo (lo que tú observas).",
      "Describir por qué la emoción presente en sesión es clave diagnóstica.",
    ],
    pearls: [
      "Si el paciente llora al mencionar a la suegra: 'Veo que ahí te emocionas' abre más que '¿te llevas mal con ella?'.  :contentReference[oaicite:5]{index=5}",
      "Mirar reloj, jugar con la alianza, reírse fuera de contexto = material clínico, no 'tics'.",
      "Tu propia reacción corporal (p.ej. aburrimiento súbito con un obsesivo) es una pista clínica útil.",
    ],
    quiz: [
      {
        q: "Un paciente dice 'estoy tranquilo', pero aprieta los puños y habla con voz tensa. ¿Qué tipo de datos describen tus observaciones?",
        options: ["Datos introspectivos", "Datos inspectivos", "Datos proyectivos"],
        correct: 1,
        why: "Datos inspectivos = conducta no verbal, tono de voz, inquietud motora, etc.  :contentReference[oaicite:6]{index=6}",
      },
      {
        q: "¿Qué debes explorar cuando aparece una emoción intensa en sesión?",
        options: [
          "Quién tiene la culpa",
          "Qué siente ahora y qué lo ha disparado",
          "Si firmará el consentimiento informado"
        ],
        correct: 1,
        why: "Se recomienda preguntar qué siente y qué lo ha desencadenado en ese momento concreto, en vez de intelectualizar.  :contentReference[oaicite:7]{index=7}",
      },
    ],
  },
  {
    id: 3,
    color: "bg-rose-500",
    icon: "🤝",
    title: "Transferencia y Alianza",
    subtitle: "Dependencia, desconfianza, competencia",
    learningGoals: [
      "Definir transferencia y alianza terapéutica.",
      "Reconocer pedidos aparentemente 'menores' (pañuelo, más tiempo) como material relacional.",
      "Saber cuándo NO confrontar demasiado pronto.",
    ],
    pearls: [
      "Todo pedido del paciente mezcla necesidad real + significado transferencial. Tu tarea es dosificar gratificación vs. exploración.",
      "No intentes 'caer bien' forzando sólo afecto positivo: algunos pacientes (p.ej. paranoides) necesitan mantener algo de recelo inicial para sentirse seguros.  :contentReference[oaicite:8]{index=8}",
      "Preguntas tipo '¿tú estás casado?' suelen hablar de '¿puedes entenderme?' más que de pura curiosidad biográfica.  :contentReference[oaicite:9]{index=9}",
    ],
    quiz: [
      {
        q: "Paciente nuevo: '¿Tiene un pañuelo?'. ¿Respuesta más adecuada en primera sesión?",
        options: [
          "Negarte porque es 'dependencia'.",
          "Dárselo sin dramatizar ni interpretar aún.",
          "Preguntarle por traumas infantiles inmediatamente.",
        ],
        correct: 1,
        why: "Interpretar o negar demasiado pronto puede dañar la alianza. Primero cubres la necesidad básica y observas el patrón.  :contentReference[oaicite:10]{index=10}",
      },
      {
        q: "El paciente te idealiza: 'Sé que usted puede salvarme'. ¿Qué refleja esto con más probabilidad?",
        options: [
          "Transferencia omnipotente",
          "Relación puramente racional",
          "Simulación"
        ],
        correct: 0,
        why: "Idealización del terapeuta como figura todopoderosa = transferencia omnipotente temprana.  :contentReference[oaicite:11]{index=11}",
      },
    ],
  },
  {
    id: 4,
    color: "bg-amber-500",
    icon: "🧩",
    title: "Estilos de Personalidad",
    subtitle: "Cómo adaptar tu técnica",
    learningGoals: [
      "Describir cómo personalidad obsesiva, histriónica, narcisista, límite, etc. condiciona la entrevista.",
      "Detectar señales de ruptura de alianza precoz (vergüenza narcisista, miedo al abandono límite).",
      "Usar tus propias reacciones como brújula clínica.",
    ],
    pearls: [
      "Con un obsesivo-compulsivo, tu sensación de tedio o 'no conectar' puede indicarte que está usando el habla para evitar contacto emocional.  :contentReference[oaicite:12]{index=12}",
      "Con un narcisista, evita humillar; valida primero su vivencia de valor personal antes de confrontar.",
      "Con un límite, clarifica disponibilidad y límites desde el inicio (horarios, urgencias) para reducir pánico al abandono.",
    ],
    quiz: [
      {
        q: "Durante la anamnesis con un paciente muy detallista, notas que te cuesta concentrarte y sientes distancia emocional. ¿Qué indica esto?",
        options: [
          "Tu mala noche de guardia, sin relevancia clínica.",
          "Un posible rasgo obsesivo-compulsivo que utiliza el detalle para evitar contacto emocional.",
          "Que el paciente miente deliberadamente.",
        ],
        correct: 1,
        why: "El libro sugiere usar tu propia reacción emocional como pista: en pacientes obsesivo-compulsivos, la verborrea puede ser una defensa contra la cercanía.  :contentReference[oaicite:13]{index=13}",
      },
    ],
  },
  {
    id: 5,
    color: "bg-cyan-500",
    icon: "🚑",
    title: "Situaciones Especiales",
    subtitle: "Urgencias, ingreso, contexto cultural",
    learningGoals: [
      "Identificar barreras adicionales en urgencias, hospitalización o diferencias culturales.",
      "Describir cómo el miedo al entorno hospitalario y a procedimientos puede bloquear la cooperación.",
      "Negociar seguridad y contención sin destruir la alianza inicial.",
    ],
    pearls: [
      "En urgencias el paciente puede NO venir voluntariamente. Tu primera tarea es seguridad y contención emocional, no un diagnóstico DSM exhaustivo.  :contentReference[oaicite:14]{index=14}",
      "Pacientes hospitalizados pueden sentirse vulnerables, asustados por un entorno extraño y procedimientos invasivos: nómbralos explícitamente para bajar ansiedad.  :contentReference[oaicite:15]{index=15}",
      "Diferencias culturales/idioma no son 'ruido', son parte del caso clínico. Explora cómo entienden 'enfermedad mental' y 'pedir ayuda'.  :contentReference[oaicite:16]{index=16}",
    ],
    quiz: [
      {
        q: "Paciente llega traído por la policía, muy hostil: 'No necesito psiquiatras'. ¿Qué es PRIORIDAD clínica inicial?",
        options: [
          "Convencerle de iniciar TCC estructurada",
          "Asegurar contención y seguridad física/emocional",
          "Profundizar en su historia infantil"
        ],
        correct: 1,
        why: "En urgencias la alianza empieza demostrando que tu objetivo inmediato es seguridad y control de la crisis, no juzgar. Esto habilita el resto de la entrevista clínica.  :contentReference[oaicite:17]{index=17}",
      },
    ],
  },
  {
    id: 6,
    color: "bg-purple-500",
    icon: "🎓",
    title: "Rol del R4",
    subtitle: "De recoger datos a formular casos",
    learningGoals: [
      "Integrar psicodinámica + fenomenología + neurobiología en una primera formulación clínica.",
      "Identificar transferencias potencialmente peligrosas (idealización extrema, desconfianza paranoide intensa).",
      "Explicar límites terapéuticos de forma clara y humana.",
    ],
    pearls: [
      "El R4 debe poder anticipar 'dónde se va a romper la alianza' y prevenirlo verbalizándolo tempranamente.",
      "Nombrar el afecto ('Veo que esto te da rabia conmigo') es una intervención terapéutica válida ya en primera entrevista.",
      "'¿Qué necesitas de mí hoy para salir más seguro de esta sala?' = pregunta de cierre potente en urgencias o consulta breve.",
    ],
    quiz: [
      {
        q: "Eres R4. ¿Cuál de estas metas refleja tu nivel esperado?",
        options: [
          "Limitarte a rellenar un listado de síntomas para el adjunto.",
          "Crear una formulación inicial que incluya dinámica relacional y riesgos de alianza terapéutica.",
          "Evitar cualquier implicación emocional para mantener 'objetividad'.",
        ],
        correct: 1,
        why: "El psiquiatra debe ir más allá del inventario DSM y comprender al paciente como persona, su conflicto y relación contigo.  :contentReference[oaicite:18]{index=18}",
      },
    ],
  },
];

// --- COMPONENTS --------------------------------------------------

function Header() {
  return (
    <header className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-lg sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🩺</span>
        <div className="leading-tight">
          <h1 className="text-lg font-bold">Entrevista Psiquiátrica R4</h1>
          <p className="text-xs text-slate-400">Formación clínica interactiva</p>
        </div>
      </div>
      <div className="text-right text-[10px] text-slate-400">
        <p>Basado en MacKinnon et al. 2008  :contentReference[oaicite:19]{index=19}</p>
        <p className="italic">v1.0 · Offline Ready</p>
      </div>
    </header>
  );
}

function ModuleCard({ mod, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className={`w-full text-left rounded-2xl p-4 shadow-md active:scale-[0.99] transition bg-slate-800 text-white border border-slate-700 flex gap-4`}
    >
      <div
        className={`flex-none ${mod.color} text-white rounded-xl w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-inner`}
      >
        {mod.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-semibold flex items-center gap-2 text-white">
          <span>
            {mod.id}. {mod.title}
          </span>
        </h2>
        <p className="text-sm text-slate-300 leading-snug">{mod.subtitle}</p>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-400">
          <span className="inline-block px-2 py-[2px] rounded-full bg-slate-700">
            {mod.learningGoals.length} objetivos
          </span>
          <span className="inline-block px-2 py-[2px] rounded-full bg-slate-700">
            {mod.quiz.length} preguntas
          </span>
        </div>
      </div>
    </button>
  );
}

function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});

  return (
    <div className="space-y-6">
      {questions.map((item, idx) => {
        const picked = answers[idx];
        const isAnswered = picked !== undefined;
        const isCorrect = isAnswered && picked === item.correct;
        return (
          <div
            key={idx}
            className="bg-slate-800 border border-slate-700 rounded-xl p-4"
          >
            <p className="text-white font-semibold text-sm mb-3 flex gap-2">
              <span className="text-slate-400">P{idx + 1}.</span> {item.q}
            </p>
            <div className="space-y-2">
              {item.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => {
                    if (!isAnswered) {
                      setAnswers((a) => ({ ...a, [idx]: optIdx }));
                    }
                  }}
                  className={`w-full text-left text-xs rounded-lg px-3 py-2 border transition 
                  ${
                    picked === optIdx
                      ? isCorrect
                        ? "bg-emerald-600/20 border-emerald-500 text-emerald-300"
                        : "bg-rose-600/20 border-rose-500 text-rose-300"
                      : "bg-slate-900 border-slate-600 text-slate-200"
                  }
                  ${isAnswered ? "opacity-60" : "opacity-100"}`}
                  disabled={isAnswered}
                >
                  {opt}
                </button>
              ))}
            </div>
            {isAnswered && (
              <div
                className={`mt-3 text-xs rounded-lg p-3 border 
                ${
                  isCorrect
                    ? "bg-emerald-900/40 border-emerald-600 text-emerald-200"
                    : "bg-rose-900/40 border-rose-600 text-rose-200"
                }
              `}
              >
                <p className="font-semibold flex items-center gap-2">
                  <span>{isCorrect ? "✔ Correcto" : "✘ Incorrecto"}</span>
                  <span className="text-[10px] font-normal text-slate-300">
                    Explicación
                  </span>
                </p>
                <p className="mt-1 leading-relaxed">{item.why}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ModuleDetail({ mod, onClose }) {
  return (
    <section className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col z-20">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">
            <div
              className={`${mod.color} text-white p-4 flex items-start gap-3`}
            >
              <div className="text-3xl">{mod.icon}</div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wide font-semibold opacity-80">
                  Módulo {mod.id}
                </p>
                <h2 className="text-lg font-bold leading-snug">{mod.title}</h2>
                <p className="text-xs opacity-90">{mod.subtitle}</p>
              </div>
              <button
                className="text-xs bg-slate-900/30 border border-white/20 rounded-lg px-2 py-1"
                onClick={onClose}
              >
                Cerrar ✕
              </button>
            </div>

            <div className="p-4 space-y-6 text-slate-100 text-sm leading-relaxed bg-slate-900">
              <section>
                <h3 className="text-slate-200 font-semibold text-xs uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />{" "}
                  Objetivos de aprendizaje
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {mod.learningGoals.map((goal, i) => (
                    <li key={i} className="text-slate-300">
                      {goal}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-slate-200 font-semibold text-xs uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />{" "}
                  Perlas clínicas (R4-ready)
                </h3>
                <ul className="space-y-3">
                  {mod.pearls.map((p, i) => (
                    <li
                      key={i}
                      className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-slate-200 text-xs leading-relaxed flex gap-2"
                    >
                      <span className="text-lg leading-none">💡</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-slate-200 font-semibold text-xs uppercase tracking-wide mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400" />{" "}
                  Autoevaluación rápida
                </h3>
                <Quiz questions={mod.quiz} />
              </section>

              <footer className="text-[10px] text-slate-500 text-center pt-6 border-t border-slate-800">
                <p>Material docente para residentes de Psiquiatría (R4).</p>
                <p>
                  Fuente base: MacKinnon R.A. et al. "La entrevista
                  psiquiátrica en la práctica clínica" (2ª ed. esp.).  :contentReference[oaicite:20]{index=20}
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- APP ROOT -----------------------------------------------------

export default function App() {
  const [openModule, setOpenModule] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      <Header />

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-xl mx-auto space-y-6">
          <section className="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-slate-200 shadow-xl">
            <h2 className="text-base font-semibold flex items-start gap-2">
              <span className="text-2xl">📚</span>
              <span>
                Curso interactivo
                <span className="block text-slate-400 text-xs font-normal leading-snug">
                  Guía práctica de la entrevista psiquiátrica en la práctica
                  clínica para R4
                </span>
              </span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mt-3">
              Explora cada módulo. Lee las perlas. Responde las preguntas. Todo
              está diseñado para que no sólo "sepas el DSM", sino que puedas
              sostener una entrevista terapéutica real desde la primera toma de
              contacto, incluso en urgencias.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-slate-300">
              <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
                📱 100% móvil
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
                🔒 Offline / PWA
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-700">
                🧪 Quiz inmediato
              </span>
            </div>
          </section>

          <section className="space-y-3">
            {MODULES.map((m) => (
              <ModuleCard key={m.id} mod={m} onOpen={() => setOpenModule(m)} />
            ))}
          </section>

          <section className="text-[10px] text-center text-slate-600 pt-8 pb-16">
            <p>
              Este material es de uso docente y no sustituye el juicio clínico
              ni protocolos locales de seguridad.
            </p>
          </section>
        </div>
      </main>

      {openModule && (
        <ModuleDetail mod={openModule} onClose={() => setOpenModule(null)} />
      )}
    </div>
  );
}
