import "./globals.css";

export const metadata = {
  title: "SupplySync - Inventory Management System",
  description: "SupplySync ~ Inventory Management System - A full-stack web application built using Next.js, Firebase, and Tailwind CSS. This project enables users to manage product inventories with features like authentication, stock management, and product tracking.",
  creator: "Vaibhav Katariya"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
