// ─── Teksty interfejsu ────────────────────────────────────────────
//
// Wszystkie napisy widoczne dla użytkownika siedzą w tym pliku, a nie w JSX.
// Dzięki temu poprawka tłumaczenia nie wymaga grzebania w układzie strony.
//
// UWAGA na cudzyslowy: znaki U+201C i U+201D potrafia zamknac string JS
// przedwczesnie (CLAUDE.md, zasada 6). Dlatego cudzyslowy drukarskie zapisujemy
// escape'ami postaci uXXXX — wyglad zostaje, a mina znika.

export type Lang = "pl" | "en"
export type Loc<T = string> = { readonly pl: T; readonly en: T }

export const UI = {
  // — nagłówek i sterowanie —
  ariaStage: {
    pl: "Przełącz oświetlenie sceny",
    en: "Toggle stage lighting",
  },
  ariaLang: {
    pl: "Zmień język na angielski",
    en: "Switch language to Polish",
  },
  ariaFullscreenOn: { pl: "Pełny ekran", en: "Enter fullscreen" },
  ariaFullscreenOff: {
    pl: "Wyjdź z pełnego ekranu",
    en: "Exit fullscreen",
  },

  // — nawigacja —
  navRandom: { pl: "LOSUJ", en: "RANDOM" },
  navScore: { pl: "SCORE", en: "SCORE" },
  navCatalog: { pl: "KATALOG", en: "CATALOG" },
  navTheory: { pl: "TEORIA", en: "THEORY" },

  // — widok LOSUJ —
  newObject: { pl: "NOWY OBIEKT", en: "NEW OBJECT" },
  tensionStart: {
    pl: "Napięcie produkcyjne — losuj po chwili",
    en: "Production tension — draw after a while",
  },
  tensionStop: {
    pl: "Przerwij napięcie produkcyjne",
    en: "Cancel production tension",
  },

  // — widok SCORE —
  seqEmpty: {
    pl: "Generuj absolutną dekompozycję",
    en: "Generate absolute decomposition",
  },
  seqStart: { pl: "START KOMPOZYCJI", en: "START COMPOSITION" },
  seqNext: { pl: "DALEJ", en: "NEXT" },
  seqBack: { pl: "WSTECZ", en: "BACK" },
  seqRegenerate: { pl: "Nowa partytura", en: "New score" },
  seqLength: { pl: "Długość partytury", en: "Score length" },
  seqStep: { pl: "Krok", en: "Step" },

  // — widok KATALOG —
  catalogTitle: { pl: "Zbiór Obiektów", en: "Object Collection" },

  // — widok TEORIA —
  theoryFoundation: { pl: "Fundament Snu", en: "Foundation of Dream" },
  theoryQuote: {
    pl: "\u201E...przez szereg lat prowadziła życie pełne fantomowych snów\u201D",
    en: "\u201C...for several years she had led a life full of phantom dreams\u201D",
  },

  theoryActorTitle: {
    pl: "Aktor jako Instrument",
    en: "Actor as Instrument",
  },
  theoryActorBody: {
    pl: "Aktor to artysta działający pomiędzy muzyką a teatrem. Jest \u201Enastrojony jak instrument\u201D, traktuje swoją obecność abstrakcyjnie – jak dźwięk w partyturze.",
    en: "The actor is an artist working between music and theater. He is \u201Ctuned like an instrument\u201D, treats his presence abstractly – like a sound in a score.",
  },
  theoryActorBullets: {
    pl: [
      "Ciało jako źródło dźwięku (szuranie, chrupanie, bełkot)",
      "Konkretne rekwizyty: piła, Linki, piłeczki ping-pongowe",
      "Audiowizualność: gest ewokuje muzykę",
    ],
    en: [
      "Body as a sound source (shuffling, crunching, gibberish)",
      "Concrete props: saw, strings, ping-pong balls",
      "Audiovisuality: gesture evokes music",
    ],
  },

  theoryDecompTitle: {
    pl: "Absolutna Dekompozycja",
    en: "Absolute Decomposition",
  },
  theoryDecompBody: {
    pl: "Koncepcja zakładająca całkowitą swobodę w układzie elementów w czasie. Forma nie jest zamknięta, dopóki materiał nie zmanifestuje się w działaniu.",
    en: "A concept assuming complete freedom in the arrangement of elements in time. The form is not closed until the material manifests itself in action.",
  },
  theoryDecompPrinciple: {
    pl: "ZASADA: Brak ostatecznej formy (No final form).",
    en: "PRINCIPLE: No final form.",
  },

  theoryTensionTitle: {
    pl: "Napięcie Produkcyjne",
    en: "Production Tension",
  },
  theoryTensionBody: {
    pl: "Nie jest to czysta improwizacja. To specyficzny stan napięcia wynikający z nieokreśloności partytury, który zmusza wykonawcę do bycia reżyserem własnej partii w czasie rzeczywistym.",
    en: "It is not a pure improvisation. It is a specific state of tension resulting from the indefiniteness of the score, which forces the performer to be the director of their own part in real time.",
  },

  theoryLightTitle: { pl: "Struktura i Światło", en: "Structure and Light" },
  theoryDarkness: { pl: "Ciemność", en: "Darkness" },
  theoryLight: { pl: "Światło", en: "Light" },
  theoryLightNote: {
    pl: "Część I: Fantomowy sen w mroku. Część II: Ostra konfrontacja w pełnym blasku.",
    en: "Part I: Phantom dream in the dark. Part II: Sharp confrontation in full glare.",
  },

  // — stopka —
  footerLabel: { pl: "ESTETYKA:", en: "AESTHETICS:" },
  footerText: {
    pl: "Rozbieżność między reprezentacją a rzeczywistością.",
    en: "Discrepancy between representation and reality.",
  },
} as const satisfies Record<string, Loc<string> | Loc<readonly string[]>>

// Napisy, które nie podlegają tłumaczeniu.
export const APP_TITLE = "TIS-Lab"
export const APP_BADGE = "MW2"
export const APP_SUBTITLE = "Stage Composition Tool"
export const QUOTE_SOURCE = "Karol Irzykowski, Pałuba (Sny Marii Dunin)"

// Kontekst historyczny — etykiety i wartości są nazwami własnymi,
// tłumaczy się tylko podpis.
export const HISTORY: ReadonlyArray<{
  label: string
  value: string
  sub: Loc
}> = [
  { label: "MW2", value: "1963", sub: { pl: "Kraków", en: "Cracow" } },
  { label: "SCANDAL", value: "1964", sub: { pl: "Premiera", en: "Premiere" } },
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
]
