export default function PopupThanks() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-transparent flex flex-col items-center justify-center animate-scaleUp">
        <iframe
          src="https://tenor.com/view/인사하는-고양이-인사-고양이-thank-you-gif-342906123308285810"
          width="230"
          height="230"
          allowFullScreen
          title="Thank You Cat"
          className="rounded-2xl shadow-lg"
        ></iframe>

        <p className="text-white text-lg mt-3 font-medium animate-fadeIn">
          Terima kasih sudah kirim pesan!
        </p>
      </div>
    </div>
  );
}
