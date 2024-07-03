import "@styles/globals.css";

import React, { PropsWithChildren } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Promptopia",
  description: "Explore & Share AI prompts",
};

const RootLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <html lang="en">
      <body>
        <Nav />
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{props.children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
