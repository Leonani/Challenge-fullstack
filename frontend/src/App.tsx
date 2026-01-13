import { AppRoutes } from "./AppRoutes";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <div className="p-4">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};


export default App
