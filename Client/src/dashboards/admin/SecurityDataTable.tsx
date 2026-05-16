import React, { useState } from 'react'
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface Column<T> {
  key: string
  label: string
  render?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
  className?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  pagination?: {
    page: number
    total: number
    pages: number
    onPageChange: (page: number) => void
  }
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort?: (key: string) => void
}

export const SecurityDataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  (
    {
      columns,
      data,
      loading = false,
      pagination,
      sortBy,
      sortOrder = 'asc',
      onSort,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin">
              <div className="h-8 w-8 border-4 border-blue-300 border-t-blue-600 rounded-full" />
            </div>
            <p className="text-gray-600 mt-2">Loading data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No data available</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className={`px-6 py-3 text-left font-semibold text-gray-700 ${
                          col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                        } ${col.className || ''}`}
                        onClick={() => col.sortable && onSort?.(col.key)}
                      >
                        <div className="flex items-center gap-2">
                          {col.label}
                          {col.sortable && sortBy === col.key && (
                            <>
                              {sortOrder === 'asc' ? (
                                <ChevronUp size={14} />
                              ) : (
                                <ChevronDown size={14} />
                              )}
                            </>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((row, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-6 py-4 text-gray-900 ${col.className || ''}`}
                        >
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination && (
              <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages} ({pagination.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      pagination.page > 1 &&
                      pagination.onPageChange(pagination.page - 1)
                    }
                    disabled={pagination.page === 1}
                    className="p-2 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      pagination.page < pagination.pages &&
                      pagination.onPageChange(pagination.page + 1)
                    }
                    disabled={pagination.page === pagination.pages}
                    className="p-2 rounded border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    )
  },
)

SecurityDataTable.displayName = 'SecurityDataTable'

export default SecurityDataTable
