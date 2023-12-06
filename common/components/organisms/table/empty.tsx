import { Typography } from "@/common/components/atoms";
import { EmptyTableProps } from "@/common/components/organisms/table/types";

export const EmptyTable = ({
  colSpan, noResultsText,
}: EmptyTableProps) => {
  return (
    <tr>
      <td className="text-center" colSpan={colSpan}>
        <Typography variant="p" classes="text-gray-400 text-sm font-normal">
          {noResultsText}
        </Typography>
      </td>
    </tr>
  )
}
