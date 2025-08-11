interface DataTableProps {
  data: Array<Record<string, string | number>>;
  caption?: string;
}

export function DataTable({ data, caption }: DataTableProps) {
  if (!data || data.length === 0) {
    return <div className="text-gray-500 italic">No data available</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="my-8">
      {caption && (
        <p className="text-sm text-gray-600 mb-4 font-medium">{caption}</p>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-200"
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-200 last:border-b-0">
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-3 text-sm text-gray-900"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}