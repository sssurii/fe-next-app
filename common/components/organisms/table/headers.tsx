import { HeadersProps } from "@/common/components/organisms/table/types";
import {
  ChevronUpIcon, ChevronDownIcon,
} from "@/common/components/icons";
import { columnOrderTypes } from "@/common/constants";

export const Headers = ({
  columns, order = 'asc', onColumnClick,
}: HeadersProps) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(({
          key, value, isSortable, ...rest
        }) => (
          <th
            key={key}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-text-secondary"
            onClick={() => isSortable && onColumnClick && onColumnClick(key)}
            {...rest}
          >
            <span className="group inline-flex items-center">
              {value}
              {isSortable && (
                <button
                  type="button"
                  className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300"
                  data-cy={`sort_by_${key}`}
                >
                  {order === columnOrderTypes.asc ? (
                    <ChevronUpIcon />
                  ) : (
                    <ChevronDownIcon />
                  )}
                </button>
              )}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  )
}
