interface DataTableProps {
  data: Array<Record<string, string | number>>;
  caption?: string;
  headerStyle?: 'default' | 'dark';
  stripedRows?: boolean;
  compactMode?: boolean;
}

export function DataTable({ 
  data, 
  caption, 
  headerStyle = 'dark',
  stripedRows = true,
  compactMode = false 
}: DataTableProps) {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 italic">No data available</div>;
  }

  const headers = Object.keys(data[0]);

  // Smart detection for numeric values
  const isNumeric = (value: string | number): boolean => {
    if (typeof value === 'number') return true;
    if (typeof value !== 'string') return false;
    
    // Remove common formatting and check if numeric
    const cleaned = value.toString().replace(/[$,%\s]/g, '');
    return /^[+-]?\d+\.?\d*[%]?$/.test(cleaned) && cleaned !== '';
  };

  // Determine if a column contains primarily numeric data
  const getColumnType = (header: string): 'numeric' | 'text' => {
    const sampleSize = Math.min(data.length, 5);
    const numericCount = data.slice(0, sampleSize)
      .filter(row => isNumeric(row[header]))
      .length;
    
    return numericCount >= sampleSize * 0.6 ? 'numeric' : 'text';
  };

  const columnTypes = headers.reduce((acc, header) => {
    acc[header] = getColumnType(header);
    return acc;
  }, {} as Record<string, 'numeric' | 'text'>);

  // Format header text
  const formatHeader = (header: string): string => {
    return header
      .split(/(?=[A-Z])|[_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Cell padding based on compact mode
  const cellPadding = compactMode ? 'px-3 py-2' : 'px-4 py-3';

  return (
    <div className="my-8">
      {caption && (
        <p className="text-sm text-gray-600 mb-4 font-medium italic">{caption}</p>
      )}
      <div className="overflow-x-auto shadow-sm border border-gray-300 rounded-sm">
        <table className="min-w-full">
          <thead className={headerStyle === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className={`
                    ${cellPadding} 
                    text-xs font-semibold uppercase tracking-wide border-b border-gray-300
                    ${headerStyle === 'dark' ? 'text-white' : 'text-gray-900'}
                    ${columnTypes[header] === 'numeric' ? 'text-right' : 'text-left'}
                  `}
                >
                  {formatHeader(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr 
                key={index} 
                className={`
                  border-b border-gray-200 last:border-b-0
                  ${stripedRows && index % 2 === 1 ? 'bg-blue-50' : 'bg-white'}
                  hover:bg-gray-50 transition-colors duration-150
                `}
              >
                {headers.map((header) => {
                  const isNumericCell = columnTypes[header] === 'numeric';
                  return (
                    <td
                      key={header}
                      className={`
                        ${cellPadding} text-sm border-r border-gray-200 last:border-r-0
                        ${isNumericCell 
                          ? 'text-right font-mono text-gray-900' 
                          : 'text-left text-gray-800'
                        }
                      `}
                    >
                      {row[header]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}