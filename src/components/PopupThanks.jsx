import { useEffect } from "react";

export default function PopupThanks() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-transparent flex flex-col items-center justify-center">
        <div
          className="tenor-gif-embed"
          data-postid="342906123308285810"
          data-share-method="host"
          data-aspect-ratio="0.976303"
          data-width="100%"
        >
          <a href="https://tenor.com/view/%EC%9D%B8%EC%82%AC%ED%95%98%EB%8A%94-%EA%B3%A0%EC%96%91%EC%9D%B4-%EC%9D%B8%EC%82%AC-%EA%B3%A0%EC%96%91%EC%9D%B4-thank-you-gif-342906123308285810">
            인사하는 고양이 Thank You Sticker
          </a>{" "}
          from{" "}
          <a href="https://tenor.com/search/%EC%9D%B8%EC%82%AC%ED%95%98%EB%8A%94+%EA%B3%A0%EC%96%91%EC%9D%B4-stickers">
            인사하는 고양이 Stickers
          </a>
        </div>
      </div>
    </div>
  );
}
