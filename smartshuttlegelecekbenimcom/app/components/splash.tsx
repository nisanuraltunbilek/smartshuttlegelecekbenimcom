import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";

interface SplashProps {
  onComplete: () => void;
}

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
        <path
          d="M3.27 7.12L12 12.53l8.73-5.41M12 21.48V12.52"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.76 2.26L4.82 5.57c-1.31.73-2.38 2.57-2.38 4.09v4.7c0 1.52 1.07 3.36 2.38 4.09l5.94 3.31c1.23.69 3.25.69 4.48 0l5.94-3.31c1.31-.73 2.38-2.57 2.38-4.09v-4.7c0-1.52-1.07-3.36-2.38-4.09l-5.94-3.31c-1.24-.68-3.26-.68-4.48 0z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Smart Routing",
    description:
      "AI-powered route optimization that learns your commute patterns and finds the fastest path every time.",
    gradient: "from-violet-500/20 to-indigo-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
        <path
          d="M12 14a2 2 0 100-4 2 2 0 000 4z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
    title: "Live Tracking",
    description:
      "Follow your shuttle in real-time on the map. Get precise ETAs and instant notifications on arrival.",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
        <path
          d="M2 8.5h13.5M6 16.5H8M10.5 16.5h4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 12.03v4.08c0 3.51-.89 4.39-4.44 4.39H6.44C2.89 20.5 2 19.62 2 16.11V7.89c0-3.51.89-4.39 4.44-4.39h11.12c3.55 0 4.44.88 4.44 4.39"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Easy Payments",
    description:
      "Seamless digital payments with multiple options. View ride history and manage expenses effortlessly.",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

export function Splash({ onComplete }: SplashProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const totalSteps = features.length;

  const goToStep = useCallback(
    (step: number) => {
      if (isAnimating || step === currentStep) return;
      setIsAnimating(true);
      setCurrentStep(step);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, currentStep]
  );

  function handleNext() {
    if (currentStep < totalSteps - 1) goToStep(currentStep + 1);
  }

  function handleBack() {
    if (currentStep > 0) goToStep(currentStep - 1);
  }

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) handleNext();
      else handleBack();
    }
    setTouchStart(null);
  }

  const feature = features[currentStep];

  return (
    <div className="splash-screen fixed inset-0 flex flex-col overflow-hidden select-none">
      {/* Animated gradient background */}
      <div className="absolute inset-0 splash-gradient" />

      {/* Mesh overlay for premium feel */}
      <div className="absolute inset-0 splash-mesh opacity-30" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="splash-orb absolute -top-20 -right-20 w-72 h-72 rounded-full bg-indigo-400/10 blur-3xl" />
        <div
          className="splash-orb absolute top-1/4 -left-20 w-56 h-56 rounded-full bg-cyan-400/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="splash-orb absolute bottom-1/3 right-4 w-40 h-40 rounded-full bg-violet-400/10 blur-3xl"
          style={{ animationDelay: "4s" }}
        />
        {/* Subtle particle dots */}
        <div className="splash-particle absolute top-[15%] left-[20%] w-1 h-1 rounded-full bg-white/30" />
        <div
          className="splash-particle absolute top-[35%] right-[15%] w-1.5 h-1.5 rounded-full bg-white/20"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="splash-particle absolute bottom-[40%] left-[30%] w-1 h-1 rounded-full bg-white/25"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="splash-particle absolute top-[60%] right-[35%] w-0.5 h-0.5 rounded-full bg-white/20"
          style={{ animationDelay: "0.8s" }}
        />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col flex-1 px-6 pt-safe-top pb-safe-bottom max-w-md mx-auto w-full transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Top bar: Skip */}
        <div className="flex justify-end pt-4">
          <button
            onClick={onComplete}
            className="text-white/50 text-sm font-medium px-4 py-2 rounded-full hover:text-white/80 hover:bg-white/5 active:bg-white/10 transition-all duration-200"
          >
            Skip
          </button>
        </div>

        {/* Logo & Brand */}
        <div className="flex flex-col items-center mt-6 mb-8">
          <div className="splash-logo w-18 h-18 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-5 border border-white/10 shadow-2xl">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10">
              <path
                d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4S4 2.5 4 6v10zm3.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 10H6V6h12v4z"
                fill="white"
              />
            </svg>
          </div>
          <h1 className="text-white text-[1.75rem] font-bold tracking-tight splash-title">
            SmartShuttle
          </h1>
          <p className="text-white/40 text-sm mt-1.5 font-medium tracking-wide uppercase splash-subtitle">
            Your ride, reimagined
          </p>
        </div>

        {/* Feature carousel */}
        <div
          className="flex-1 flex flex-col items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full relative" style={{ minHeight: 220 }}>
            {features.map((f, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center transition-all duration-500 ease-out"
                style={{
                  opacity: i === currentStep ? 1 : 0,
                  transform: `translateX(${(i - currentStep) * 30}%) scale(${i === currentStep ? 1 : 0.9})`,
                  pointerEvents: i === currentStep ? "auto" : "none",
                }}
              >
                <div
                  className={`w-full bg-gradient-to-br ${f.gradient} backdrop-blur-xl rounded-3xl p-7 border border-white/[0.08] shadow-2xl`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-5 text-white">
                    {f.icon}
                  </div>
                  <h2 className="text-white text-xl font-semibold mb-2.5 tracking-tight">
                    {f.title}
                  </h2>
                  <p className="text-white/55 text-[0.9rem] leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Step indicators */}
          <div className="flex items-center gap-2.5 mt-8">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={`rounded-full transition-all duration-400 ease-out ${
                  i === currentStep
                    ? "w-8 h-2 bg-white shadow-lg shadow-white/20"
                    : "w-2 h-2 bg-white/25 hover:bg-white/40 active:bg-white/50"
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-8 pb-4 space-y-3">
          {currentStep < totalSteps - 1 ? (
            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 py-4 rounded-2xl font-semibold text-sm text-white/80 border border-white/15 hover:bg-white/5 active:bg-white/10 active:scale-[0.98] transition-all duration-200"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="flex-1 py-4 rounded-2xl bg-white font-semibold text-sm text-gray-900 hover:bg-white/90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-white/10"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="space-y-3 splash-cta-enter">
              <Link
                to="/register"
                className="block w-full py-4 rounded-2xl bg-white font-semibold text-sm text-gray-900 text-center hover:bg-white/90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-white/10"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="block w-full py-4 rounded-2xl font-semibold text-sm text-white/80 text-center border border-white/15 hover:bg-white/5 active:bg-white/10 transition-all duration-200"
              >
                I already have an account
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
