import { PropsWithChildren } from 'react';
import { SWRConfig } from "swr";
import React from "react";

// This wrapper allows us to clean up the SWR cache after each test
export const hookWrapper = ({ children }: PropsWithChildren) => (
  <SWRConfig value={{ provider: () => new Map() }}>
    {children}
  </SWRConfig>
);
