import { supabase } from "./supabaseClient";

// Fungsi ini hanya dijalankan sekali saat awal
export async function setupDatabase() {
  // Cek apakah tabel 'messages' sudah ada
  const { data: existingTable, error: checkError } = await supabase
    .from("messages")
    .select("id")
    .limit(1);

  // Jika tidak error, berarti tabel sudah ada → tidak perlu buat lagi
  if (!checkError) return;

  console.log("Membuat tabel messages di Supabase...");

  // Jalankan query SQL untuk membuat tabel
  const { error } = await supabase.rpc("exec_sql", {
    query: `
      CREATE TABLE IF NOT EXISTS public.messages (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name text,
        message text,
        created_at timestamptz DEFAULT now()
      );
    `,
  });

  if (error) {
    console.error("Gagal membuat tabel:", error);
  } else {
    console.log("Tabel messages berhasil dibuat!");
  }
}
