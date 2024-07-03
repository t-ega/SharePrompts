import "../styles/globals.css";

import React, { PropsWithChildren } from "react";

export const metadata = {
  title: "Promptopia",
  description: "Explore & Share AI prompts",
};

const RootLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{props.children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
