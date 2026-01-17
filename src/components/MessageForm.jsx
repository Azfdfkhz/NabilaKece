import { useState } from "react";
import { supabase } from "../supabaseClient";
import PopupThanks from "./PopupThanks";
import LegoSlider from "./LegoSlider";
import { useNavigate } from "react-router-dom";

export default function MessageForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return alert("Isi semua kolom!");

    const { error } = await supabase.from("messages").insert([
      { name, message, created_at: new Date() },
    ]);

    if (error) {
      console.error(error);
      alert("Gagal mengirim pesan");
      return;
    }

    setShowPopup(true);
    setName("");
    setMessage("");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-[40px] w-full max-w-sm mx-auto shadow-md overflow-hidden animate-fadeIn relative">
      {/* HEADER */}
      <div className="bg-[#FAC4D2] w-full rounded-t-[40px] text-white px-5 py-8 flex items-center justify-between">
        <div className="flex flex-col text-left">
          <p className="text-xl opacity-80 leading-tight">Say something</p>

          {/* TEKS “TO NABILAH” YANG BISA DIKLIK */}
          <h2
            onClick={() => navigate("/view")}
            className="font-semibold text-2xl leading-tight cursor-pointer hover:opacity-90 transition"
            title="Lihat pesan"
          >
            To Nabilah
          </h2>
        </div>

        {/* LEGO SLIDER */}
        <div className="flex-shrink-0 w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px]">
          <LegoSlider />
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full px-6 py-8">
        <label className="text-sm font-medium text-gray-700">Namamu</label>
        <input
          className="bg-[#FFEF89] rounded-[20px] px-4 py-2 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan nama..."
        />

        <label className="text-sm font-medium text-gray-700">Tuliskan pesan</label>
        <textarea
          className="bg-[#FFEF89] rounded-[20px] px-4 py-2 h-28 resize-none focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis pesan untuk Nabilah..."
        />

        <button
          type="submit"
          className="bg-[#FF89C8] rounded-[20px] text-white py-2 font-semibold mt-2 hover:opacity-90 transition"
        >
          Kirim
        </button>
      </form>

      {/* POPUP TERIMA KASIH */}
      {showPopup && <PopupThanks />}

      <p className="text-gray-400 text-xs mb-3">Pesan terjaga dengan aman</p>
    </div>
  );
}
