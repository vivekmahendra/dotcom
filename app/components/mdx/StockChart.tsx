import { useState, useMemo } from 'react';
import { scaleTime, scaleLinear } from 'd3-scale';
import { extent, max, min } from 'd3-array';
import { timeFormat } from 'd3-time-format';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Grid } from '@visx/grid';
import { LinePath, Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { localPoint } from '@visx/event';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';

// Mock data for Disney stock
const MOCK_DATA = [
  { date: "2023-10-01", open: 79.5, high: 85.2, low: 78.8, close: 82.5 },
  { date: "2023-10-15", open: 82.5, high: 88.75, low: 81.2, close: 86.3 },
  { date: "2023-11-01", open: 86.3, high: 93.8, low: 85.1, close: 91.3 },
  { date: "2023-11-15", open: 91.3, high: 94.5, low: 89.2, close: 92.15 },
  { date: "2023-12-01", open: 92.15, high: 95.2, low: 88.9, close: 90.85 },
  { date: "2023-12-15", open: 90.85, high: 96.4, low: 89.5, close: 94.2 },
  { date: "2024-01-01", open: 94.2, high: 98.75, low: 92.3, close: 94.4 },
  { date: "2024-01-15", open: 94.4, high: 102.6, low: 93.8, close: 99.85 },
  { date: "2024-02-01", open: 99.85, high: 112.5, low: 98.2, close: 109.25 },
  { date: "2024-02-15", open: 109.25, high: 115.8, low: 107.3, close: 111.6 },
  { date: "2024-03-01", open: 111.6, high: 118.2, low: 110.4, close: 112.15 },
  { date: "2024-03-15", open: 112.15, high: 119.75, low: 111.2, close: 117.3 }
];

interface RawDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ProcessedDataPoint {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface StockChartProps {
  symbol: string;
  title?: string;
  chartType?: 'line' | 'candlestick';
  showToggle?: boolean;
  height?: number;
  data?: RawDataPoint[];
}

const formatDate = timeFormat('%b %d');
const formatPrice = (price: number) => `$${price.toFixed(2)}`;

export function StockChart({
  symbol,
  title,
  chartType: initialType = 'line',
  showToggle = true,
  height = 400,
  data = MOCK_DATA
}: StockChartProps) {
  const [chartType, setChartType] = useState(initialType);
  
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<ProcessedDataPoint>();

  // State for crosshair position
  const [crosshairX, setCrosshairX] = useState<number | null>(null);

  const processedData: ProcessedDataPoint[] = useMemo(() => {
    return data.map(d => ({
      ...d,
      date: new Date(d.date),
      open: Number(d.open),
      high: Number(d.high),
      low: Number(d.low),
      close: Number(d.close)
    }));
  }, [data]);

  const margin = { top: 20, right: 40, bottom: 50, left: 70 };

  return (
    <div className="my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          <div className="text-sm text-gray-600 font-mono">
            {symbol} - {chartType === 'candlestick' ? 'OHLC Chart' : 'Price Chart'}
          </div>
        </div>
        
        {showToggle && (
          <div className="flex bg-gray-100 rounded-sm p-1">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                chartType === 'line'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                chartType === 'candlestick'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Candlestick
            </button>
          </div>
        )}
      </div>

      {/* Chart Container */}
      <div className="border border-gray-300 rounded-sm bg-white shadow-sm relative">
        <ParentSize>
          {({ width }) => {
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            // Scales
            const dateScale = scaleTime()
              .range([20, innerWidth - 20]) // More padding on the right
              .domain(extent(processedData, d => d.date) as [Date, Date]);

            const priceScale = scaleLinear()
              .range([innerHeight, 0])
              .domain([
                min(processedData, d => d.low) as number,
                max(processedData, d => d.high) as number
              ])
              .nice();

            const candleWidth = Math.max(6, Math.min(16, innerWidth / processedData.length * 0.8));

            const handleTooltip = (event: React.MouseEvent, datum: ProcessedDataPoint) => {
              const coords = localPoint(event.target as Element, event);
              const dataX = dateScale(datum.date) ?? 0;
              setCrosshairX(dataX);
              showTooltip({
                tooltipData: datum,
                tooltipLeft: coords?.x,
                tooltipTop: coords?.y,
              });
            };

            return (
              <div onMouseLeave={() => {
                hideTooltip();
                setCrosshairX(null);
              }}>
                <svg width={width} height={height}>
                  <Group left={margin.left} top={margin.top}>
                    {/* Grid */}
                    <Grid
                      xScale={dateScale}
                      yScale={priceScale}
                      width={innerWidth - 40} // Adjust grid width to match scale
                      height={innerHeight}
                      left={20} // Offset grid to match scale
                      stroke="#e5e7eb"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                    />

                    {chartType === 'line' ? (
                      /* Line Chart */
                      <LinePath
                        data={processedData}
                        x={d => dateScale(d.date) ?? 0}
                        y={d => priceScale(d.close) ?? 0}
                        stroke="#2563eb"
                        strokeWidth={2}
                        fill="transparent"
                        style={{ pointerEvents: 'none' }}
                      />
                    ) : (
                      /* Candlestick Chart */
                      <>
                        {processedData.map((d, i) => {
                          const x = dateScale(d.date) ?? 0;
                          const openY = priceScale(d.open) ?? 0;
                          const closeY = priceScale(d.close) ?? 0;
                          const highY = priceScale(d.high) ?? 0;
                          const lowY = priceScale(d.low) ?? 0;
                          
                          const isPositive = d.close >= d.open;
                          const color = isPositive ? '#059669' : '#dc2626';
                          
                          return (
                            <Group key={i}>
                              {/* High-Low line */}
                              <line
                                x1={x}
                                y1={highY}
                                x2={x}
                                y2={lowY}
                                stroke={color}
                                strokeWidth={1.5}
                                style={{ pointerEvents: 'none' }}
                              />
                              
                              {/* Open-Close body */}
                              <rect
                                x={x - candleWidth / 2}
                                y={Math.min(openY, closeY)}
                                width={candleWidth}
                                height={Math.max(2, Math.abs(closeY - openY))}
                                fill={isPositive ? 'white' : color}
                                stroke={color}
                                strokeWidth={1.5}
                                style={{ pointerEvents: 'none' }}
                              />
                            </Group>
                          );
                        })}
                      </>
                    )}

                    {/* Interactive overlay */}
                    <Bar
                      x={0} // Cover the full chart area
                      width={innerWidth} // Full width
                      height={innerHeight}
                      fill="transparent"
                      onMouseMove={(event) => {
                        const point = localPoint(event);
                        if (!point) return;
                        
                        const x0 = dateScale.invert(point.x - 20); // Adjust for the padding offset
                        
                        // Find the closest data point
                        let closestIndex = 0;
                        let minDistance = Math.abs(processedData[0].date.getTime() - x0.getTime());
                        
                        for (let i = 1; i < processedData.length; i++) {
                          const distance = Math.abs(processedData[i].date.getTime() - x0.getTime());
                          if (distance < minDistance) {
                            minDistance = distance;
                            closestIndex = i;
                          }
                        }
                        
                        const d = processedData[closestIndex];
                        
                        // Set crosshair position to the actual data point
                        const dataX = dateScale(d.date) ?? 0;
                        console.log('Crosshair debug:', { 
                          mouseX: point.x,
                          adjustedX: point.x - 20,
                          invertedDate: x0,
                          closestIndex,
                          date: d.date, 
                          dataX, 
                          innerWidth, 
                          scaleRange: dateScale.range() 
                        });
                        setCrosshairX(dataX);
                        
                        handleTooltip(event, d);
                      }}
                    />

                    {/* Crosshair line */}
                    {crosshairX !== null && (
                      <line
                        x1={crosshairX}
                        y1={0}
                        x2={crosshairX}
                        y2={innerHeight}
                        stroke="#6b7280"
                        strokeWidth={1}
                        strokeDasharray="3,3"
                        opacity={0.7}
                        pointerEvents="none"
                      />
                    )}

                    {/* Axes */}
                    <AxisBottom
                      scale={dateScale}
                      top={innerHeight}
                      tickFormat={(value) => formatDate(value as Date)}
                      stroke="#6b7280"
                      tickStroke="#6b7280"
                      numTicks={6}
                      tickLabelProps={() => ({
                        fill: '#6b7280',
                        fontSize: 11,
                        fontFamily: 'ui-sans-serif, system-ui',
                        textAnchor: 'middle',
                        dy: '0.33em',
                      })}
                    />
                    <AxisLeft
                      scale={priceScale}
                      tickFormat={(value) => formatPrice(Number(value))}
                      stroke="#6b7280"
                      tickStroke="#6b7280"
                      numTicks={6}
                      tickLabelProps={() => ({
                        fill: '#6b7280',
                        fontSize: 11,
                        fontFamily: 'ui-monospace, SFMono-Regular',
                        textAnchor: 'end',
                        dx: -8,
                        dy: '0.33em',
                      })}
                    />
                  </Group>
                </svg>

                {/* Tooltip */}
                {tooltipOpen && tooltipData && (
                  <TooltipWithBounds
                    top={tooltipTop}
                    left={tooltipLeft}
                    style={{
                      ...defaultStyles,
                      background: '#374151',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontFamily: 'ui-monospace, SFMono-Regular',
                      padding: '8px 12px',
                      borderRadius: '4px',
                    }}
                  >
                    <div className="space-y-1">
                      <div className="font-medium">
                        {formatDate(tooltipData.date)}
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <div>Open: {formatPrice(tooltipData.open)}</div>
                        <div>High: {formatPrice(tooltipData.high)}</div>
                        <div>Low: {formatPrice(tooltipData.low)}</div>
                        <div>Close: {formatPrice(tooltipData.close)}</div>
                      </div>
                    </div>
                  </TooltipWithBounds>
                )}
              </div>
            );
          }}
        </ParentSize>
      </div>
    </div>
  );
}