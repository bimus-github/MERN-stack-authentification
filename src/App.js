import { useAuth } from "./hooks/auth.hook";
import UseRoutes from "./routes";
import "materialize-css";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token, login, logout, userId } = useAuth();

  const isAuthenticated = !!token;

  const routes = UseRoutes(false);

  return (
    <AuthContext.Provider
      value={{
        login,
        token,
        userId,
        logout,
        isAuthenticated,
      }}
    >
      <div className="container">{routes}</div>
    </AuthContext.Provider>
  );
}

export default App;
