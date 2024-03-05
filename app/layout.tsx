import '../styles/globals.css'
import { Orbitron, Roboto_Mono, Ubuntu_Mono } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import {NextAuthProvider} from '@/context/nextAuthProvider'
import StripeProvider from '@/context/stripeProvider'
import ThemeRegistry from '@/styles/ThemeRegistry/ThemeRegistry'
import { Providers } from '@/lib/providers'
import ApolloClientProvider from '@/context/apolloProvider'
// import { ApolloProvider } from "@apollo/client";
// import { useApollo } from "@/lib/apolloClient";
//import { font } from '@/styles/ThemeRegistry/theme'

// export const font = Orbitron({
//   weight: ['400', '500', '600', '700', '800', '900'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

// export const font = Roboto_Mono({
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });

const font = Ubuntu_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  });

export const metadata = {
  title: 'Employable.Team',
  description: 'Find your Forever _.',
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }:LayoutProps) {
  //const apolloClient = useApollo();
  return (
    <NextAuthProvider>
      <StripeProvider>
        <Providers>
          <ApolloClientProvider>
            <ThemeRegistry>
              <html lang="en" className={font.className}>
                <body>
                  <div className={"layout-screen"}>
                    <Navigation />
                    {children}
                    <Footer />
                  </div>
                </body>
              </html>
            </ThemeRegistry>
          </ApolloClientProvider>
        </Providers>
      </StripeProvider>
    </NextAuthProvider>
  )
}