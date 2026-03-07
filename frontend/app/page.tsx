import Link from "next/link";

// FireRed / LeafGreen Game Boy Advance pixel sprites (all Gen-I / Kanto)
const FR = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/${id}.png`;

const CARDS = [
  { id: 6,   name: "CHARIZARD",  type: "FIRE/FLYING",  bg: "#ffc8a0", accent: "#c05000" },
  { id: 25,  name: "PIKACHU",    type: "ELECTRIC",     bg: "#fff0a0", accent: "#b08000" },
  { id: 3,   name: "VENUSAUR",   type: "GRASS/POISON", bg: "#b8e8a0", accent: "#2a6020" },
  { id: 9,   name: "BLASTOISE",  type: "WATER",        bg: "#a0c8f8", accent: "#1048a0" },
  { id: 150, name: "MEWTWO",     type: "PSYCHIC",      bg: "#e8b8f8", accent: "#701090" },
  { id: 130, name: "GYARADOS",   type: "WATER/FLYING", bg: "#90e0f8", accent: "#005888" },
  { id: 143, name: "SNORLAX",    type: "NORMAL",       bg: "#d8c8a8", accent: "#504030" },
];

const px = {
  card: { border: "3px solid #000", boxShadow: "4px 4px 0 0 #000" },
  cardHover: {},
  badge: { fontSize: "7px", background: "rgba(255,255,255,0.65)", padding: "3px 7px", border: "1px solid #000", display: "inline-block" } as React.CSSProperties,
  sprite: { imageRendering: "pixelated" } as React.CSSProperties,
  font: { fontFamily: "var(--font-pixel, 'Courier New', monospace)" } as React.CSSProperties,
};

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#ddd8b0", ...px.font }}>

      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: "#1a1c2c", borderBottom: "4px solid #000" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13" fill="white" stroke="white" strokeWidth="2"/>
            <path d="M1 14 Q1 1 14 1 Q27 1 27 14Z" fill="#e3342f"/>
            <rect x="1" y="13" width="26" height="2" fill="white"/>
            <circle cx="14" cy="14" r="4" fill="#1a1c2c" stroke="white" strokeWidth="2"/>
            <circle cx="14" cy="14" r="2" fill="#e3342f"/>
          </svg>
          <span style={{ color: "#fff", fontSize: "10px", letterSpacing: "1px" }}>PALLET PORTAL</span>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            style={{ color: "#8899a0", fontSize: "8px", border: "2px solid #445566", padding: "6px 12px" }}
            className="transition-opacity hover:opacity-80"
          >
            SIGN IN
          </Link>
          <Link
            href="/register"
            style={{ color: "#1a1c2c", fontSize: "8px", background: "#98e060", border: "2px solid #98e060", padding: "6px 12px", boxShadow: "2px 2px 0 0 #000" }}
            className="transition-transform hover:-translate-y-px"
          >
            SIGN UP
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-5">

          {/* ── Left: card grid ── */}
          <div className="flex-1">
            <div
              className="grid grid-cols-2 md:grid-cols-3 gap-3"
              style={{ gridAutoRows: "200px" }}
            >
              <div
                className="row-span-2 relative flex flex-col justify-between p-4 cursor-pointer group overflow-hidden"
                style={{ background: CARDS[0].bg, ...px.card }}
              >
                <div>
                  <p style={{ fontSize: "7px", color: CARDS[0].accent, marginBottom: "4px" }}>{CARDS[0].type}</p>
                  <p style={{ fontSize: "12px" }}>{CARDS[0].name}</p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FR(CARDS[0].id)} alt={CARDS[0].name}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-200"
                  style={px.sprite}
                />
                <span style={{ ...px.badge, color: CARDS[0].accent }}>{CARDS[0].type}</span>
              </div>

              <div
                className="relative flex flex-col justify-between p-4 cursor-pointer group overflow-hidden"
                style={{ background: CARDS[1].bg, ...px.card }}
              >
                <div className="flex justify-between items-start">
                  <p style={{ fontSize: "11px" }}>{CARDS[1].name}</p>
                  <span style={{ fontSize: "12px" }}>↗</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FR(CARDS[1].id)} alt={CARDS[1].name}
                  className="absolute bottom-2 right-2 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-200"
                  style={px.sprite}
                />
              </div>

              <div
                className="relative flex flex-col justify-between p-4 cursor-pointer group overflow-hidden"
                style={{ background: CARDS[2].bg, ...px.card }}
              >
                <div className="flex gap-2 items-center flex-wrap">
                  <span style={{ fontSize: "7px", background: "rgba(255,255,255,0.65)", padding: "3px 6px", border: "1px solid #000" }}>🏆 WIN</span>
                  <span style={{ fontSize: "7px", background: "#e07000", color: "#fff", padding: "3px 6px", border: "1px solid #000" }}>REWARDS</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FR(CARDS[2].id)} alt={CARDS[2].name}
                  className="absolute bottom-2 right-2 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-200"
                  style={px.sprite}
                />
              </div>

              <div
                className="relative flex flex-col justify-between p-4 cursor-pointer group overflow-hidden"
                style={{ background: CARDS[3].bg, ...px.card }}
              >
                <span style={{ fontSize: "12px", alignSelf: "flex-end", display: "block" }}>↗</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FR(CARDS[3].id)} alt={CARDS[3].name}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 object-contain opacity-35 group-hover:opacity-90 transition-opacity duration-200"
                  style={px.sprite}
                />
                <p style={{ fontSize: "11px", lineHeight: "2" }}>GUESS<br/>WHO?</p>
              </div>

              <div
                className="relative flex flex-col justify-end p-4 cursor-pointer group overflow-hidden"
                style={{ background: CARDS[4].bg, ...px.card }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FR(CARDS[4].id)} alt={CARDS[4].name}
                  className="absolute top-1 right-1 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-200"
                  style={px.sprite}
                />
                <span style={{ ...px.badge, color: CARDS[4].accent, marginBottom: "4px" }}>{CARDS[4].type}</span>
                <p style={{ fontSize: "11px" }}>{CARDS[4].name}</p>
              </div>

              <div
                className="relative flex flex-col justify-between p-4 cursor-pointer group overflow-hidden"
                style={{ background: CARDS[5].bg, ...px.card }}
              >
                <div className="flex justify-between items-start">
                  <p style={{ fontSize: "11px" }}>{CARDS[5].name}</p>
                  <span style={{ fontSize: "12px" }}>↗</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={FR(CARDS[5].id)} alt={CARDS[5].name}
                  className="absolute bottom-2 right-2 w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-200"
                  style={px.sprite}
                />
              </div>

            </div>

          </div>

          {/* ── Right: sidebar ── */}
          <aside className="lg:w-64 flex flex-col gap-4">

            {/* Description */}
            <div style={{ background: "#fff", ...px.card, padding: "20px" }}>
              <p style={{ fontSize: "7px", color: "#888", marginBottom: "8px", letterSpacing: "1px" }}>BEM-VINDO AO</p>
              <p style={{ fontSize: "13px", lineHeight: "2", marginBottom: "12px" }}>PALLET<br/>PORTAL!</p>
              <p style={{ fontSize: "8px", color: "#555", lineHeight: "2" }}>
                Mergulhe na coleção de Pokémons lendários da região de Kanto.
              </p>
              <p style={{ fontSize: "8px", color: "#555", lineHeight: "2", marginTop: "8px" }}>
                Mostre que você é o melhor treinador de Pallet!
              </p>
              <p style={{ fontSize: "7px", color: "#888", marginTop: "12px" }}>DESCOBRIR MAIS &raquo;</p>
            </div>

            {/* [6] SNORLAX highlight */}
            <div
              className="relative flex flex-col gap-2 p-5 overflow-hidden"
              style={{ background: CARDS[6].bg, ...px.card }}
            >
              <p style={{ fontSize: "13px" }}>{CARDS[6].name}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FR(CARDS[6].id)} alt={CARDS[6].name}
                className="w-28 h-28 object-contain mx-auto"
                style={px.sprite}
              />
              <div className="flex items-center justify-between mt-1">
                <span style={{ ...px.badge, color: CARDS[6].accent }}>{CARDS[6].type}</span>
                <span style={{ ...px.badge, color: CARDS[6].accent }}>LVL 100</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/register"
              className="text-center transition-transform hover:-translate-y-px"
              style={{ background: "#1a1c2c", color: "#98e060", fontSize: "9px", padding: "16px 12px", border: "2px solid #000", boxShadow: "4px 4px 0 0 #000", display: "block", lineHeight: "1.8" }}
            >
              COMEÇAR — É GRÁTIS ✦
            </Link>
          </aside>

        </div>

      </main>
    </div>
  );
}
