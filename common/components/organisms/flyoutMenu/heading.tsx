import {
  Button, Typography,
} from "@/common/components/atoms";


type HeadingProps = {
  /** The title for the flyout menu */
  title?: string;
  /** The text for button placed in menu header */
  headerButtonProps?: {
    name: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

export const Heading = ({
  title, headerButtonProps,
}: HeadingProps) => {
  return (
    <div className="flex items-center justify-between gap-x-6 p-4 border-b border-gray-100">
      {title && (
        <Typography variant="p" classes="text-text-primary font-semibold text-sm">
          {title}
        </Typography>
      )}
      {headerButtonProps && (
        <Button
          type="button"
          variant="plain"
          size="sm"
          onClick={headerButtonProps.onClick}
          disabled={headerButtonProps.disabled}
          data-cy="trigger-header-action-button"
        >
          {headerButtonProps.name}
        </Button>
      )}
    </div>
  )
}
