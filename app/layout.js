import "./globals.css";
import { PlanProvider } from "../context/PlanContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToastContainer from "../components/ToastContainer";

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-ink font-body antialiased flex flex-col">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer />
        </PlanProvider>
      </body>
    </html>
  );
}
