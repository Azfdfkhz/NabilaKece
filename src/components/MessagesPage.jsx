import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setMessages(data);
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

  return (
    <div className="min-h-screen bg-[#FFF7FA] flex flex-col items-center py-6 px-4 sm:px-6 md:px-8">
      {/* HEADER */}
      <div className="bg-[#FAC4D2] w-full max-w-md rounded-t-[40px] text-white text-center py-5 shadow-md">
        <p className="text-sm opacity-80">something</p>
        <h2 className="text-lg font-semibold">To Nabilah</h2>
      </div>

      {/* LIST PESAN */}
      <div className="bg-white w-full max-w-md rounded-b-[40px] px-5 pb-8 shadow-md">
        <div className="flex flex-col gap-5 mt-5">
          {messages.map((msg, index) => {
            const sticker = getRandomSticker();
            const stickerPosition =
              index % 2 === 0
                ? "top-[-12px] left-[-12px] rotate-[-10deg]"
                : "bottom-[-12px] right-[-12px] rotate-[10deg]";

            return (
              <div
                key={msg.id}
                className="relative bg-[#FFEF89] p-4 rounded-[20px] border border-[#FAC4D2] shadow-sm"
              >
                {/* STIKER DENGAN ANIMASI BOUNCE */}
                <img
                  src={sticker}
                  alt="sticker"
                  className={`absolute w-9 h-9 ${stickerPosition} animate-float`}
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
