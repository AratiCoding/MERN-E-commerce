const TableSkeleton = ({ rows = 5, columns = 4 }) => (
  <div className="w-full bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
    {/* Table Header Skeleton */}
    <div className="bg-gray-50 border-b border-gray-100 p-4 flex gap-4">
      {[...Array(columns)].map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
      ))}
    </div>

    {/* Table Rows Skeleton */}
    <div className="divide-y divide-gray-100">
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="p-4 flex items-center gap-4">
          {[...Array(columns)].map((_, colIndex) => (
            <div 
              key={colIndex} 
              className={`h-3 bg-gray-100 rounded w-full ${
                colIndex === columns - 1 ? "max-w-[80px]" : "" // Make last col (actions) shorter
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default TableSkeleton;