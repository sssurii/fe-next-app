// py classes on elements with border may differ from figma values because figma applies border inside element and browser applies it outside,
// so we need to compensate that difference by reducing horizontal padding
export const themeElements = {
  buttons: {
    solid: {
      style: `flex items-center justify-center bg-brand-500 text-white rounded-md enabled:hover:bg-brand-300
disabled:bg-grey-300 disabled:cursor-not-allowed`,
      size: {
        sm: 'px-3 py-1.5 font-medium text-sm',
        md: 'px-4 py-2.5 font-semibold text-base',
        lg: 'px-4 py-3.5 font-semibold text-base',
      },
    },
    outlined: {
      style: `flex items-center justify-center bg-white border border-solid border-brand-500 text-brand-500 rounded-md enabled:hover:bg-brand-500
enabled:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`,
      size: {
        sm: 'px-3 py-[7px] font-medium text-sm',
        md: 'px-4 py-2.5 font-semibold text-base',
        lg: 'px-4 py-3.5 font-semibold text-base',
      },
    },
    circular: {
      style: `inline-flex items-center justify-center bg-brand-500 rounded-full text-white enabled:hover:bg-brand-300
disabled:opacity-50 disabled:cursor-not-allowed`,
      size: {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4',
      },
    },
    secondary: {
      style: `flex items-center justify-center border border-grey-300 shadow-sm bg-white text-grey-900 rounded-md enabled:hover:bg-grey-50
disabled:bg-grey-300 disabled:border-grey-300 disabled:text-white disabled:cursor-not-allowed`,
      size: {
        sm: 'px-3 py-[7px] font-medium text-sm',
        md: 'px-4 py-2.5 font-semibold text-base',
        lg: 'px-4 py-3.5 font-semibold text-base',
      },
    },
    plain: {
      style: `flex items-center justify-center border text-brand-500 outline-none border-none disabled:cursor-not-allowed
      enabled:hover:text-brand-300 disabled:text-brand-200`,
      size: {
        sm: 'px-3 py-[7px] font-medium text-sm',
        md: 'px-4 py-2.5 font-semibold text-base',
        lg: 'px-4 py-3.5 font-semibold text-base',
      },
    },
  },
  links: {
    outlined: {
      style: `flex items-center justify-center border border-grey-300 shadow-sm bg-white text-grey-600 rounded-md hover:bg-grey-50
              disabled:bg-grey-300 disabled:border-grey-300 disabled:text-white disabled:cursor-not-allowed px-3 py-1.5 font-semibold text-sm`,
    },
  },
}
