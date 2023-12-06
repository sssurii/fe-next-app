import { Heading } from "@/common/components/organisms/flyoutMenu/heading";
import { Typography } from "@/common/components/atoms";
import lang from "@/common/lang";
import { NotificationListProps } from "@/common/components/organisms/flyoutMenu/types";
import { NotificationOptions } from "@/common/components/molecules/options";

const { notifications } = lang;

export const NotificationList = ({
  options, title, headerButtonProps, onUpdateNotificationsStatus, actionButtonCallbacks, actionButtonTexts,
}: NotificationListProps) => {
  return (
    <div className="w-screen max-w-[280px] sm:max-w-[420px] flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-sm
            border border-gray-200">
      {(title || headerButtonProps) && (
        <Heading title={title} headerButtonProps={headerButtonProps} />
      )}
      {options.length === 0 ? (
        <div className="flex items-center justify-center py-6">
          <Typography variant="h3" classes="text-grey-300 font-medium text-lg">
            {notifications.allClear}
          </Typography>
        </div>
      ) : (
        <div className="max-h-[356px] scroll-smooth overflow-auto divide-y divide-gray-100">
          <NotificationOptions
            options={options}
            callback={onUpdateNotificationsStatus}
            actionButtonCallbacks={actionButtonCallbacks}
            actionButtonTexts={actionButtonTexts}
          />
        </div>
      )}
    </div>
  )
}
