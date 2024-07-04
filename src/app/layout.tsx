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
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {props.children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
