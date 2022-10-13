const data = [
    { company: "Apple", finance: "AAPL" },
    { company: "Alphabet", finance: "GOOGL" },
    { company: "Microsoft", finance: "MSFT" },
    { company: "Amazon", finance: "AMZN" },
    { company: "Facebook", finance: "FB" },
    { company: "Tesla", finance: "TSLA" }
]

export const getCompanyName = (finance) => {
    let result = false;

    data.forEach(element => {
        if (finance === element.finance) {
            result = element.company;
        }
    });

    return result;
};