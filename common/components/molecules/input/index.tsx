import {
  useMemo, ReactNode,
} from 'react';
import { Input as DefaultInput } from '../../atoms'
import { MoleculeInputProps } from "@/common/components/molecules/input/types";
import { ExclamationErrorIcon } from "@/common/components/icons";

const getOptionalTextPlacingClass = (optionalText: string | ReactNode | undefined, labelText: string | undefined) => {
  return optionalText && !labelText ? 'justify-end' : 'justify-between';
}
export const Input = ({
  id = 'input-id',
  name = 'input-name',
  width = 'w-60',
  labelText = '',
  optionalText = '',
  error = false,
  errorMessage = '',
  ...rest
}: MoleculeInputProps) => {
  const optionalTextPlacingClass = useMemo(() => {
    return getOptionalTextPlacingClass(optionalText, labelText)
  }, [optionalText, labelText]);

  const input = useMemo(() => {
    const inputProps = {
      id,
      name,
      error,
      ...rest,
    }
    return (
      <>
        <DefaultInput {...inputProps} />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          {error && <ExclamationErrorIcon />}
        </div>
      </>
    )
  }, [error, id, name, rest]);

  if (!labelText && !optionalText) {
    return (
      <div className={width}>
        <div className="relative">
          {input}
        </div>
        {error && (
          <p className="mt-0.5 text-sm text-red-600" data-cy={`${name}-error`}>
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={width}>
      <div className={`flex ${optionalTextPlacingClass}`}>
        {labelText && (
          <label htmlFor={id} className="block text-sm font-medium text-text-primary">
            {labelText}
          </label>
        )}
        {optionalText && (
          <span className="text-sm text-text-secondary">
            {optionalText}
          </span>
        )}
      </div>
      <div className="mt-2 relative">
        {input}
      </div>
      {error && (
        <p className="mt-0.5 text-sm text-red-600" data-cy={`${name}-error`}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
