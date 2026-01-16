export default function PopupThanks() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-transparent flex flex-col items-center justify-center">
        <img
          src="/PopUpl.png"
          alt="Terima kasih"
          className="w-64 md:w-80 rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
}
