import { EmptyTable } from "@/common/components/organisms/table/empty";
import {
  BodyProps, RowItem,
} from "@/common/components/organisms/table/types";

export const Body = ({
  noResultsText, columns, rows, lastElementRef,
}: BodyProps<RowItem>) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {rows && rows.length > 0 ? (
        rows.map((item, idx) => {
          const isLastElement = rows.length === idx + 1;
          return (
            <tr key={item.id} ref={isLastElement && lastElementRef ? lastElementRef : null}>
              {columns.map(({ key }, idx) => {
                return (
                  <td
                    key={`${item.id}_${idx}`}
                    className={`whitespace-nowrap px-6 py-4 text-sm ${idx === 0 ? 'font-medium text-text-primary' : ' font-normal text-gray-600'}`}
                  >
                    {item[key as keyof RowItem]}
                  </td>
                )
              })}
            </tr>
          )
        })
      ) : <EmptyTable colSpan={columns.length} noResultsText={noResultsText} />}
    </tbody>
  )
}
