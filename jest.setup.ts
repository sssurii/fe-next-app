import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
import { mswServer } from "@/common/mockServiceWorker/server";
import { configure } from '@testing-library/react';
// Establish API mocking before all tests.
beforeAll(() => mswServer.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mswServer.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => mswServer.close())
// Use cypress data id selector instead default data-testid
configure({ testIdAttribute: 'data-cy' });
