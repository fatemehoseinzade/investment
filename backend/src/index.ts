import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { InvestmentFund } from './fundation';
import db from './db'

const app = express();
const port = 3001;


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Investment Fund API",
            version: "1.0.0",
            description: "API برای مدیریت صندوق سرمایه‌گذاری",
        },
        servers: [
            {
                url: "http://localhost:3001",
            },
        ],
    },
    apis: ["./src/index.ts"], // اینجا فایل‌های TS/JS که داکیومنت نوشته شده اند
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
    origin: "http://localhost:5173", // پورت کلاینت React
}));
app.use(express.json());

// نمونه‌ای از کلاس
const fund = new InvestmentFund();

// تعریف نوع برای درخواست سرمایه‌گذاری
interface InvestRequestBody {
    investor_name: string;
    amount: number;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     InvestRequest:
 *       type: object
 *       required:
 *         - investor_name
 *         - amount
 *       properties:
 *         investor_name:
 *           type: string
 *           description: نام سرمایه‌گذار
 *         amount:
 *           type: number
 *           description: مبلغ سرمایه‌گذاری
 *       example:
 *         investor_name: "Ali"
 *         amount: 1000
 *     InvestResponse:
 *       type: object
 *       properties:
 *         investor_name:
 *           type: string
 *         unitsBought:
 *           type: number
 */



/**
 * @swagger
 * /invest:
 *   post:
 *     summary: افزودن سرمایه‌گذار به صندوق
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvestRequest'
 *     responses:
 *       200:
 *         description: سرمایه‌گذاری با موفقیت ثبت شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvestResponse'
 *       400:
 *         description: داده‌های ورودی ناقص است
 */

app.post('/invest', (req, res) => {
    const { investor_name, amount } = req.body;
    if (!investor_name || !amount) {
        return res.status(400).json({ error: 'Missing investor_name or amount' });
    }
    const result = fund.invest(investor_name, amount);

    db.run(
        `INSERT INTO investors (name, units)
         VALUES (?, ?)
         ON CONFLICT(name) DO UPDATE SET units = units + ?`,
        [investor_name, result, result]
    );

    res.json(result);
});



/**
 * @swagger
 * /data:
 *   get:
 *     summary: گرفتن اطلاعات کلی صندوق
 *     responses:
 *       200:
 *         description: خلاصه صندوق
 */


// API برای گرفتن اطلاعات
app.get('/data', (_req: Request, res: Response) => {
    res.json(fund.summary());
});



/**
 * @swagger
 * /profit:
 *   post:
 *     summary: اعمال سود یا زیان به صندوق
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: مقدار سود (مثبت) یا زیان (منفی)
 *             example:
 *               amount: 500
 *     responses:
 *       200:
 *         description: تغییر اعمال شد و خلاصه صندوق برگشت داده شد
 */
app.post('/profit', (req: Request, res: Response) => {
  const { amount } = req.body;
  if (typeof amount !== 'number') return res.status(400).json({ error: 'Invalid amount' });

  fund.applyProfitOrLoss(amount);
  res.json(fund.summary());
});



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



