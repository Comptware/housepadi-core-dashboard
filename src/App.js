import { useEffect } from "react";
import Routes from "./routes";
import { useAuth } from "./hooks/auth";
import "./App.css";
import Toast from "components/general/toast/toast";
import "tippy.js/dist/tippy.css";
function App() {
  const { initUserSession } = useAuth();

  useEffect(() => {
    initUserSession();
  }, []);

  return (
    <div className="App">
      <Toast />
      <Routes />
    </div>
  );
}

export default App;
