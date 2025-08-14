export interface FundSummary {
    NAV: number;
    unitPrice: number;
    totalUnits: number;
    investors: Array<{name: string; amount:number; units:number}>
}
