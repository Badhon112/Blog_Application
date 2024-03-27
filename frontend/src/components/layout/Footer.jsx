import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useLocation } from "react-router-dom";
// import { Footer } from "flowbite-react";
const Footer = () => {
  const isDashboard = useLocation("http://localhost:5173/dashboard");
  const { mode, setMode } = useContext(Context);
  // return (
  //   <>
  //     {/* <footer
  //       className={
  //         isDashboard.pathname === "/dashboard"
  //           ? "hideFooter"
  //           : mode === "light"
  //           ? "header light-footer"
  //           : "header dark-footer"
  //       }
  //     > */}
  //       <Footer container>
  //         <div className="w-full text-center">
  //           <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
  //             <Footer.Brand
  //               href="https://flowbite.com"
  //               src="https://flowbite.com/docs/images/logo.svg"
  //               alt="Flowbite Logo"
  //               name="Flowbite"
  //             />
  //             <Footer.LinkGroup>
  //               <Footer.Link href="#">About</Footer.Link>
  //               <Footer.Link href="#">Privacy Policy</Footer.Link>
  //               <Footer.Link href="#">Licensing</Footer.Link>
  //               <Footer.Link href="#">Contact</Footer.Link>
  //             </Footer.LinkGroup>
  //           </div>
  //           <Footer.Divider />
  //           <Footer.Copyright href="#" by="Flowbite™" year={2022} />
  //         </div>
  //       </Footer>
  //     {/* </footer> */}
  //   </>
  // );
  return (
    <>
      <footer
        className={
          isDashboard.pathname === "/dashboard"
            ? "hideNavbar"
            : mode === "light"
            ? "header light-footer"
            : "header dark-footer"
        }
      >
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Flowbite
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
