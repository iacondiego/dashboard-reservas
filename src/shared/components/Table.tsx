import { ReactNode } from 'react'

interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => ReactNode)
  className?: string
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  striped?: boolean
  hoverable?: boolean
}

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export function Table<T>({
  data,
  columns,
  className = '',
  striped = false,
  hoverable = true
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <svg
          className="mb-4 h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p className="text-lg font-medium">No hay datos disponibles</p>
        <p className="text-sm">Los datos aparecerán aquí cuando estén disponibles</p>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`
                    px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-700
                    ${alignClasses[column.align || 'left']}
                    first:rounded-tl-lg last:rounded-tr-lg
                  `}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`
                  transition-all duration-200
                  ${striped && rowIndex % 2 === 1 ? 'bg-gray-50/50' : ''}
                  ${hoverable ? 'hover:bg-primary-50/30 hover:shadow-sm' : ''}
                `}
              >
                {columns.map((column, colIndex) => {
                  const value = typeof column.accessor === 'function'
                    ? column.accessor(row)
                    : row[column.accessor]

                  return (
                    <td
                      key={colIndex}
                      className={`
                        px-6 py-4 text-sm text-gray-700
                        ${alignClasses[column.align || 'left']}
                        ${column.className || ''}
                      `}
                    >
                      {value as ReactNode}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
