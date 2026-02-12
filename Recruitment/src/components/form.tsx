import { useState, } from "react";

export default function Form() {
  const [text1, setText1] = useState<string>("");
  const [text2, setText2] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message1: text1,
        message2: text2
      })
    });

    if (res.ok) {
      setStatus("Sent!");
      setText1("");
      setText2("");
    } else {
      setStatus("Failed to send");
    }
  }

  return (
<div className="w-full flex justify-center p-6">
  <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 bg-[#80877b] w-[80%] max-w-xl p-6 rounded-lg shadow-md"
  >
    {/* Name */}
    <input
      value={text1}
      onChange={(e) => setText1(e.target.value)}
      required
      placeholder="Yer name"
      className="w-full p-3 rounded-md border border-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
    />

    {/* Message */}
    <textarea
      value={text2}
      onChange={(e) => setText2(e.target.value)}
      placeholder="What makes ye think yer the right one for me crew?"
      rows={5}
      required
      className="w-full p-3 rounded-md border border-gray-600 resize-none focus:outline-none focus:ring-1 focus:ring-black"
    />

    <button
      type="submit"
      className="self-start bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Send
    </button>

    {status && <p className="text-sm text-black pirata-one-regular">{status}</p>}
  </form>
</div>

  );
}
