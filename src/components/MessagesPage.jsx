import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const correctPassword = "nabilahcantik27"; 

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setAuthenticated(true);
      fetchMessages();
    } else {
      alert("Kata sandi salah!");
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setMessages(data);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7FA]">
        <div className="bg-white rounded-[30px] p-6 shadow-md text-center">
          <h2 className="text-[#FF89C8] font-semibold mb-3">Masukkan Kode Rahasia</h2>
          <form onSubmit={handleAuth} className="flex flex-col gap-3">
            <input
              type="password"
              placeholder="Kode rahasia..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none text-center"
            />
            <button
              type="submit"
              className="bg-[#FF89C8] text-white rounded-lg py-2 hover:opacity-90"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    );
  }

  // tampilan pesan kalau sudah masuk
  return (
    <div className="min-h-screen bg-[#FFF7FA] flex flex-col items-center py-6">
      <div className="bg-[#FAC4D2] w-full max-w-sm rounded-t-[40px] text-white text-center py-5">
        <p className="text-sm opacity-80">something</p>
        <h2 className="text-base font-semibold">To Nabilah</h2>
      </div>

      <div className="bg-white w-full max-w-sm rounded-b-[40px] px-4 pb-6 shadow-sm">
        <div className="flex flex-col gap-4 mt-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-[#FFEF89] p-3 rounded-[20px] border border-[#FAC4D2]"
            >
              <p className="font-semibold text-gray-700">
                Dari: <span className="text-[#FF89C8]">{msg.name}</span>
              </p>
              <p className="text-gray-800 italic">{msg.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
