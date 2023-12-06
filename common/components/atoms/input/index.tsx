import { useMemo } from 'react';
import {
  InputProps, IconComponent,
} from './types';

const baseInputClasses = `flex w-full rounded-md border-0 py-3 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 
placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm leading-tight
disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-text-secondary disabled:ring-gray-200`;
const getErrorClasses = (error: boolean | undefined) => error ? 'ring-2 ring-red-500 pr-10' : '';
const getIconClasses = (icon: IconComponent | undefined) => icon ? 'pl-10' : '';
export const Input = ({
  type = 'text',
  name = 'input-name',
  id = 'input-id',
  placeholder = '',
  value = '',
  error = false,
  extraClasses,
  icon: Icon,
  ...rest
}: InputProps) => {
  const computedClasses = useMemo(() => {
    const errorClasses = getErrorClasses(error);
    const iconClasses = getIconClasses(Icon);
    return `${errorClasses} ${iconClasses} ${extraClasses}`;
  }, [error, Icon, extraClasses]);

  return (
    <>
      {!!Icon && <Icon className="absolute top-0 bottom-0 left-3 mx-0 my-auto" />}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className={`${baseInputClasses} ${computedClasses}`}
        placeholder={placeholder}
        {...rest}
      />
    </>
  )
}
