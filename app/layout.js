import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastContainer from "@/components/ToastContainer";

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-page font-body text-white antialiased">
        <PlanProvider>
          <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-white/5 bg-ink my-4 sm:my-6 shadow-2xl">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToastContainer />
        </PlanProvider>
      </body>
    </html>
  );
}
