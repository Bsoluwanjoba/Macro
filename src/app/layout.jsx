
import { Poppins } from 'next/font/google'
import "./globals.css";

const inter = Poppins({ subsets: ['latin'], weight: ['400'] })

export const metadata = {
  title: "MacRonics | No 1 Leading Store",
  description: "A very faast and reliable shopping store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
            {children}
      </body>
    </html>
  );
}
