import { Routes, Route } from "react-router-dom";
import MessageForm from "./components/MessageForm";
import MessagesPage from "./components/MessagesPage";

export default function App() {
  return (
<div className="min-h-screen bg-[#FFF7FA] flex flex-col items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center gap-4">
              <MessageForm />
            </div>
          }
        />
        <Route path="/view" element={<MessagesPage />} />
      </Routes>
    </div>
  );
}
