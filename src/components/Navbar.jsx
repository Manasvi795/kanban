import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error.message);
      return;
    }
    navigate("/login");
  };

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-stone-100 bg-white px-4 sm:px-6 lg:px-7">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4.5">
        <div className="flex shrink-0 items-center">
          <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-stone-600 text-lg font-medium text-white">
            K
          </div>
          <span className="text-[19px] font-medium text-stone-900">Kanban</span>
        </div>
        <div className="hidden h-8.5 w-px bg-stone-100 sm:block" />
        <div className="min-w-0">
          <h1 className="text-base font-medium text-stone-900">My Board</h1>
          <p className="mt-0.5 text-[13px] text-stone-500">Manage your tasks</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex shrink-0 items-center rounded-full bg-stone-50 px-4 py-2.5 text-[13px] font-medium text-stone-700 cursor-pointer"
      >
        <FiLogOut size={16} />
        Logout
      </button>
    </header>
  );
}

export default Navbar;
