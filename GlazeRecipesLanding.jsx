import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";

const recipes = [
  {
    id: "deep-sea",
    name: "The Deep Sea Look",
    palette: ["Stormy Grey", "Deep Teal", "Cream"],
    mood: "Glossy teal breaks over storm-grey edges.",
    gradient: "from-[#111820] via-[#1f5f62] to-[#d8c8aa]",
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "rustic-forest",
    name: "Rustic Forest",
    palette: ["Dark Green", "Oatmeal Beige", "Iron Speckle"],
    mood: "Earthy greens with warm, freckled clay movement.",
    gradient: "from-[#1f2d22] via-[#3b5c3a] to-[#c4a882]",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "desert-sand",
    name: "Desert Sand",
    palette: ["Oatmeal Beige", "Cream", "Fired Ochre"],
    mood: "Soft matte neutrals with fired terracotta warmth.",
    gradient: "from-[#6f4a2f] via-[#c4a882] to-[#eee3cf]",
    image:
      "https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "smoke-ember",
    name: "Smoke & Ember",
    palette: ["Charcoal Satin", "Fired Terracotta", "Ash White"],
    mood: "Dark clay drama with a hot ember accent.",
    gradient: "from-[#202428] via-[#cc5500] to-[#f0e3cf]",
    image:
      "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=900&q=80",
  },
];

function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function IconHeart(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 21s-7.1-4.32-9.6-8.38C.28 9.18 1.82 5 5.73 5c2.13 0 3.5 1.19 4.27 2.26C10.77 6.19 12.14 5 14.27 5c3.91 0 5.45 4.18 3.33 7.62C19.1 16.68 12 21 12 21Z" />
    </svg>
  );
}

function IconArrow(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function RecipeCard({ recipe, index, active, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-13, 13]);
  const opacity = useTransform(x, [-240, -120, 0, 120, 240], [0.86, 0.96, 1, 0.96, 0.86]);
  const yesOpacity = useTransform(x, [32, 150], [0, 1]);
  const noOpacity = useTransform(x, [-150, -32], [1, 0]);
  const tint = useTransform(
    x,
    [-220, 0, 220],
    ["rgba(127, 29, 29, .42)", "rgba(0, 0, 0, 0)", "rgba(36, 84, 54, .42)"]
  );

  return (
    <motion.article
      className="absolute inset-0 cursor-grab overflow-hidden rounded-[2rem] border border-white/15 bg-[#171b1f] shadow-[0_30px_90px_rgba(0,0,0,.45)] active:cursor-grabbing"
      style={{
        x,
        rotate: active ? rotate : index % 2 ? -2 : 2,
        opacity,
        zIndex: 20 - index,
        scale: active ? 1 : 1 - index * 0.045,
        y: index * 14,
      }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.82}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120 || info.velocity.x > 720) onSwipe("right");
        if (info.offset.x < -120 || info.velocity.x < -720) onSwipe("left");
      }}
      initial={{ scale: 0.96, y: 28, opacity: 0 }}
      animate={{ scale: active ? 1 : 1 - index * 0.045, y: index * 14, opacity: 1 }}
      exit={{
        x: x.get() >= 0 ? 520 : -520,
        rotate: x.get() >= 0 ? 18 : -18,
        opacity: 0,
        transition: { duration: 0.28 },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${recipe.gradient}`} />
      <img
        src={recipe.image}
        alt={`${recipe.name} pottery recipe look`}
        className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-75"
        draggable="false"
      />
      <motion.div className="absolute inset-0" style={{ backgroundColor: tint }} />

      <motion.div
        className="absolute left-6 top-6 rounded-full border border-red-300/40 bg-red-950/50 px-5 py-2 text-sm font-bold uppercase tracking-[0.24em] text-red-100"
        style={{ opacity: noOpacity }}
      >
        Skip
      </motion.div>
      <motion.div
        className="absolute right-6 top-6 rounded-full border border-emerald-200/40 bg-emerald-950/50 px-5 py-2 text-sm font-bold uppercase tracking-[0.24em] text-emerald-100"
        style={{ opacity: yesOpacity }}
      >
        Love
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121416] via-[#121416]/86 to-transparent p-7 pt-28">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#efb277]">
          Recipe Look
        </p>
        <h3 className="font-serif text-4xl leading-none text-stone-50">{recipe.name}</h3>
        <p className="mt-3 max-w-sm text-sm leading-6 text-stone-200/78">{recipe.mood}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {recipe.palette.map((color) => (
            <span
              key={color}
              className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs text-stone-100/86"
            >
              {color}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

function SwipeDeck() {
  const [cards, setCards] = useState(recipes);
  const [toast, setToast] = useState("");
  const [loved, setLoved] = useState([]);

  const topCard = cards[0];

  function swipe(direction) {
    if (!topCard) {
      setCards(recipes);
      setToast("Deck refreshed. Pick another recipe look.");
      return;
    }

    if (direction === "right") {
      setLoved((items) => [...items, topCard.name]);
      setToast("Added 3 colors to your €29 Base Set!");
    } else {
      setToast("Skipped. Next recipe ready.");
    }

    setCards((items) => items.slice(1));
    window.setTimeout(() => setToast(""), 2200);
  }

  return (
    <section id="swipe-deck" className="relative overflow-hidden bg-[#202529] px-6 py-24 text-stone-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(204,85,0,.22),transparent_30%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[length:auto,42px_42px,42px_42px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.88fr_1.12fr]">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#efb277]">
            Recipe Swipe Deck
          </p>
          <h2 className="font-serif text-5xl leading-[.98] text-stone-50 md:text-6xl">
            Swipe through finishes. Build without overthinking.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-200/72">
            Love a look and we add its three-color palette to your €29 Base Set. Swipe left when it is not your kiln's mood.
          </p>
          <div className="mt-8 rounded-2xl border border-white/12 bg-white/[.06] p-5 text-sm leading-6 text-stone-200/70 backdrop-blur">
            <strong className="block text-stone-50">Pricing:</strong>
            €29 Base Set includes 3 colors, 50ml each. Add extra pots for €5 per color.
          </div>
          {loved.length > 0 && (
            <p className="mt-4 text-sm text-stone-300/80">
              Loved looks: <span className="text-[#efb277]">{loved.join(", ")}</span>
            </p>
          )}
        </div>

        <div className="mx-auto w-full max-w-[430px]">
          <div className="relative h-[590px]">
            <AnimatePresence>
              {cards.slice(0, 3).map((recipe, index) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  index={index}
                  active={index === 0}
                  onSwipe={swipe}
                />
              ))}
            </AnimatePresence>

            {!cards.length && (
              <div className="absolute inset-0 grid place-items-center rounded-[2rem] border border-white/12 bg-[#171b1f] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,.42)]">
                <div>
                  <h3 className="font-serif text-4xl">All looks reviewed.</h3>
                  <p className="mt-3 text-stone-300/70">Refresh the deck or jump to the waitlist.</p>
                  <button
                    type="button"
                    onClick={() => setCards(recipes)}
                    className="mt-7 rounded-full bg-[#CC5500] px-6 py-3 font-semibold text-white shadow-lg shadow-black/25"
                  >
                    Refresh deck
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => swipe("left")}
              className="grid h-16 w-16 place-items-center rounded-full border border-white/12 bg-white/[.07] text-stone-100 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:bg-white/[.11]"
              aria-label="Skip recipe"
            >
              <IconX className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={() => swipe("right")}
              className="grid h-20 w-20 place-items-center rounded-full bg-[#CC5500] text-white shadow-2xl shadow-[#CC5500]/25 transition hover:-translate-y-1 hover:bg-[#d86627]"
              aria-label="Love recipe"
            >
              <IconHeart className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-white/14 bg-[#111416]/92 px-5 py-4 text-center font-semibold text-stone-50 shadow-2xl backdrop-blur"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function GlazeRecipesLanding() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const heroStats = useMemo(
    () => [
      ["€29", "Base Set"],
      ["3", "50ml colors"],
      ["€5", "extra pot"],
    ],
    []
  );

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <main className="min-h-screen bg-[#2A2F33] text-stone-50">
      <section className="relative isolate overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-[#2A2F33]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_10%,rgba(204,85,0,.24),transparent_30%),linear-gradient(120deg,rgba(17,20,22,.94),rgba(42,47,51,.72)),url('https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-95" />

        <nav className="mx-auto mb-24 flex max-w-6xl items-center justify-between">
          <a href="#" className="font-serif text-2xl font-bold tracking-tight">
            Glaze<span className="text-[#CC5500]">Recipes</span>
          </a>
          <a
            href="#waitlist"
            className="rounded-full border border-white/14 bg-white/[.07] px-5 py-2.5 text-sm font-semibold text-stone-100 backdrop-blur transition hover:bg-white/[.12]"
          >
            Join waitlist
          </a>
        </nav>

        <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#efb277]/30 bg-[#efb277]/10 px-4 py-2 text-sm font-semibold text-[#f1c28e]">
              Custom 3-color glaze sets for small studio runs
            </p>
            <h1 className="max-w-4xl font-serif text-6xl leading-[.92] tracking-tight text-stone-50 md:text-8xl">
              Stop paying €80 for glazes you'll never finish.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-stone-100/78">
              Build a custom €29 Base Set: pick 3 colors, 50ml each. Buy what you brush. Stop letting €20 jars dry out on your shelf.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#swipe-deck"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#CC5500] px-7 py-4 font-bold text-white shadow-2xl shadow-[#CC5500]/20 transition hover:-translate-y-1 hover:bg-[#d86627]"
              >
                Start swiping <IconArrow className="h-5 w-5" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/[.07] px-7 py-4 font-bold text-stone-100 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[.12]"
              >
                How it works
              </a>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 overflow-hidden rounded-3xl border border-white/12 bg-black/20 backdrop-blur">
              {heroStats.map(([value, label]) => (
                <div key={label} className="border-r border-white/10 p-5 last:border-r-0">
                  <strong className="block text-2xl text-[#efb277]">{value}</strong>
                  <span className="text-sm text-stone-200/62">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/12 bg-[#161a1d]/76 p-5 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur">
            <div className="aspect-[4/3] rounded-[1.5rem] bg-[linear-gradient(135deg,#111820,#2d6b6b,#c4a882,#eee3d1)] p-8">
              <div className="flex h-full flex-col justify-end rounded-[1rem] border border-white/16 bg-black/20 p-6">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#efb277]">First Drop</p>
                <h2 className="mt-3 font-serif text-4xl">Deep Sea Look</h2>
                <p className="mt-3 max-w-sm text-stone-100/70">
                  Three studio-ready pots plus the recipe card for layering, firing, and test tiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SwipeDeck />

      <section id="how-it-works" className="bg-[#171b1f] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.24em] text-[#efb277]">How it works</p>
          <h2 className="max-w-3xl font-serif text-5xl leading-tight md:text-6xl">
            From swipe to kiln shelf in three steps.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Swipe & build your 3-color set.", "Pick the looks you love and start with a €29 Base Set."],
              ["02", "Receive studio-ready 50ml pots.", "Secure, studio-ready packaging keeps every pot sealed and bench-ready."],
              ["03", "Fire with the included recipe card.", "Layering guidance, firing notes, and test tile prompts come with each set."],
            ].map(([number, title, copy]) => (
              <article key={number} className="rounded-[1.5rem] border border-white/12 bg-white/[.045] p-7">
                <div className="mb-10 text-sm font-bold text-[#CC5500]">{number}</div>
                <h3 className="font-serif text-3xl leading-tight">{title}</h3>
                <p className="mt-4 leading-7 text-stone-300/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="relative isolate overflow-hidden bg-[#2A2F33] px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(204,85,0,.22),transparent_32%)]" />
        <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-[2rem] border border-white/12 bg-[#15191c]/82 p-8 shadow-[0_30px_100px_rgba(0,0,0,.36)] backdrop-blur md:grid-cols-[1fr_420px] md:p-10">
          <div>
            <h2 className="font-serif text-5xl leading-tight">Ready to glaze smarter?</h2>
            <p className="mt-5 text-lg leading-8 text-stone-200/72">
              Join the waitlist. Early members get priority access and a free 4th color in their first €29 Base Set.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="h-14 w-full rounded-full border border-white/12 bg-white/[.08] px-5 text-stone-50 outline-none placeholder:text-stone-400 focus:border-[#CC5500]"
            />
            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#CC5500] font-bold text-white transition hover:bg-[#d86627]"
            >
              Join waitlist <IconArrow className="h-5 w-5" />
            </button>
            <p className="min-h-6 text-center text-sm font-semibold text-[#bdd2a9]">
              {submitted ? "You're on the waitlist. Your free 4th color is reserved." : ""}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
