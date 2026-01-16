import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [messageStickers, setMessageStickers] = useState({}); // stiker per pesan

  const correctPassword = "nblakeren090127";

  const stickers = [
    "/stickers/Cat.png",
    "/stickers/Cute.png",
    "/stickers/Flower.png",
    "/stickers/Hbd.png",
    "/stickers/Tulip.png",
    "/stickers/Stroberi.png",
  ];

  const getRandomSticker = (usedStickers) => {
    // ambil stiker yang belum dipakai dulu
    const unused = stickers.filter((s) => !usedStickers.includes(s));
    if (unused.length === 0) return stickers[Math.floor(Math.random() * stickers.length)];
    return unused[Math.floor(Math.random() * unused.length)];
  };

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
    if (!error) {
      setMessages(data);

      // assign stiker untuk setiap pesan agar tidak ngulang
      const stickersMap = {};
      const usedStickers = [];
      data.forEach((msg) => {
        const sticker = getRandomSticker(usedStickers);
        stickersMap[msg.id] = sticker;
        usedStickers.push(sticker);
      });
      setMessageStickers(stickersMap);
    }
  };

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
      <div className="w-full max-w-md flex flex-col gap-6 mt-5 relative">
        {messages.map((msg, index) => {
          const sticker = messageStickers[msg.id]; // ambil stiker yang sudah ditentukan
          const offsetX = Math.floor(Math.random() * 40) - 20;
          const offsetY = Math.floor(Math.random() * 40) - 20;
          const rotate = Math.random() * 20 - 10;

          return (
            <div key={msg.id} className="relative overflow-visible">
              <img
                src={sticker}
                alt="sticker"
                className="absolute pointer-events-none opacity-70"
                style={{
                  width: "64px",
                  height: "64px",
                  top: offsetY,
                  left: offsetX,
                  transform: `rotate(${rotate}deg)`,
                  animation: "float 3s ease-in-out infinite alternate",
                  zIndex: 1,
                }}
              />
              <div className="bg-[#FFEF89] p-6 rounded-[20px] border border-[#FAC4D2] shadow-sm relative z-10">
                <p className="font-semibold text-gray-700">
                  Dari: <span className="text-[#FF89C8]">{msg.name}</span>
                </p>
                <p className="text-gray-800 italic break-words">{msg.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
