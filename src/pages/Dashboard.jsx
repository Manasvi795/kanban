import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <h1>Dashboard</h1>
      <p>You are logged in</p>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
}

export default Dashboard;
