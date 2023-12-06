// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers/handlers';

// This configures a request mocking server with the given request index.
export const mswServer = setupServer(...handlers);
