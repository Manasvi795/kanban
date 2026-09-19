// import { supabase } from "../supabaseClient";
// import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Board from "../components/Board";

function Dashboard() {
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   navigate("/login");
  // };

  return (
    <div className="flex h-screen flex-col bg-teal-50">
      <Navbar />
      <div className="min-h-0 flex-1">
        <Board />
      </div>
    </div>
  );
}

export default Dashboard;
