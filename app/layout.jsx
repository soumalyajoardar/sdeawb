import './globals.css';

export const metadata = {
  title: "Society For Development Of Engineers’ & Architects’ West Bengal | SDEA WB",
  description: "Official portal of the Society for Development of Engineers’ & Architects’ West Bengal (SDEA WB). Reg No: S0005492. Representing State Diploma Engineers, Sub-Assistant Engineers, Assistant Engineers and Architects across West Bengal.",
  keywords: "SDEA WB, State Diploma Engineers Association West Bengal, West Bengal Engineers, PWD West Bengal, Irrigation Waterways, PHED West Bengal, Technocrats Bengal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/sdea-logo.png" />
      </head>
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-amber-400 selection:text-brand-950">
        {children}
      </body>
    </html>
  );
}
