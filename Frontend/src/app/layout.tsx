import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
// import SessionProviderWrapper from "@/components/ui/SessionProviderWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// This is purely for the server-side
export const metadata: Metadata = {
  title: 'Universal Motors Dealer Portal',
  description: '…',
  viewport:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster
          position="bottom-right"
          visibleToasts={1}
          duration={3000}
          expand={true}
          richColors
          toastOptions={{
            style: {
              background: 'red',
              color: '#f3f4f6',
              border: '1px solid rgb(81, 57, 55)',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '14px',
              padding: '12px 16px',
              boxShadow: '0 8px 12px -2px rgba(0,0,0,0.4)',
              maxWidth: '90vw',
              margin: '0 auto',
            },
            classNames: {
              error: 'bg-red-600 text-white border border-red-800 shadow-lg animate-slide-in',
              success: 'bg-green-600 text-white border border-green-800 shadow-lg animate-slide-in',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
