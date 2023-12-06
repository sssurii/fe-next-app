'use client'
import { useEffect } from 'react'
import { Button } from "@/common/components/atoms";
import lang from "@/common/lang";

const { boundaryError } = lang;

type ErrorProps = {
  error: Error;
  reset: () => void;
};

// This error boundary is used to catch errors in the React tree below it.
// It won't catch errors in async code, e.g. in `useEffect` or server side rendering and event handlers.

export default function Error ({
  error,
  reset,
}: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="flex flex-col items-center">
        <h1 className="font-black text-gray-200 text-7xl">{boundaryError.title}</h1>
        <p className="text-md text-center font-medium tracking-tight text-gray-700 sm:text-xl mt-2 mb-10">
          {boundaryError.description}
        </p>
        <Button
          width="auto"
          variant="solid"
          size="md"
          type="button"
          onClick={() => reset()}
        >
          {boundaryError.buttonText}
        </Button>
      </div>
    </div>
  )
}
