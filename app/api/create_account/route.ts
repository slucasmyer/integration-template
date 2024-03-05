import { NextResponse } from 'next/server';
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-08-16' })

export async function GET(request: Request) { }

export async function HEAD(request: Request) { }

export async function POST(request: Request) {
  try {
    const account = await stripe.accounts.create({ type: 'standard' });
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://localhost:3000/account',
      return_url: 'https://localhost:3000/account',
      type: 'account_onboarding',
    });
    return NextResponse.json({account: account, accountLink: accountLink})
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    if (err! instanceof Error) console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    return NextResponse.json({ err: err })
  }
}

export async function PUT(request: Request) { }

export async function DELETE(request: Request) { }

export async function PATCH(request: Request) { }
/*
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.method', req.method)
  if (req.method === 'POST') {
    try {
      const account = await stripe.accounts.create({
        type: 'standard',
      });
      res.status(200).json(account);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      if (err! instanceof Error) console.log(err)
      console.log(`❌ Error message: ${errorMessage}`)
      res.status(500).send(`Webhook Error: ${errorMessage}`)
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(200).json({message:`Method Not Allowed - ${req.method}`, error: true, req: req });
    //res.status(405).end(`Method Not Allowed - ${req.method}`);
  }
}
*/