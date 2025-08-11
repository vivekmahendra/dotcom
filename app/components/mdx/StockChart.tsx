interface StockDataPoint {
  date: string;
  price: number;
}

interface StockChartProps {
  symbol: string;
  data: StockDataPoint[];
  title?: string;
}

export function StockChart({ symbol, data, title }: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="border border-gray-200 p-8 text-center text-gray-500 my-6">
        No chart data available for {symbol}
      </div>
    );
  }

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;
  
  // Simple SVG line chart
  const width = 600;
  const height = 300;
  const padding = 40;

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((point.price - minPrice) / priceRange) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-lg font-medium mb-4">{title}</h3>
      )}
      <div className="border border-gray-200 p-4 bg-gray-50">
        <div className="mb-2 text-sm font-medium text-gray-700">
          {symbol} - Price Chart
        </div>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="bg-white">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Price line */}
          <polyline
            fill="none"
            stroke="black"
            strokeWidth="2"
            points={points}
          />
          
          {/* Y-axis labels */}
          <text x="10" y="50" fontSize="12" fill="#6b7280">
            ${maxPrice.toFixed(2)}
          </text>
          <text x="10" y={height - 30} fontSize="12" fill="#6b7280">
            ${minPrice.toFixed(2)}
          </text>
          
          {/* X-axis labels */}
          <text x="50" y={height - 10} fontSize="12" fill="#6b7280">
            {data[0]?.date}
          </text>
          <text x={width - 100} y={height - 10} fontSize="12" fill="#6b7280">
            {data[data.length - 1]?.date}
          </text>
        </svg>
      </div>
    </div>
  );
}