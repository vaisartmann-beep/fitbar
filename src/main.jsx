import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/fitbar.css";
import "./styles/pdp.css";
import Home from "./Home.jsx";
import Pdp from "./App.jsx";

/* Hash-based routing keeps deep links working on static hosts (GitHub Pages)
   without server rewrites: "#/toode" → product page, anything else → home. */
function currentRoute() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function Root() {
  const [route, setRoute] = React.useState(currentRoute());
  React.useEffect(() => {
    function onHash() { setRoute(currentRoute()); window.scrollTo(0, 0); }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route.startsWith("/toode") ? <Pdp /> : <Home />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
