import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/fitbar.css";
import "./styles/pdp.css";
import "./styles/kataloog.css";
import "./styles/checkout.css";
import Home from "./Home.jsx";
import Pdp from "./App.jsx";
import Catalog from "./Catalog.jsx";
import Checkout from "./Checkout.jsx";

/* Hash-based routing keeps deep links working on static hosts (GitHub Pages)
   without server rewrites. Query params live after the path in the hash, e.g.
   "#/kataloog?category=protein". */
function parseHash() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const qi = raw.indexOf("?");
  const path = qi >= 0 ? raw.slice(0, qi) : raw;
  const params = new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : "");
  return { path, params, query: qi >= 0 ? raw.slice(qi + 1) : "" };
}

function Root() {
  const [route, setRoute] = React.useState(parseHash());
  React.useEffect(() => {
    function onHash() { setRoute(parseHash()); window.scrollTo(0, 0); }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  if (route.path.startsWith("/toode")) return <Pdp />;
  if (route.path.startsWith("/kataloog")) return <Catalog key={route.query} params={route.params} />;
  if (route.path.startsWith("/checkout")) return <Checkout params={route.params} />;
  return <Home />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
