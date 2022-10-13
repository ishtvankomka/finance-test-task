import { getCompanyName } from "./financeData"

describe('testing finance function', () => {
    test('AAPL is Apple', () => {
        expect(getCompanyName("AAPL")).toBe("Apple");
    });

    test('MSFT is Microsoft', () => {
        expect(getCompanyName("MSFT")).toBe("Microsoft");
    });
});
