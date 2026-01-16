import { Routes, Route } from "react-router-dom";
import MessageForm from "./components/MessageForm";
import MessagesPage from "./components/MessagesPage";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF7FA] flex flex-col items-center justify-start px-4 py-8">
      <Routes>
        {/* Halaman utama dengan form */}
        <Route
          path="/"
          element={
            <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
              <MessageForm />
            </div>
          }
        />

        {/* Halaman view messages */}
        <Route
          path="/view"
          element={
            <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
              <MessagesPage />
            </div>
          }
        />
      </Routes>
    </div>
  );
}
