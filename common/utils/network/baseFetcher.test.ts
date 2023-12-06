import {
  fetcher,
} from "@/common/utils/network/baseFetcher";
import {
  definitionOfFailureRequests,
  definitionOfSuccessRequests,
  typesOfRequests,
} from "@/common/mockServiceWorker/handlers/baseFetcher";

const getGivenValues = (code: number, body: any) => {
  const url = `https://test.env/api/v1/baseFetcher/${code}`;
  const expectedCode = code;
  const expectedBody = body;
  return {
    url,
    expectedCode,
    expectedBody,
  };
}
jest.mock("next-auth/react");

describe('baseFetcher', () => {
  describe.each(definitionOfSuccessRequests)('success', ({
    code, body,
  }) => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return body ${JSON.stringify(body)} and code ${code}`, async () => {
        // given
        const {
          url, expectedCode, expectedBody,
        } = getGivenValues(code, body);
        // when
        const result: any = await fetcher(url, { arg: { method } })
        // then
        expect(result.status).toEqual(expectedCode);
        expect(result.data).toEqual(expectedBody);
      });
    });
  });

  describe.each(definitionOfFailureRequests)('failure', ({
    code, body,
  }) => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return body ${JSON.stringify(body)} and code ${code}`, async () => {
        // given
        const {
          url, expectedCode,
        } = getGivenValues(code, body);
        // when
        try {
          await fetcher(url, { arg: { method } });
        } catch (error: any) {
          // then
          expect(error.cause.statusCode).toEqual(expectedCode);
        }
      });
    });
  });

  describe('network error', () => {
    describe.each(typesOfRequests)(`for method $method`, ({ method }) => {
      it(`should return handle network error`, async () => {
        // given
        const url = `http://localhost/api/v1/baseFetcher/networkError`;
        // when
        try {
          await fetcher(url, { arg: {
            method,
            headers: { Authorization: `Bearer someWeirdToken` },
          } });
        } catch (error: any) {
          // then
          expect(error.message).toBe('Failed to fetch');
        }
      });
    });
  });
});
