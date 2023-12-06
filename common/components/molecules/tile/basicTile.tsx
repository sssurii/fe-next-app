import {
  Button,
  Typography, UserInitials,
} from "@/common/components/atoms";
import { truncateString } from "@/common/utils/helpers";
import { BasicTileProps  } from "@/common/components/molecules/tile/types";

const maxStringLength = 126;

const BasicTile = ({
  data,
  maxMessageLength = maxStringLength,
  showIndicator = false,
  onIndicatorClick,
  onActionButtonClick,
  actionButtonText,
}: BasicTileProps ) => {
  const shouldTruncate = data.message.length > maxMessageLength;
  return (
    <div className="w-full flex space-x-3">
      <UserInitials initials="TK" />
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-3">
          <Typography variant="p" classes="truncate font-semibold text-text-primary text-sm">
            {data.title}
          </Typography>
        </div>
        <Typography variant="p" classes="truncate mt-1 whitespace-normal text-text-primary text-sm">
          {shouldTruncate ? truncateString({
            string: data.message,
            length: maxMessageLength,
          }) : data.message}
        </Typography>
        {actionButtonText && (
          <div className="mt-4">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onActionButtonClick}
              data-cy="tile-action-button"
            >
              {actionButtonText}
            </Button>
          </div>
        )}
      </div>
      {showIndicator && (
        <span
          className="w-4 h-4 rounded-full bg-brand-500 hover:bg-brand-300 cursor-pointer"
          onClick={onIndicatorClick}
          data-cy="tile-indicator-icon"
        >
        </span>
      )}
    </div>
  )
}

export default BasicTile;
