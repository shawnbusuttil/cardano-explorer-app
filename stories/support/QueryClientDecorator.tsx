import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface IProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const QueryClientDecorator = ({ children }: IProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
