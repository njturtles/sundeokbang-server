export function getConditions(message: string) {
    const minDepositMatch = message.match(/보증금\s*(\d+)\s*만원 이상/);
    const maxDepositMatch = message.match(/보증금\s*(\d+)\s*만원 이하/);
    const minCostMatch = message.match(/월세\s*(\d+)\s*만원 이상/);
    const maxCostMatch = message.match(/월세\s*(\d+)\s*만원 이하/);

    const minDeposit = minDepositMatch
        ? parseInt(minDepositMatch[1], 10) * 10000
        : null;
    const maxDeposit = maxDepositMatch
        ? parseInt(maxDepositMatch[1], 10) * 10000
        : null;
    const minCost = minCostMatch ? parseInt(minCostMatch[1], 10) * 10000 : null;
    const maxCost = maxCostMatch ? parseInt(maxCostMatch[1], 10) * 10000 : null;

    return { minDeposit, maxDeposit, minCost, maxCost };
}
