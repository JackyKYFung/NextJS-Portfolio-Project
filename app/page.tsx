import { Typewriter } from "@/app/components/Typewiter";

export default function Home() {
  return (
    // min-h-[calc(100vh-120px)] accounts for your header height and page margins
    <section className="animate-fade-in px-5 flex flex-col justify-between min-h-[calc(100vh-220px)]">
    

      {/* CENTERED HERO CONTENT CONTAINER */}
      <div className="flex flex-col items-center justify-center text-center flex-grow">
        <h1 className="md:text-5xl text-3xl font-bold font-mono mb-4 tracking-tight">
          Hi, I am Jacky
        </h1>
        <Typewriter />
        {/* Invisible spacer to perfectly balance the vertical center alignment */}
        <div className="hidden sm:block h-25" aria-hidden="true" />
      </div>

    </section>
  );
}