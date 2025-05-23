import Head from "next/head";
import NasaImageLibrary from "@/components/organisms/NasaImageLibrary";

export default function LibraryPage() {
  return (
    <>
      <Head>
        <title>NASA Image Library</title>
      </Head>
      <main className="min-h-screen p-6">
        <NasaImageLibrary />
      </main>
    </>
  );
}
