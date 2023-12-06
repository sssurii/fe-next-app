import { CheckboxProps } from './types';
export const Checkbox = ({
  id = '',
  name = '',
  ariaDescribedBy = '',
  checked = false,
  onChange = () => null,
  onBlur = () => null,
  error = false,
  ...rest
}: CheckboxProps) => {
  const ring = error ? 'ring-2 ring-red-500 ring-offset-2' : '';
  return (
    <div className="flex h-6 items-center">
      <input
        id={id}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={ariaDescribedBy}
        name={name}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 ${ring}`}
        {...rest}
      />
    </div>
  );
};

