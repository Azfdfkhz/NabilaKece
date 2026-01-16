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

  return (
    <div className="min-h-screen bg-[#FFF7FA] flex flex-col items-center py-6">
      {/* header + tampilan sama seperti sebelumnya */}
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
