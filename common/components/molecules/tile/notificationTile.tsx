import { memo } from "react";
import { TileProps } from "@/common/components/molecules/tile/types";
import BasicTile from "@/common/components/molecules/tile/basicTile";

const maxStringLength = 126;

const NotificationTile = ({
  data, read_at, onIndicatorClick, onActionButtonClick, actionButtonText, onTileClickCallback,
}: TileProps) => {
  return (
    <div className="cursor-pointer col-span-1 divide-y divide-gray-200 rounded-lg border border-gray-200 hover:bg-gray-50">
      <div
        className="flex flex-col w-full justify-between space-x-3 py-5 px-4"
        onClick={onTileClickCallback}
      >
        <BasicTile
          data={data}
          maxMessageLength={maxStringLength}
          showIndicator={!read_at}
          onIndicatorClick={onIndicatorClick}
          onActionButtonClick={onActionButtonClick}
          actionButtonText={actionButtonText}
        />
      </div>
    </div>
  )
}

export default memo(NotificationTile);

