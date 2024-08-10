import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "../Providers";
const inter = Inter({ subsets: ["latin"] });

import ReduxProvider from "../redux/Reduxprovider";

// import { useRouter } from "next/navigation";

export const metadata = {
  title: "MovieWala",
  description: "Watch all movies for free",
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
           
       
          
          
            {children}
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}