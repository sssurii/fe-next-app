import { useState } from "react";
export const usePasswordValidationVisibility = () => {
  const [isValidationVisible, setValidationVisibility] = useState(false);
  const showValidation = () => setValidationVisibility(true);
  const hideValidation = () => setValidationVisibility(false);

  return {
    isValidationVisible,
    hideValidation,
    showValidation,
  }
}
