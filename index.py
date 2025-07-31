# مدل ساده صندوق سرمایه‌گذاری با قابلیت اضافه کردن سرمایه‌گذار، سود/زیان و محاسبه سهم

class InvestmentFund:
    def __init__(self):
        self.nav = 0.0  # Net Asset Value
        self.total_units = 0.0
        self.investors = {}  # investor_name -> units owned

    def unit_price(self):
        return self.nav / self.total_units if self.total_units else 0.0

    def invest(self, investor_name, amount):
        price = self.unit_price() or 1.0  # اگر صندوق خالی باشد، قیمت واحد ۱ در نظر گرفته می‌شود
        units_bought = amount / price

        self.nav += amount
        self.total_units += units_bought

        if investor_name in self.investors:
            self.investors[investor_name] += units_bought
        else:
            self.investors[investor_name] = units_bought

        return units_bought

    def apply_profit_or_loss(self, change_amount):
        self.nav += change_amount
        if self.nav < 0:
            self.nav = 0

    def get_investor_value(self, investor_name):
        price = self.unit_price()
        units = self.investors.get(investor_name, 0)
        return units * price

    def summary(self):
        price = self.unit_price()
        return {
            "NAV": round(self.nav, 2),
            "Unit Price": round(price, 4),
            "Total Units": round(self.total_units, 4),
            "Investors": {
                name: {
                    "Units": round(units, 4),
                    "Value": round(units * price, 2)
                }
                for name, units in self.investors.items()
            }
        }

# شبیه‌سازی اولیه
fund = InvestmentFund()

# دو سرمایه‌گذاری اولیه
fund.invest("A", 1000)
fund.invest("B", 500)
fund.invest("C", 4000)
fund.invest("D", 5000)

# اعمال سود
fund.apply_profit_or_loss(300)

# سرمایه‌گذاری مجدد توسط B
fund.invest("B", 600)

fund.apply_profit_or_loss(-500)



# گزارش نهایی
fund.summary()

