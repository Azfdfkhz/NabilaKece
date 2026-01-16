import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const correctPassword = "nblakeren090127"; 

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

  const stickers = [
    "/stickers/Cat.png",
    "/stickers/Cute.png",
    "/stickers/Flower.png",
    "/stickers/Hbd.png",
    "/stickers/Tulip.png",
    "/stickers/Stroberi.png",
  ];

  const getRandomSticker = () =>
    stickers[Math.floor(Math.random() * stickers.length)];

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7FA] px-4">
        <div className="bg-white rounded-[30px] p-6 shadow-md text-center w-full max-w-sm">
          <h2 className="text-[#FF89C8] font-semibold mb-4 text-lg">
            Masukkan Kode Rahasia
          </h2>
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

  return (
    <div className="min-h-screen bg-[#FFF7FA] flex flex-col items-center py-6 px-4">
      {/* HEADER */}
      <div className="bg-[#FAC4D2] w-full max-w-md rounded-t-[40px] text-white text-center py-5 shadow-md">
        <p className="text-lg sm:text-xl opacity-80">something</p>
        <h2 className="text-2xl sm:text-3xl font-semibold">To Nabilah</h2>
      </div>

      {/* LIST PESAN */}
      <div className="bg-white w-full max-w-md rounded-b-[40px] px-5 pb-8 shadow-md">
        <div className="flex flex-col gap-6 mt-5">
          {messages.map((msg, index) => {
            const sticker = getRandomSticker();
            const stickerPosition =
              index % 2 === 0
                ? "top-[-14px] left-[-14px] rotate-[-10deg]"
                : "bottom-[-14px] right-[-14px] rotate-[10deg]";

            return (
              <div
                key={msg.id}
                className="relative bg-[#FFEF89] p-4 rounded-[20px] border border-[#FAC4D2] shadow-sm"
              >
                {/* STICKER */}
                <img
                  src={sticker}
                  alt="sticker"
                  className={`absolute ${stickerPosition} w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 animate-float`}
                />
                <p className="font-semibold text-gray-700">
                  Dari: <span className="text-[#FF89C8]">{msg.name}</span>
                </p>
                <p className="text-gray-800 italic break-words">{msg.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
