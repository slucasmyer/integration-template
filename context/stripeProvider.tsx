'use client';
import { useState, useEffect, createContext } from "react";
import getStripe from '@/utils/get-stripejs';

export const StripeContext = createContext<any>({});

const importStripe = async (setter: any) => {
  const stripePromise = getStripe();
  setter(await stripePromise)
}

export default function StripeProvider ({ children }:any) {
  const [stripe, setStripe] = useState<any>(null);
  
  useEffect(() => {
    importStripe(setStripe)
  }, [])

  return (
    <StripeContext.Provider value={{ stripeObj: stripe }}>
      {children}
    </StripeContext.Provider>
  );
};