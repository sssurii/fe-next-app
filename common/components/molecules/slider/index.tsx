import { ChangeEvent } from "react";

type SliderProps = {
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
  step: number;
}

export const Slider = (props: SliderProps) => {
  return (
    <div className="w-full relative">
      <input
        type="range"
        className="w-full appearance-none h-[4px] bg-gray-300 rounded-full accent-brand-500 focus:outline-none outline:none"
        {...props}
      />
      <div className="absolute"> </div>
    </div>
  )
}
