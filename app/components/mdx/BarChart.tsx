import { useMemo } from 'react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Grid } from '@visx/grid';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { ParentSize } from '@visx/responsive';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

// Mock Disney financial data
const MOCK_REVENUE_DATA = [
  { year: '2019', revenue: 69.57, operatingIncome: 14.87 },
  { year: '2020', revenue: 65.39, operatingIncome: 8.98 },
  { year: '2021', revenue: 67.42, operatingIncome: 7.77 },
  { year: '2022', revenue: 82.72, operatingIncome: 12.12 },
  { year: '2023', revenue: 88.90, operatingIncome: 12.65 },
];

interface BarDataPoint {
  year: string;
  revenue: number;
  operatingIncome: number;
}

interface BarChartProps {
  title?: string;
  data?: BarDataPoint[];
  height?: number;
  metric?: 'revenue' | 'operatingIncome';
  color?: string;
}

const formatCurrency = (value: number) => `$${value.toFixed(1)}B`;

export function BarChart({
  title,
  data = MOCK_REVENUE_DATA,
  height = 350,
  metric = 'revenue',
  color = '#2563eb'
}: BarChartProps) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<BarDataPoint>();

  const margin = { top: 20, right: 40, bottom: 50, left: 80 };

  const getMetricValue = (d: BarDataPoint) => {
    return metric === 'revenue' ? d.revenue : d.operatingIncome;
  };

  const getMetricLabel = () => {
    return metric === 'revenue' ? 'Revenue' : 'Operating Income';
  };

  return (
    <div className="my-8">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="text-sm text-gray-600 font-mono">
            Disney {getMetricLabel()} (2019-2023)
          </div>
        </div>
      )}

      <div className="border border-gray-300 rounded-sm bg-white shadow-sm relative">
        <ParentSize>
          {({ width }) => {
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            // Scales
            const xScale = scaleBand()
              .range([0, innerWidth])
              .domain(data.map(d => d.year))
              .padding(0.3);

            const yScale = scaleLinear()
              .range([innerHeight, 0])
              .domain([0, max(data, getMetricValue) as number])
              .nice();

            const handleTooltip = (event: React.MouseEvent, datum: BarDataPoint) => {
              const coords = localPoint(event.target as Element, event);
              showTooltip({
                tooltipData: datum,
                tooltipLeft: coords?.x,
                tooltipTop: coords?.y,
              });
            };

            return (
              <div onMouseLeave={hideTooltip}>
                <svg width={width} height={height}>
                  <Group left={margin.left} top={margin.top}>
                    {/* Grid */}
                    <Grid
                      xScale={xScale}
                      yScale={yScale}
                      width={innerWidth}
                      height={innerHeight}
                      stroke="#e5e7eb"
                      strokeWidth={1}
                      strokeOpacity={0.3}
                    />

                    {/* Bars */}
                    {data.map((d, i) => {
                      const barHeight = innerHeight - (yScale(getMetricValue(d)) ?? 0);
                      const barX = xScale(d.year) ?? 0;
                      const barY = yScale(getMetricValue(d)) ?? 0;
                      
                      return (
                        <Bar
                          key={i}
                          x={barX}
                          y={barY}
                          width={xScale.bandwidth()}
                          height={barHeight}
                          fill={color}
                          fillOpacity={0.8}
                          stroke={color}
                          strokeWidth={1}
                          onMouseMove={(event) => handleTooltip(event, d)}
                          onMouseLeave={hideTooltip}
                          className="hover:fill-opacity-100 transition-all duration-150"
                        />
                      );
                    })}

                    {/* Axes */}
                    <AxisBottom
                      scale={xScale}
                      top={innerHeight}
                      stroke="#6b7280"
                      tickStroke="#6b7280"
                      tickLabelProps={() => ({
                        fill: '#6b7280',
                        fontSize: 12,
                        fontFamily: 'ui-sans-serif, system-ui',
                        textAnchor: 'middle',
                      })}
                    />
                    <AxisLeft
                      scale={yScale}
                      tickFormat={(value) => formatCurrency(Number(value))}
                      stroke="#6b7280"
                      tickStroke="#6b7280"
                      tickLabelProps={() => ({
                        fill: '#6b7280',
                        fontSize: 11,
                        fontFamily: 'ui-monospace, SFMono-Regular',
                        textAnchor: 'end',
                        dx: -4,
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
                        FY{tooltipData.year}
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <div>Revenue: {formatCurrency(tooltipData.revenue)}</div>
                        <div>Operating Income: {formatCurrency(tooltipData.operatingIncome)}</div>
                        <div>Operating Margin: {((tooltipData.operatingIncome / tooltipData.revenue) * 100).toFixed(1)}%</div>
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