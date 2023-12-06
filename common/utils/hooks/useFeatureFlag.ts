import {
  useEffect, useState,
} from "react";

export const useFeatureFlag = (featureFlag: string) => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetch(`/api/featureFlags?flag=${featureFlag}`).then(async (res) => {
      const { flagValue } = await res.json();
      setFlag(flagValue);
    });
  }, [])

  return flag;
}
