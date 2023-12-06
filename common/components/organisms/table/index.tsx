import { TableProps } from "@/common/components/organisms/table/types";
import { Loader } from "@/common/components/molecules";
import { Headers } from "@/common/components/organisms/table/headers";
import { Body } from "@/common/components/organisms/table/body";

export const Table = ({
  data, isLoading, columns, noResultsText, lastElementRef, scrollableContainerClass = 'max-h-tableScrollableContainerDefaultHeight',
}: TableProps)  => {
  return (
    <div className="inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden border border-gray-200 sm:rounded-lg relative">
        {isLoading && (
          <Loader width="w-full" height="h-full" position="absolute" />
        )}
        <div className={`${scrollableContainerClass} overflow-y-auto`} data-cy="table-scrollable-container">
          <table className="min-h-[124px] min-w-full divide-y divide-gray-200">
            <Headers columns={columns} />
            <Body columns={columns} rows={data} noResultsText={noResultsText} lastElementRef={lastElementRef} />
          </table>
        </div>
      </div>
    </div>
  )
}
