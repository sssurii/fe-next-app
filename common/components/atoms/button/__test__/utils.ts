const solidButtonBaseClass = `flex items-center bg-brand-500 text-white rounded-md enabled:hover:bg-brand-300 
disabled:bg-grey-300 disabled:cursor-not-allowed`;
const secondaryButtonBaseClass = `flex items-center justify-center border border-grey-300 shadow-sm bg-white text-grey-900 rounded-md enabled:hover:bg-grey-50
disabled:bg-grey-300 disabled:border-grey-300 disabled:text-white disabled:cursor-not-allowed`;
const outlinedButtonBaseClass = `bg-white border border-solid border-brand-500 text-brand-500 rounded-md enabled:hover:bg-brand-500
enabled:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`;
const circularButtonBaseClass = `inline-flex items-center justify-center bg-brand-500 rounded-full text-white enabled:hover:bg-brand-300
disabled:opacity-50 disabled:cursor-not-allowed`
export const buttonClasses = {
  solidSm: `${solidButtonBaseClass} px-3 py-1.5 font-medium text-sm`,
  solidMd: `${solidButtonBaseClass} px-4 py-2.5 font-semibold text-base`,
  solidLg: `${solidButtonBaseClass} px-4 py-3.5 font-semibold text-base`,
  outlinedSm: `${outlinedButtonBaseClass} px-3 py-[7px] font-medium text-sm`,
  outlinedMd: `${outlinedButtonBaseClass} px-4 py-2.5 font-semibold text-base`,
  outlinedLg: `${outlinedButtonBaseClass} px-4 py-3.5 font-semibold text-base`,
  circularSm: `${circularButtonBaseClass} p-2`,
  circularMd: `${circularButtonBaseClass} p-3`,
  circularLg: `${circularButtonBaseClass} p-4`,
  secondarySm: `${secondaryButtonBaseClass} px-3 py-[7px] font-medium text-sm`,
  secondaryMd: `${secondaryButtonBaseClass} px-4 py-2.5 font-semibold text-base`,
  secondaryLg: `${secondaryButtonBaseClass} px-4 py-3.5 font-semibold text-base`,
}
