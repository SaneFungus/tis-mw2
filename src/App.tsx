import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  Shuffle,
  Play,
  ChevronRight,
  RotateCcw,
  Eye,
  EyeOff,
  Zap,
  Quote,
  BookOpen,
  Music,
  LayoutGrid,
  Layers,
  Sun,
  Moon,
  Info,
} from "lucide-react"

// ─── Seeded random for stable SVG rendering ───────────────────────
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// ─── Types ────────────────────────────────────────────────────────
interface DataItem {
  id: string
  title: { pl: string; en: string }
  desc: { pl: string; en: string }
  symbol: (className: string) => React.ReactNode
}

// ─── Pre-compute random SVG data ──────────────────────────────────
const rngD = seededRandom(42)
const dCircles = Array.from({ length: 30 }, () => ({
  cx: 15 + rngD() * 70,
  cy: 15 + rngD() * 70,
  r: 0.5 + rngD() * 1.5,
}))
const dLines = Array.from({ length: 15 }, () => ({
  x1: 20 + rngD() * 60,
  y1: 20 + rngD() * 60,
  x2: 22 + rngD() * 60,
  y2: 22 + rngD() * 60,
}))

const rngN = seededRandom(99)
const nLines = Array.from({ length: 40 }, () => ({
  x1: 30 + rngN() * 40,
  y1: 30 + rngN() * 40,
  x2: 35 + rngN() * 40,
  y2: 35 + rngN() * 40,
  opacity: 0.4 + rngN() * 0.6,
}))

// ─── Data ─────────────────────────────────────────────────────────
const DATA: DataItem[] = [
  {
    id: "D",
    title: { pl: "Drobiazgowo", en: "Meticulously" },
    desc: {
      pl: 'Dużo drobnych ruchów i akcji, drobne wartości czasowe. Klimat ściszony, dyskretny, "bez końca".',
      en: 'Many small movements and actions, small time values. Quiet, discreet atmosphere, "endless".',
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        {dCircles.map((c, i) => (
          <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="currentColor" />
        ))}
        {dLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="currentColor"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    ),
  },
  {
    id: "E",
    title: { pl: "Euforia", en: "Euphoria" },
    desc: {
      pl: "Stan wyjątkowego zaangażowania. Grać całym sobą, emfaza, ekspresja aż do przerysowania.",
      en: "State of exceptional engagement. Play with your whole self, emphasis, expression to the point of exaggeration.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M10,60 C20,10 40,10 50,60 S80,90 90,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M15,65 C25,15 45,15 55,65 S85,95 95,45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M5,55 C15,5 35,5 45,55 S75,85 85,35"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    ),
  },
  {
    id: "F",
    title: { pl: "Forte", en: "Forte" },
    desc: {
      pl: "Pełny ładunek dynamiki, głośność i wyrazistość sama w sobie. Brak ukrytej emocji – czysta siła.",
      en: "Full dynamic load, loudness and clarity in itself. No hidden emotion – pure power.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <rect x="15" y="25" width="70" height="15" fill="currentColor" />
        <rect x="15" y="45" width="70" height="15" fill="currentColor" />
        <rect x="15" y="65" width="70" height="15" fill="currentColor" />
        <path
          d="M15,25 L15,80 M85,25 L85,80"
          stroke="currentColor"
          strokeWidth="8"
        />
      </svg>
    ),
  },
  {
    id: "G",
    title: { pl: "Glissando", en: "Glissando" },
    desc: {
      pl: "Płynne przejście między stanami. Rozmycie krawędzi, ciągła zmiana bez punktów stałych.",
      en: "Fluid transition between states. Blurring of edges, continuous change without fixed points.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <defs>
          <linearGradient id="glissGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0.2} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={1} />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M10,${30 + i * 4} L90,${20 + i * 6}`}
            stroke="url(#glissGrad)"
            strokeWidth={0.5 + i * 0.2}
            fill="none"
          />
        ))}
      </svg>
    ),
  },
  {
    id: "H",
    title: { pl: "Hałaśliwie", en: "Noisily" },
    desc: {
      pl: "Ekscesyjna, nonsensowna i nieopanowana mimika. Hałas.",
      en: "Excessive, nonsensical and uncontrollable facial expressions. Noise.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M10,50 L15,20 L20,80 L25,30 L30,70 L35,10 L40,90 L45,40 L50,60 L55,20 L60,80 L70,30 L80,70 L90,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    id: "I",
    title: { pl: "Irracjonalnie", en: "Irrationally" },
    desc: {
      pl: 'Akcje zaprzeczające logice, odwrócenie normalnych gestów. Ruchy "pęknięte" i paradoksalne.',
      en: 'Actions defying logic, inversion of normal gestures. "Broken" and paradoxical movements.',
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M20,20 C80,20 20,80 80,80 M50,10 L50,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M10,50 L90,50"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 2"
        />
        <circle
          cx="50"
          cy="50"
          r="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeDasharray="10 5"
        />
        <path
          d="M40,40 L60,60 M60,40 L40,60"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "J",
    title: { pl: "Jednostajnie", en: "Uniformly" },
    desc: {
      pl: "Jednostajnie, monotonnie.",
      en: "Uniformly, monotonously.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={i}
            x1={10 + i * 15}
            y1="50"
            x2={20 + i * 15}
            y2="50"
            stroke="currentColor"
            strokeWidth="4"
          />
        ))}
      </svg>
    ),
  },
  {
    id: "K",
    title: { pl: "Krzyk", en: "Scream" },
    desc: {
      pl: "Krzyk, stan wyjątkowego napięcia.",
      en: "Scream, state of exceptional tension.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M50,50 m-30,0 a30,30 0 1,0 60,0 a30,30 0 1,0 -60,0"
          fill="currentColor"
        />
        <path
          d="M50,50 L10,10 M50,50 L90,10 M50,50 L50,90 M50,50 L10,90 M50,50 L90,90"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "L",
    title: { pl: "Lekko", en: "Lightly" },
    desc: {
      pl: "Lekko, lotnie.",
      en: "Lightly, airily.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M20,40 Q30,30 40,40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M50,30 Q60,20 70,30"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M30,60 Q40,50 50,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "Ł",
    title: { pl: "Łagodnie", en: "Gently" },
    desc: {
      pl: "Łagodnie, miękko.",
      en: "Gently, softly.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M10,60 C30,40 40,80 60,60 S90,40 100,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="10"
          y1="80"
          x2="90"
          y2="80"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    ),
  },
  {
    id: "M",
    title: { pl: "Minimalnie", en: "Minimally" },
    desc: {
      pl: "Drobne ziarenka odruchów. Dłuższe pauzy; wyraźne i plastyczne miniaturki.",
      en: "Tiny grains of reflexes. Longer pauses; clear and plastic miniatures.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        <circle cx="80" cy="40" r="1.5" fill="currentColor" />
        <circle cx="40" cy="70" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "N",
    title: { pl: "Niespokojnie", en: "Restlessly" },
    desc: {
      pl: "Wewnętrzne drżenie, brak stabilności, wysoka częstotliwość drobnych zmian. Niepewność.",
      en: "Internal tremor, lack of stability, high frequency of small changes. Uncertainty.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        {nLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity={l.opacity}
          />
        ))}
      </svg>
    ),
  },
  {
    id: "O",
    title: { pl: "Obojętnie", en: "Indifferently" },
    desc: {
      pl: "Obojętnie, obiektywnie, z opanowaniem.",
      en: "Indifferently, objectively, with composure.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <line
          x1="30"
          y1="20"
          x2="30"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="40"
          y1="20"
          x2="40"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="50"
          y1="20"
          x2="50"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="60"
          y1="20"
          x2="60"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line
          x1="70"
          y1="20"
          x2="70"
          y2="80"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "P",
    title: { pl: "Pianissimo", en: "Pianissimo" },
    desc: {
      pl: "Pianissimo, dyskretnie!!!",
      en: "Pianissimo, discreetly!!!",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <line
          x1="30"
          y1="50"
          x2="70"
          y2="50"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="1 2"
        />
      </svg>
    ),
  },
  {
    id: "R",
    title: { pl: "Raptownie", en: "Abruptly" },
    desc: {
      pl: "Raptowne ruchy, skoki – nagle zaskakujące akcje o ostrym rysunku.",
      en: "Abrupt movements, jumps – suddenly surprising actions with sharp outlines.",
    },
    symbol: (className: string) => (
      <svg viewBox="0 0 100 100" className={className}>
        <path
          d="M20,80 L40,20 L60,50 L80,10"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    ),
  },
]

// ─── App Component ────────────────────────────────────────────────
const App: React.FC = () => {
  const [lang, setLang] = useState<"pl" | "en">("pl")
  const [view, setView] = useState<
    "shuffle" | "sequence" | "manifesto" | "catalog"
  >("shuffle")
  const [currentItem, setCurrentItem] = useState<DataItem>(DATA[0])
  const [sequence, setSequence] = useState<DataItem[]>([])
  const [seqIndex, setSeqIndex] = useState(0)
  const [stageMode, setStageMode] = useState<"light" | "dark">("light")
  const [timeLeft, setTimeLeft] = useState(0)
  const tensionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const toggleLang = () => setLang((l) => (l === "pl" ? "en" : "pl"))
  const toggleStage = () =>
    setStageMode((s) => (s === "light" ? "dark" : "light"))

  const handleShuffle = useCallback(() => {
    const next = DATA[Math.floor(Math.random() * DATA.length)]
    setCurrentItem(next)
  }, [])

  const startTension = useCallback(() => {
    const time = 5 + Math.floor(Math.random() * 15)
    setTimeLeft(time)
    if (tensionTimerRef.current) clearInterval(tensionTimerRef.current)
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id)
          handleShuffle()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    tensionTimerRef.current = id
  }, [handleShuffle])

  useEffect(() => {
    return () => {
      if (tensionTimerRef.current) clearInterval(tensionTimerRef.current)
    }
  }, [])

  const generateSequence = (len = 8) => {
    const newSeq: DataItem[] = []
    for (let i = 0; i < len; i++) {
      newSeq.push(DATA[Math.floor(Math.random() * DATA.length)])
    }
    setSequence(newSeq)
    setSeqIndex(0)
  }

  const nextInSequence = () => {
    if (seqIndex < sequence.length - 1) {
      setSeqIndex((prev) => prev + 1)
    }
  }

  const isDark = stageMode === "dark"

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 p-4 md:p-8 flex flex-col items-center ${
        isDark ? "bg-stone-950 text-stone-100" : "bg-stone-100 text-stone-900"
      }`}
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      {/* Header */}
      <header className="w-full max-w-2xl flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter uppercase">
            TIS-Lab{" "}
            <span className="text-xs font-normal opacity-40 ml-1">MW2</span>
          </h1>
          <span className="text-[10px] font-mono opacity-50 uppercase">
            Stage Composition Tool
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleStage}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              isDark
                ? "bg-stone-100 text-stone-900"
                : "bg-stone-900 text-stone-100"
            }`}
          >
            {isDark ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          <button
            onClick={toggleLang}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
              isDark ? "bg-stone-800" : "bg-stone-300"
            }`}
          >
            {lang}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav
        className={`flex gap-1 mb-8 p-1 rounded-2xl w-full max-w-2xl transition-colors overflow-x-auto no-scrollbar ${
          isDark ? "bg-stone-900" : "bg-stone-200"
        }`}
      >
        {(
          [
            {
              id: "shuffle" as const,
              icon: <Shuffle size={14} />,
              label: { pl: "LOSUJ", en: "RANDOM" },
            },
            {
              id: "sequence" as const,
              icon: <Play size={14} />,
              label: { pl: "SCORE", en: "SCORE" },
            },
            {
              id: "catalog" as const,
              icon: <LayoutGrid size={14} />,
              label: { pl: "KATALOG", en: "CATALOG" },
            },
            {
              id: "manifesto" as const,
              icon: <BookOpen size={14} />,
              label: { pl: "TEORIA", en: "THEORY" },
            },
          ] as const
        ).map((nav) => (
          <button
            key={nav.id}
            onClick={() => setView(nav.id)}
            className={`flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all font-bold text-[9px] tracking-widest cursor-pointer ${
              view === nav.id
                ? isDark
                  ? "bg-stone-700 shadow-lg text-white"
                  : "bg-white shadow-md text-stone-900"
                : "opacity-40 hover:opacity-100"
            }`}
          >
            {nav.icon} {nav.label[lang]}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-4xl flex-grow flex flex-col items-center">
        {/* ─── SHUFFLE VIEW ─── */}
        {view === "shuffle" && (
          <div
            className="flex flex-col items-center w-full animate-zoom-in"
            key={currentItem.id + "-shuffle"}
          >
            <div
              className={`w-72 h-72 md:w-96 md:h-96 border-[12px] rounded-full flex items-center justify-center p-16 mb-8 transition-all relative overflow-hidden ${
                isDark
                  ? "bg-black border-stone-800"
                  : "bg-white border-stone-900 shadow-2xl"
              }`}
            >
              <div
                className={`relative z-10 w-full h-full ${
                  isDark ? "text-stone-300" : "text-stone-900"
                }`}
              >
                {currentItem.symbol("w-full h-full")}
              </div>
              {timeLeft > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                  <span className="text-6xl font-black text-white font-mono">
                    {timeLeft}s
                  </span>
                </div>
              )}
            </div>

            <div className="text-center mb-10 px-4">
              <h2
                className={`text-4xl font-black uppercase tracking-tighter mb-2 ${
                  isDark ? "text-white" : "text-stone-900"
                }`}
              >
                {currentItem.title[lang]}
              </h2>
              <p
                className={`text-lg max-w-md leading-tight font-medium italic ${
                  isDark ? "text-stone-400" : "text-stone-500"
                }`}
              >
                &ldquo;{currentItem.desc[lang]}&rdquo;
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleShuffle}
                className={`px-10 py-5 rounded-2xl text-xl font-black transition-all active:scale-95 shadow-xl cursor-pointer ${
                  isDark
                    ? "bg-stone-100 text-stone-900 hover:bg-white"
                    : "bg-stone-900 text-white hover:bg-stone-800"
                }`}
              >
                {lang === "pl" ? "NOWY OBIEKT" : "NEW OBJECT"}
              </button>
              <button
                onClick={startTension}
                className={`p-5 rounded-2xl transition-all shadow-xl cursor-pointer ${
                  isDark
                    ? "bg-stone-800 text-amber-400"
                    : "bg-amber-100 text-amber-900"
                }`}
                title="Production Tension Mode"
              >
                <Zap size={24} />
              </button>
            </div>
          </div>
        )}

        {/* ─── SEQUENCE VIEW ─── */}
        {view === "sequence" && (
          <div className="w-full flex flex-col items-center animate-slide-up">
            {sequence.length === 0 ? (
              <div
                className={`w-full py-24 border-4 border-dashed rounded-3xl text-center ${
                  isDark
                    ? "border-stone-800 bg-stone-900/20"
                    : "border-stone-300 bg-white/50"
                }`}
              >
                <Music size={48} className="mx-auto mb-6 opacity-20" />
                <p className="font-bold mb-6 opacity-40 uppercase tracking-widest">
                  {lang === "pl"
                    ? "Generuj absolutną dekompozycję"
                    : "Generate absolute decomposition"}
                </p>
                <button
                  onClick={() => generateSequence()}
                  className={`px-8 py-4 rounded-2xl font-black uppercase cursor-pointer ${
                    isDark
                      ? "bg-stone-100 text-stone-900"
                      : "bg-stone-900 text-white"
                  }`}
                >
                  {lang === "pl" ? "START KOMPOZYCJI" : "START COMPOSITION"}
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center">
                {/* Sequence dots */}
                <div className="flex gap-2 mb-12 overflow-x-auto p-4 w-full justify-center no-scrollbar">
                  {sequence.map((item, i) => (
                    <div
                      key={i}
                      className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black transition-all ${
                        i === seqIndex
                          ? isDark
                            ? "bg-stone-100 text-stone-900 border-white scale-125"
                            : "bg-stone-900 text-white border-stone-900 scale-125"
                          : isDark
                            ? "bg-stone-900 border-stone-800 text-stone-700"
                            : "bg-white border-stone-200 text-stone-300"
                      }`}
                    >
                      {item.id}
                    </div>
                  ))}
                </div>

                {/* Current sequence symbol */}
                <div
                  className={`w-64 h-64 border-8 rounded-3xl flex items-center justify-center p-12 mb-8 shadow-2xl ${
                    isDark
                      ? "bg-stone-900 border-stone-800"
                      : "bg-white border-stone-900"
                  }`}
                >
                  {sequence[seqIndex].symbol(
                    `w-full h-full ${isDark ? "text-white" : "text-stone-900"}`,
                  )}
                </div>

                <div className="text-center mb-12">
                  <h3 className="text-3xl font-black uppercase mb-3">
                    {sequence[seqIndex].title[lang]}
                  </h3>
                  <p className="text-stone-500 italic max-w-sm px-4">
                    &ldquo;{sequence[seqIndex].desc[lang]}&rdquo;
                  </p>
                </div>

                <div className="flex gap-6">
                  <button
                    onClick={() => generateSequence()}
                    className={`p-5 rounded-2xl transition-colors cursor-pointer ${
                      isDark
                        ? "bg-stone-800 text-stone-400"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    <RotateCcw size={28} />
                  </button>
                  <button
                    onClick={nextInSequence}
                    disabled={seqIndex === sequence.length - 1}
                    className={`flex items-center gap-4 px-12 py-5 rounded-2xl text-2xl font-black disabled:opacity-10 shadow-lg cursor-pointer ${
                      isDark
                        ? "bg-stone-100 text-stone-900"
                        : "bg-stone-900 text-white"
                    }`}
                  >
                    {lang === "pl" ? "DALEJ" : "NEXT"}
                    <ChevronRight size={32} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── CATALOG VIEW ─── */}
        {view === "catalog" && (
          <div className="w-full animate-fade-in pb-12">
            <h2 className="text-2xl font-black uppercase mb-8 text-center tracking-widest opacity-40">
              {lang === "pl" ? "Zbiór Obiektów" : "Object Collection"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {DATA.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setCurrentItem(item)
                    setView("shuffle")
                  }}
                  className={`group relative p-6 rounded-3xl border-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 ${
                    isDark
                      ? "bg-stone-900 border-stone-800 hover:border-stone-600"
                      : "bg-white border-stone-200 hover:border-stone-900 shadow-sm hover:shadow-xl"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-16 h-16 flex-shrink-0 p-2 rounded-xl transition-colors ${
                        isDark
                          ? "bg-black text-stone-400"
                          : "bg-stone-100 text-stone-900"
                      }`}
                    >
                      {item.symbol("w-full h-full")}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold opacity-30">
                          [{item.id}]
                        </span>
                        <h3 className="font-black uppercase text-sm tracking-tight">
                          {item.title[lang]}
                        </h3>
                      </div>
                      <p className="text-[10px] leading-snug opacity-60 line-clamp-3">
                        {item.desc[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── MANIFESTO / THEORY VIEW ─── */}
        {view === "manifesto" && (
          <div className="w-full max-w-3xl animate-fade-in space-y-8 pb-20">
            {/* Header section with Irzykowski quote */}
            <section
              className={`p-8 rounded-3xl border-l-8 ${
                isDark
                  ? "bg-stone-900 border-amber-600"
                  : "bg-white border-stone-900 shadow-lg"
              }`}
            >
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                <Quote size={20} className="text-amber-500" />
                {lang === "pl" ? "Fundament Snu" : "Foundation of Dream"}
              </h3>
              <p
                className="text-2xl italic opacity-90 leading-tight mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {lang === "pl"
                  ? "„...przez szereg lat prowadziła życie pełne fantomowych snów”"
                  : "“...for several years she had led a life full of phantom dreams”"}
              </p>
              <p className="text-[10px] uppercase tracking-widest opacity-40">
                Karol Irzykowski, Pałuba (Sny Marii Dunin)
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Instrumental Actor */}
              <section
                className={`p-6 rounded-3xl ${
                  isDark
                    ? "bg-stone-900 border border-stone-800"
                    : "bg-stone-50 border border-stone-200 shadow-sm"
                }`}
              >
                <h4 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                  <Layers size={18} className="text-amber-500" />
                  {lang === "pl"
                    ? "Aktor jako Instrument"
                    : "Actor as Instrument"}
                </h4>
                <p className="text-xs leading-relaxed opacity-70 mb-4">
                  {lang === "pl"
                    ? 'Aktor to artysta działający pomiędzy muzyką a teatrem. Jest "nastrojony jak instrument", traktuje swoją obecność abstrakcyjnie – jak dźwięk w partyturze.'
                    : 'The actor is an artist working between music and theater. He is "tuned like an instrument", treats his presence abstractly – like a sound in a score.'}
                </p>
                <ul className="text-[10px] space-y-2 font-mono opacity-80 italic">
                  <li>
                    •{" "}
                    {lang === "pl"
                      ? "Ciało jako źródło dźwięku (szuranie, chrupanie, bełkot)"
                      : "Body as a sound source (shuffling, crunching, gibberish)"}
                  </li>
                  <li>
                    •{" "}
                    {lang === "pl"
                      ? "Konkretne rekwizyty: piła, Linki, piłeczki ping-pongowe"
                      : "Concrete props: saw, strings, ping-pong balls"}
                  </li>
                  <li>
                    •{" "}
                    {lang === "pl"
                      ? "Audiowizualność: gest ewokuje muzykę"
                      : "Audiovisuality: gesture evokes music"}
                  </li>
                </ul>
              </section>

              {/* Absolute Decomposition */}
              <section
                className={`p-6 rounded-3xl ${
                  isDark
                    ? "bg-stone-900 border border-stone-800"
                    : "bg-stone-50 border border-stone-200 shadow-sm"
                }`}
              >
                <h4 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                  <RotateCcw size={18} className="text-amber-500" />
                  {lang === "pl"
                    ? "Absolutna Dekompozycja"
                    : "Absolute Decomposition"}
                </h4>
                <p className="text-xs leading-relaxed opacity-70 mb-4">
                  {lang === "pl"
                    ? "Koncepcja zakładająca całkowitą swobodę w układzie elementów w czasie. Forma nie jest zamknięta, dopóki materiał nie zmanifestuje się w działaniu."
                    : "A concept assuming complete freedom in the arrangement of elements in time. The form is not closed until the material manifests itself in action."}
                </p>
                <div
                  className={`p-3 rounded-xl text-[9px] font-bold ${isDark ? "bg-black" : "bg-white"}`}
                >
                  {lang === "pl"
                    ? "ZASADA: Brak ostatecznej formy (No final form)."
                    : "PRINCIPLE: No final form."}
                </div>
              </section>

              {/* Production Tension */}
              <section
                className={`p-6 rounded-3xl ${
                  isDark
                    ? "bg-stone-900 border border-stone-800"
                    : "bg-stone-50 border border-stone-200 shadow-sm"
                }`}
              >
                <h4 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-amber-500" />
                  {lang === "pl"
                    ? "Napięcie Produkcyjne"
                    : "Production Tension"}
                </h4>
                <p className="text-xs leading-relaxed opacity-70">
                  {lang === "pl"
                    ? "Nie jest to czysta improwizacja. To specyficzny stan napięcia wynikający z nieokreśloności partytury, który zmusza wykonawcę do bycia reżyserem własnej partii w czasie rzeczywistym."
                    : "It is not a pure improvisation. It is a specific state of tension resulting from the indefiniteness of the score, which forces the performer to be the director of their own part in real time."}
                </p>
              </section>

              {/* Light Structure */}
              <section
                className={`p-6 rounded-3xl ${
                  isDark
                    ? "bg-stone-900 border border-stone-800"
                    : "bg-stone-50 border border-stone-200 shadow-sm"
                }`}
              >
                <h4 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                  <Info size={18} className="text-amber-500" />
                  {lang === "pl"
                    ? "Struktura i Światło"
                    : "Structure and Light"}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-black text-center">
                  <div
                    className={`p-3 rounded-xl flex flex-col items-center gap-1 ${isDark ? "bg-black" : "bg-white"}`}
                  >
                    <Moon size={14} /> {lang === "pl" ? "Ciemność" : "Darkness"}
                  </div>
                  <div
                    className={`p-3 rounded-xl flex flex-col items-center gap-1 ${isDark ? "bg-black" : "bg-white"}`}
                  >
                    <Sun size={14} /> {lang === "pl" ? "Światło" : "Light"}
                  </div>
                </div>
                <p className="text-[9px] mt-3 opacity-50 italic">
                  {lang === "pl"
                    ? "Część I: Fantomowy sen w mroku. Część II: Ostra konfrontacja w pełnym blasku."
                    : "Part I: Phantom dream in the dark. Part II: Sharp confrontation in full glare."}
                </p>
              </section>
            </div>

            {/* Historical context grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  label: "MW2",
                  value: "1963",
                  sub: { pl: "Kraków", en: "Cracow" },
                },
                {
                  label: "SCANDAL",
                  value: "1964",
                  sub: { pl: "Premiera", en: "Premiere" },
                },
                {
                  label: "ACTOR",
                  value: "PESZEK",
                  sub: { pl: "Interpretator", en: "Interpreter" },
                },
                {
                  label: "GENRE",
                  value: "TIS",
                  sub: { pl: "Instrumentalny", en: "Instrumental" },
                },
              ].map((box, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl text-center flex flex-col justify-center ${
                    isDark
                      ? "bg-stone-900 border border-stone-800"
                      : "bg-white shadow-sm border border-stone-100"
                  }`}
                >
                  <div className="text-[9px] opacity-40 uppercase font-black">
                    {box.label}
                  </div>
                  <div className="text-xl font-black">{box.value}</div>
                  <div className="text-[9px] opacity-40 uppercase">
                    {box.sub[lang]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center max-w-md pb-8">
        <div
          className={`text-[10px] font-mono mb-4 px-4 py-2 rounded border inline-block ${
            isDark
              ? "border-stone-800 text-stone-500"
              : "border-stone-200 text-stone-400"
          }`}
        >
          {lang === "pl" ? "ESTETYKA:" : "AESTHETICS:"}
          <span className="ml-1 opacity-80">
            {lang === "pl"
              ? "Rozbieżność między reprezentacją a rzeczywistością."
              : "Discrepancy between representation and reality."}
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
