import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

// パフォーマンス計測用のカスタムフック
const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    componentCount: 0,
    rerenderCount: 0,
    fps: 0,
  });

  const renderStartTime = useRef(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rerenderCount = useRef(0);

  // レンダリング時間を計測
  const startRenderTimer = useCallback(() => {
    renderStartTime.current = performance.now();
  }, []);

  const endRenderTimer = useCallback(() => {
    const renderTime = performance.now() - renderStartTime.current;
    rerenderCount.current += 1;

    setMetrics((prev) => ({
      ...prev,
      renderTime: Math.round(renderTime * 100) / 100,
      rerenderCount: rerenderCount.current,
    }));
  }, []);

  // FPS計測
  useEffect(() => {
    const measureFPS = () => {
      frameCount.current += 1;
      const currentTime = performance.now();

      if (currentTime - lastTime.current >= 1000) {
        const fps = Math.round(
          (frameCount.current * 1000) / (currentTime - lastTime.current)
        );
        setMetrics((prev) => ({ ...prev, fps }));
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const id = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(id);
  }, []);

  // メモリ使用量計測
  useEffect(() => {
    const measureMemory = () => {
      if (performance.memory) {
        const memoryUsage = Math.round(
          performance.memory.usedJSHeapSize / 1024 / 1024
        );
        setMetrics((prev) => ({ ...prev, memoryUsage }));
      }
    };

    const interval = setInterval(measureMemory, 1000);
    return () => clearInterval(interval);
  }, []);

  return { metrics, startRenderTimer, endRenderTimer };
};

// パフォーマンスが重い処理をシミュレートするコンポーネント
const HeavyComponent = ({ count, delay }) => {
  const [data, setData] = useState([]);

  // 重い計算処理
  const heavyCalculation = useMemo(() => {
    const start = performance.now();
    let result = 0;

    // 意図的に重い処理
    for (let i = 0; i < count * 1000; i++) {
      result += Math.sqrt(i) * Math.sin(i);
    }

    const end = performance.now();
    return { result, calculationTime: Math.round((end - start) * 100) / 100 };
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newData = Array.from({ length: count }, (_, i) => ({
        id: i,
        value: Math.random() * 100,
        timestamp: Date.now(),
      }));
      setData(newData);
    }, delay);

    return () => clearTimeout(timer);
  }, [count, delay]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-2">Heavy Component</h3>
      <p className="text-sm text-gray-600 mb-2">
        計算時間: {heavyCalculation.calculationTime}ms
      </p>
      <p className="text-sm text-gray-600 mb-2">
        計算結果: {heavyCalculation.result.toFixed(2)}
      </p>
      <div className="max-h-32 overflow-y-auto">
        {data.map((item) => (
          <div key={item.id} className="text-xs p-1 border-b">
            ID: {item.id}, Value: {item.value.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
};

// React Developer Tools風のプロファイラー
const ComponentProfiler = ({ name, children }) => {
  const startTime = useRef(0);
  const [profileData, setProfileData] = useState({
    renderCount: 0,
    totalTime: 0,
    averageTime: 0,
    lastRenderTime: 0,
  });

  useEffect(() => {
    startTime.current = performance.now();
  });

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    setProfileData((prev) => {
      const newRenderCount = prev.renderCount + 1;
      const newTotalTime = prev.totalTime + renderTime;

      return {
        renderCount: newRenderCount,
        totalTime: newTotalTime,
        averageTime: Math.round((newTotalTime / newRenderCount) * 100) / 100,
        lastRenderTime: Math.round(renderTime * 100) / 100,
      };
    });
  });

  return (
    <div className="border border-blue-200 rounded-lg p-3 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-blue-800">{name}</h3>
        <span className="text-xs bg-blue-100 px-2 py-1 rounded">
          Renders: {profileData.renderCount}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-2">
        <div>最後: {profileData.lastRenderTime}ms</div>
        <div>平均: {profileData.averageTime}ms</div>
        <div>合計: {Math.round(profileData.totalTime)}ms</div>
      </div>
      {children}
    </div>
  );
};

// メインコンポーネント
const PerformanceMonitor = () => {
  const { metrics, startRenderTimer, endRenderTimer } = usePerformanceMonitor();
  const [heavyCount, setHeavyCount] = useState(100);
  const [delay, setDelay] = useState(0);
  const [autoUpdate, setAutoUpdate] = useState(false);

  useEffect(() => {
    startRenderTimer();
    return () => endRenderTimer();
  });

  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      setHeavyCount((prev) => (prev % 500) + 50);
    }, 2000);

    return () => clearInterval(interval);
  }, [autoUpdate]);

  // Web Vitals風の計測
  const [webVitals, setWebVitals] = useState({
    lcp: 0,
    fid: 0,
    cls: 0,
  });

  useEffect(() => {
    // LCP (Largest Contentful Paint) のシミュレーション
    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setWebVitals((prev) => ({
            ...prev,
            lcp: Math.round(lastEntry.startTime),
          }));
        }
      });

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        // ブラウザがサポートしていない場合
        setWebVitals((prev) => ({
          ...prev,
          lcp: Math.round(performance.now()),
        }));
      }
    };

    measureLCP();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        React パフォーマンス計測ツール
      </h1>

      {/* リアルタイムメトリクス */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {metrics.renderTime}ms
          </div>
          <div className="text-sm text-gray-600">レンダリング時間</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {metrics.fps}fps
          </div>
          <div className="text-sm text-gray-600">フレームレート</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {metrics.memoryUsage}MB
          </div>
          <div className="text-sm text-gray-600">メモリ使用量</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {metrics.rerenderCount}
          </div>
          <div className="text-sm text-gray-600">再レンダリング回数</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">
            {webVitals.lcp}ms
          </div>
          <div className="text-sm text-gray-600">LCP</div>
        </div>
      </div>

      {/* コントロールパネル */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">パフォーマンステスト設定</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              処理量: {heavyCount}
            </label>
            <input
              type="range"
              min="50"
              max="500"
              value={heavyCount}
              onChange={(e) => setHeavyCount(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              遅延: {delay}ms
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                className="mr-2"
              />
              自動更新
            </label>
          </div>
        </div>
      </div>

      {/* プロファイラー付きコンポーネント */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComponentProfiler name="Heavy Component 1">
          <HeavyComponent count={heavyCount} delay={delay} />
        </ComponentProfiler>

        <ComponentProfiler name="Heavy Component 2">
          <HeavyComponent count={heavyCount * 0.5} delay={delay * 0.5} />
        </ComponentProfiler>
      </div>

      {/* パフォーマンスヒント */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">パフォーマンス最適化のヒント</h3>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>レンダリング時間が16ms以下だと60FPSを維持できます</li>
          <li>
            メモリ使用量が急激に増加している場合はメモリリークの可能性があります
          </li>
          <li>
            再レンダリング回数が多すぎる場合はReact.memo()の使用を検討してください
          </li>
          <li>LCPは2.5秒以下が推奨されます</li>
        </ul>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
