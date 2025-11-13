import React from 'react';

function DynamicTable({columns = [],data = [], className = '', striped = true, hover = true, emptyMessage = 'No hay datos disponibles',}) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto rounded-lg shadow-sm ${className}`}>
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-100 border-b">
            {columns.map((header, index) => (
              <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider" >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} lassName={` ${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : ''} ${hover ? 'hover:bg-gray-100' : ''} transition-colors`} >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;