import { useMemo } from 'react';
import {
  Sankey,
  sankeyLeft,
  sankeyJustify,
  type SankeyNode,
  type SankeyLink,
} from '@visx/sankey';
import { Group } from '@visx/group';
import { LinkHorizontal, BarRounded } from '@visx/shape';
import { ParentSize } from '@visx/responsive';
import { useTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

// Disney Q3 FY25 Financial Flow Data - Exact Structure from Reference
const DISNEY_FINANCIAL_DATA = {
  nodes: [
    // Entertainment Sub-Components (Far Left)
    { name: 'Linear', id: 'linear', category: 'source' as const, value: 2.3, yoyChange: '(15%) Y/Y' },
    { name: 'DTC', id: 'dtc', category: 'source' as const, value: 6.2, yoyChange: '+6% Y/Y' },
    { name: 'Licensing', id: 'content', category: 'source' as const, value: 2.3, yoyChange: '+7% Y/Y' },
    
    // Experiences Sub-Components (Far Left)
    { name: 'Experiences', id: 'parks', category: 'source' as const, value: 8.1, yoyChange: '+9% Y/Y' },
    { name: 'Consumer', id: 'products', category: 'source' as const, value: 1.0, yoyChange: '+3% Y/Y' },
    
    // Sports (Direct)
    { name: 'Sports', id: 'sports-direct', category: 'source' as const, value: 4.3, yoyChange: '(5%) Y/Y' },
    
    // Intermediate Business Segments (Middle)
    { name: 'Entertainment', id: 'entertainment-segment', category: 'intermediate' as const, value: 10.7, yoyChange: '+1% Y/Y' },
    { name: 'Experiences', id: 'experiences-segment', category: 'intermediate' as const, value: 9.1, yoyChange: '+8% Y/Y' },
    
    // Company Center
    { name: 'The Walt Disney Company', id: 'disney-center', category: 'center' as const, value: 23.7 },
    
    // Revenue & Elimination (Right Middle)
    { name: 'Revenue', id: 'total-revenue', category: 'revenue' as const, value: 23.7, yoyChange: '+2% Y/Y' },
    { name: 'Eliminations', id: 'elimination', category: 'elimination' as const, value: 0.4 },
    
    // Costs & Profit (Right Middle)
    { name: 'Segment Costs & Expenses', id: 'segment-costs', category: 'expense' as const, value: 19.1 },
    { name: 'Segment Operating Profit', id: 'segment-profit', category: 'profit' as const, value: 4.6, margin: 19, yoyChange: '+1pp Y/Y' },
    
    // Final Operating Results (Right)
    { name: 'Entertainment', id: 'entertainment-final', category: 'target' as const, value: 1.0, margin: 10, yoyChange: '2pp Y/Y' },
    { name: 'Sports', id: 'sports-final', category: 'target' as const, value: 1.0, margin: 24, yoyChange: '+6pp Y/Y' },
    { name: 'Experiences', id: 'experiences-final', category: 'target' as const, value: 2.5, margin: 28, yoyChange: '+1pp Y/Y' },
  ],
  links: [
    // Entertainment Sources → Entertainment Segment
    { source: 0, target: 6, value: 2.3 }, // Linear Networks → Entertainment
    { source: 1, target: 6, value: 6.2 }, // DTC → Entertainment
    { source: 2, target: 6, value: 2.3 }, // Content → Entertainment
    
    // Experiences Sources → Experiences Segment
    { source: 3, target: 7, value: 8.1 }, // Parks → Experiences
    { source: 4, target: 7, value: 1.0 }, // Products → Experiences
    
    // All Segments → Disney Center
    { source: 6, target: 8, value: 10.7 }, // Entertainment → Disney
    { source: 5, target: 8, value: 4.3 }, // Sports → Disney (direct)
    { source: 7, target: 8, value: 9.1 }, // Experiences → Disney
    
    // Disney → Revenue & Elimination
    { source: 8, target: 9, value: 23.7 }, // Disney → Revenue
    { source: 8, target: 10, value: 0.4 }, // Disney → Eliminations
    
    // Revenue → Costs & Profit
    { source: 9, target: 11, value: 19.1 }, // Revenue → Segment Costs & Expenses
    { source: 9, target: 12, value: 4.6 }, // Revenue → Segment Operating Profit
    
    // Segment Operating Profit → Final Results
    { source: 12, target: 13, value: 1.0 }, // Segment Profit → Entertainment
    { source: 12, target: 14, value: 1.0 }, // Segment Profit → Sports
    { source: 12, target: 15, value: 2.5 }, // Segment Profit → Experiences
  ]
};

interface NodeData {
  name: string;
  id: string;
  category: 'source' | 'intermediate' | 'center' | 'revenue' | 'elimination' | 'expense' | 'profit' | 'target';
  value: number;
  margin?: number;
  yoyChange?: string | null;
}

interface LinkData {
  source: number;
  target: number;
  value: number;
}

interface SankeyChartProps {
  title?: string;
  height?: number;
  data?: {
    nodes: NodeData[];
    links: LinkData[];
  };
}

const formatCurrency = (value: number) => `$${value.toFixed(1)}B`;

// Color scheme for different categories
const getNodeColor = (category: string, id: string) => {
  switch (category) {
    case 'source':
      // Entertainment sources: all blue
      if (id.includes('linear') || id.includes('dtc') || id.includes('content')) return '#3b82f6'; // Blue
      // Experiences sources: cyan
      if (id.includes('parks') || id.includes('products')) return '#06b6d4'; // Cyan
      // Sports: yellow
      if (id.includes('sports')) return '#f59e0b'; // Yellow
      return '#6b7280';
    case 'intermediate':
      if (id.includes('entertainment')) return '#1e40af'; // Dark blue
      if (id.includes('experiences')) return '#0891b2'; // Dark cyan
      return '#4b5563'; // Gray
    case 'center':
      return '#1f2937'; // Dark gray
    case 'revenue':
      return '#4b5563'; // Dark gray (not green)
    case 'elimination':
      return '#dc2626'; // Red for elimination
    case 'expense':
      return '#dc2626'; // Red for costs & expenses
    case 'profit':
      return '#22c55e'; // Green for operating profit
    case 'target':
      return '#22c55e'; // Green for all final results (profits)
    default:
      return '#6b7280';
  }
};

const getLinkColor = (source: NodeData, target: NodeData) => {
  if (target.category === 'center') {
    return getNodeColor(source.category, source.id);
  }
  return getNodeColor(target.category, target.id);
};

export function SankeyChart({
  title,
  height = 400,
  data = DISNEY_FINANCIAL_DATA
}: SankeyChartProps) {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip<string>();

  // Responsive margins and sizing - Mobile-first optimization
  const getResponsiveProps = (width: number) => {
    if (width < 640) { // Mobile - Ultra-professional & compact
      return {
        margin: { top: 12, right: 50, bottom: 12, left: 50 },
        height: Math.max(height, 380),
        nodeWidth: 10,
        nodePadding: 6,
        fontSize: { label: 10, value: 8 }
      };
    } else if (width < 768) { // Tablet
      return {
        margin: { top: 20, right: 80, bottom: 20, left: 80 },
        height: Math.max(height, 450),
        nodeWidth: 18,
        nodePadding: 14,
        fontSize: { label: 12, value: 10 }
      };
    } else { // Desktop
      return {
        margin: { top: 30, right: 120, bottom: 30, left: 120 },
        height: height,
        nodeWidth: 24,
        nodePadding: 20,
        fontSize: { label: 12, value: 10 }
      };
    }
  };

  // Determine if node should show text on mobile
  const shouldShowTextOnMobile = (node: NodeData) => {
    // Show text for source nodes, target (final result) nodes, and expense nodes
    return node.category === 'source' || node.category === 'target' || node.category === 'expense';
  };

  return (
    <div className="my-8">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="text-sm text-gray-600 font-mono">
            Disney Q3 FY25 Financial Flow (in billions)
          </div>
        </div>
      )}

      <div className="border border-gray-300 rounded-sm bg-white shadow-sm relative">
        <ParentSize>
          {({ width }) => {
            const responsive = getResponsiveProps(width);
            const innerWidth = width - responsive.margin.left - responsive.margin.right;
            const innerHeight = responsive.height - responsive.margin.top - responsive.margin.bottom;

            if (width < 320) return null; // Very small screens

            return (
              <div 
                onMouseLeave={hideTooltip}
                onTouchEnd={hideTooltip}
              >
                <svg width={width} height={responsive.height}>
                  <Group left={responsive.margin.left} top={responsive.margin.top}>
                    <Sankey<NodeData, LinkData>
                      root={data}
                      size={[innerWidth, innerHeight]}
                      nodeWidth={responsive.nodeWidth}
                      nodePadding={responsive.nodePadding}
                      nodeAlign={sankeyJustify}
                      iterations={6}
                    >
                      {({ graph, createPath }) => (
                        <>
                          {/* Links */}
                          <Group>
                            {graph.links.map((link, i) => {
                              const sourceNode = link.source as SankeyNode<NodeData, LinkData>;
                              const targetNode = link.target as SankeyNode<NodeData, LinkData>;
                              const linkColor = getLinkColor(sourceNode, targetNode);
                              
                              return (
                                <LinkHorizontal
                                  key={i}
                                  data={link}
                                  path={createPath}
                                  fill="transparent"
                                  stroke={linkColor}
                                  strokeWidth={width < 640 ? Math.max(link.width * 0.15, 0.3) : link.width}
                                  strokeOpacity={width < 640 ? 0.75 : 0.6}
                                  onMouseMove={(event) => {
                                    const coords = localPoint(
                                      (event.target as SVGElement).ownerSVGElement || event.target as SVGElement,
                                      event,
                                    );
                                    showTooltip({
                                      tooltipData: `${sourceNode.name} → ${targetNode.name}: ${formatCurrency(link.value)}`,
                                      tooltipTop: (coords?.y ?? 0) + 10,
                                      tooltipLeft: (coords?.x ?? 0) + 10,
                                    });
                                  }}
                                  onTouchStart={(event) => {
                                    const coords = localPoint(
                                      (event.target as SVGElement).ownerSVGElement || event.target as SVGElement,
                                      event.touches[0],
                                    );
                                    showTooltip({
                                      tooltipData: `${sourceNode.name} → ${targetNode.name}: ${formatCurrency(link.value)}`,
                                      tooltipTop: (coords?.y ?? 0) - 30,
                                      tooltipLeft: (coords?.x ?? 0) - 50,
                                    });
                                  }}
                                  onMouseLeave={hideTooltip}
                                  onTouchEnd={hideTooltip}
                                  className="hover:stroke-opacity-80 transition-all duration-150 cursor-pointer"
                                />
                              );
                            })}
                          </Group>

                          {/* Nodes */}
                          <Group>
                            {graph.nodes.map((node, i) => {
                              const nodeColor = getNodeColor(node.category, node.id);
                              const isCenter = node.category === 'center';
                              
                              return (
                                <g key={i}>
                                  <BarRounded
                                    width={(node.x1 ?? 0) - (node.x0 ?? 0)}
                                    height={(node.y1 ?? 0) - (node.y0 ?? 0)}
                                    x={node.x0 ?? 0}
                                    y={node.y0 ?? 0}
                                    radius={4}
                                    fill={nodeColor}
                                    className="hover:brightness-110 transition-all duration-150 cursor-pointer"
                                    style={{
                                      minWidth: width < 640 ? '32px' : 'auto',
                                      minHeight: width < 640 ? '32px' : 'auto'
                                    }}
                                    onMouseMove={(event) => {
                                      const coords = localPoint(
                                        (event.target as SVGElement).ownerSVGElement || event.target as SVGElement,
                                        event,
                                      );
                                      let tooltipContent = `${node.name}: ${formatCurrency(node.value)}`;
                                      if (node.margin) {
                                        tooltipContent += ` (${node.margin}% margin)`;
                                      }
                                      if (node.yoyChange) {
                                        tooltipContent += ` ${node.yoyChange}`;
                                      }
                                      showTooltip({
                                        tooltipData: tooltipContent,
                                        tooltipTop: (coords?.y ?? 0) + 10,
                                        tooltipLeft: (coords?.x ?? 0) + 10,
                                      });
                                    }}
                                    onTouchStart={(event) => {
                                      const coords = localPoint(
                                        (event.target as SVGElement).ownerSVGElement || event.target as SVGElement,
                                        event.touches[0],
                                      );
                                      let tooltipContent = `${node.name}: ${formatCurrency(node.value)}`;
                                      if (node.margin) {
                                        tooltipContent += ` (${node.margin}% margin)`;
                                      }
                                      if (node.yoyChange) {
                                        tooltipContent += ` ${node.yoyChange}`;
                                      }
                                      showTooltip({
                                        tooltipData: tooltipContent,
                                        tooltipTop: (coords?.y ?? 0) - 40,
                                        tooltipLeft: (coords?.x ?? 0) - 50,
                                      });
                                    }}
                                    onMouseLeave={hideTooltip}
                                    onTouchEnd={hideTooltip}
                                  />
                                  
                                  {/* Node Labels - Conditional rendering for mobile */}
                                  {(width >= 640 || shouldShowTextOnMobile(node)) && (
                                    <text
                                      x={isCenter ? ((node.x0 ?? 0) + (node.x1 ?? 0)) / 2 : (node.category === 'source' || node.category === 'intermediate') ? (node.x0 ?? 0) - 8 : (node.x1 ?? 0) + 8}
                                      y={((node.y0 ?? 0) + (node.y1 ?? 0)) / 2}
                                      dy="0.35em"
                                      fontSize={isCenter ? responsive.fontSize.label + 2 : responsive.fontSize.label}
                                      fontWeight={width < 640 ? (isCenter ? 'bold' : '500') : (isCenter ? 'bold' : 'medium')}
                                      fill={isCenter ? '#1f2937' : (node.category === 'elimination' || node.category === 'expense') ? '#dc2626' : '#374151'}
                                      textAnchor={isCenter ? 'middle' : (node.category === 'source' || node.category === 'intermediate') ? 'end' : 'start'}
                                      className="font-sans pointer-events-none"
                                    >
                                      {isCenter ? node.name : (width < 640 && node.name.length > 12 ? node.name.substring(0, 12) + '...' : node.name)}
                                    </text>
                                  )}
                                  
                                  {/* Value Labels - Conditional rendering for mobile */}
                                  {(width >= 640 || shouldShowTextOnMobile(node)) && (
                                    <text
                                      x={isCenter ? ((node.x0 ?? 0) + (node.x1 ?? 0)) / 2 : (node.category === 'source' || node.category === 'intermediate') ? (node.x0 ?? 0) - 8 : (node.x1 ?? 0) + 8}
                                      y={((node.y0 ?? 0) + (node.y1 ?? 0)) / 2 + (isCenter ? 16 : 14)}
                                      dy="0.35em"
                                      fontSize={responsive.fontSize.value}
                                      fontWeight="medium"
                                      fill="#6b7280"
                                      textAnchor={isCenter ? 'middle' : (node.category === 'source' || node.category === 'intermediate') ? 'end' : 'start'}
                                      className="font-mono pointer-events-none"
                                    >
                                      {(node.category === 'elimination' || node.category === 'expense') ? `(${formatCurrency(node.value)})` : formatCurrency(node.value)}
                                      {node.margin && width >= 640 && ` (${node.margin}%)`}
                                      {node.yoyChange && !node.margin && width >= 640 && ` ${node.yoyChange}`}
                                    </text>
                                  )}
                                </g>
                              );
                            })}
                          </Group>
                        </>
                      )}
                    </Sankey>
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
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {tooltipData}
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