type InvestorData = {
    [name: string]: number; // name → units owned
};

interface FundSummary {
    NAV: number;
    unitPrice: number;
    totalUnits: number;
    investors: Array<{name: string; units: number; amount:number;}>
}

export class InvestmentFund {
    private nav: number; // Net Asset Value
    private totalUnits: number;
    private investors: InvestorData;

    constructor() {
        this.nav = 0;
        this.totalUnits = 0;
        this.investors = {};
    }

    /**
     * محاسبه قیمت واحد
     */
    public unitPrice(): number {
        return this.totalUnits > 0 ? this.nav / this.totalUnits : 0;
    }

    /**
     * سرمایه‌گذاری یک سرمایه‌گذار
     */
    public invest(investorName: string, amount: number): number {
        const price = this.unitPrice() || 1.0;
        const unitsBought = amount / price;

        this.nav += amount;
        this.totalUnits += unitsBought;

        if (this.investors[investorName]) {
            this.investors[investorName] += unitsBought;
        } else {
            this.investors[investorName] = unitsBought;
        }

        return unitsBought;
    }

    /**
     * اعمال سود یا زیان
     */
    public applyProfitOrLoss(changeAmount: number): void {
        this.nav += changeAmount;
        if (this.nav < 0) {
            this.nav = 0;
        }
    }

    /**
     * ارزش سرمایه‌گذار خاص
     */
    public getInvestorValue(investorName: string): number {
        const price = this.unitPrice();
        const units = this.investors[investorName] || 0;
        return units * price;
    }

    /**
     * گزارش کلی
     */
    public summary(): FundSummary {
        const price = this.unitPrice();
        const investorsSummary: FundSummary['investors'] = [];

        for (const [name, units] of Object.entries(this.investors)) {
            investorsSummary.push({
                name, 
                units:parseFloat(units.toFixed(4)),
                amount: parseFloat((units * price).toFixed(2)),
            })
        }

        return {
            NAV: parseFloat(this.nav.toFixed(2)),
            unitPrice: parseFloat(price.toFixed(4)),
            totalUnits: parseFloat(this.totalUnits.toFixed(4)),
            investors: investorsSummary,
        };
    }
}
