"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface ParallaxLayerProps {
  speed: number;
  children: React.ReactNode;
  className?: string;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  speed,
  children,
  className = "",
}) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = useCallback(() => {
    setOffsetY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translateY(${offsetY * speed}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

interface FloatingElementProps {
  delay: number;
  duration: number;
  left: number;
  top: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  delay,
  duration,
  left,
  top,
}) => (
  <div
    className="absolute w-3 h-3 bg-white bg-opacity-20 rounded-full"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
    }}
  />
);

interface ScrollIndicatorProps {
  currentSection: number;
  totalSections: number;
  onSectionClick: (section: number) => void;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  currentSection,
  totalSections,
  onSectionClick,
}) => (
  <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 flex flex-col gap-3">
    {Array.from({ length: totalSections }, (_, index) => (
      <button
        key={index}
        onClick={() => onSectionClick(index)}
        className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${
          index === currentSection
            ? "bg-cyan-400 scale-125"
            : "bg-white bg-opacity-30"
        }`}
        aria-label={`セクション ${index + 1} に移動`}
      />
    ))}
  </div>
);

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
    <div
      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-150 ease-out"
      style={{ width: `${progress}%` }}
    />
  </div>
);

interface SectionProps {
  title: string;
  content: string;
  isVisible: boolean;
  gradient: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  content,
  isVisible,
  gradient,
}) => (
  <div
    className={`min-h-screen flex items-center justify-center p-12 ${gradient}`}
  >
    <div className="max-w-4xl text-center">
      <h2
        className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-lg md:text-xl leading-relaxed transition-all duration-800 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {content}
      </p>
    </div>
  </div>
);

const ParallaxApp: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(
    new Set()
  );

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));

  const sections = [
    {
      title: "革新的なデザイン",
      content:
        "モダンなReactフックを使用して、パフォーマンスを最適化したパララックススクロールを実現。TypeScriptの型安全性により、保守性の高いコードを提供します。",
      gradient: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900",
    },
    {
      title: "スムーズなアニメーション",
      content:
        "60FPSを維持する滑らかなスクロールエフェクトを実現。requestAnimationFrameとuseCallbackを活用し、リアルタイムで計算される変換により最適なパフォーマンスを提供します。",
      gradient: "bg-gradient-to-br from-teal-900 via-green-900 to-emerald-900",
    },
    {
      title: "レスポンシブ対応",
      content:
        "Tailwind CSSを使用したレスポンシブデザインで、モバイルからデスクトップまで全てのデバイスに対応。アクセシビリティも考慮した設計で、誰でも快適に利用できます。",
      gradient: "bg-gradient-to-br from-rose-900 via-pink-900 to-red-900",
    },
  ];

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    setScrollY(scrollTop);
    setProgress((scrollTop / docHeight) * 100);

    // 現在のセクションを計算
    const heroHeight = heroRef.current?.offsetHeight || 0;
    const sectionHeight = window.innerHeight;
    const currentSectionIndex = Math.floor(
      (scrollTop - heroHeight) / sectionHeight
    );
    setCurrentSection(
      Math.max(0, Math.min(currentSectionIndex, sections.length - 1))
    );

    // 可視セクションを更新
    const newVisibleSections = new Set<number>();
    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          newVisibleSections.add(index);
        }
      }
    });
    setVisibleSections(newVisibleSections);
  }, [sections.length]);

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (sectionIndex === 0) {
      heroRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      sectionRefs.current[sectionIndex - 1]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初期実行
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="overflow-x-hidden bg-gray-900 text-white">
      <ProgressBar progress={progress} />

      <ScrollIndicator
        currentSection={currentSection}
        totalSections={sections.length + 1}
        onSectionClick={scrollToSection}
      />

      {/* ヒーローセクション */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        <ParallaxLayer speed={0.5}>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.3}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform rotate-45" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.2}>
          <div className="absolute inset-0">
            {floatingElements.map((element) => (
              <FloatingElement
                key={element.id}
                delay={element.delay}
                duration={element.duration}
                left={element.left}
                top={element.top}
              />
            ))}
          </div>
        </ParallaxLayer>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              React Parallax
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 opacity-0 animate-fade-in-up">
              TypeScriptで構築されたモダンなパララックスコンポーネント
            </p>
          </div>
        </div>
      </div>

      {/* コンテンツセクション */}
      {sections.map((section, index) => (
        <div key={index} ref={(el) => (sectionRefs.current[index] = el)}>
          <Section
            title={section.title}
            content={section.content}
            isVisible={visibleSections.has(index)}
            gradient={section.gradient}
          />
        </div>
      ))}

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease 0.5s forwards;
        }
      `}</style>
    </div>
  );
};

export default ParallaxApp;
