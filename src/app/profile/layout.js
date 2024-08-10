import { Inter } from "next/font/google";
import "../globals.css";
import Providers from "../Providers";
const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";
import Navbar from "@/components/Navbar";
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
           
       
                {/* <Header />
                <Navbar className="sm:hidden lg:block" />
                <SearchBox /> */}
          
            {children}
          </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}