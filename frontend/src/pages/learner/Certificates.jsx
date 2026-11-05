
import { useState } from "react";
import jsPDF from "jspdf";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Award,
  Download,
  Eye,
  CalendarDays,
  ShieldCheck,
  X,
  Printer,
} from "lucide-react";

const certificates = [
  {
    id: "SS-2026-00124",
    learner: "Sudharshan R",
    course: "React JS Complete Course",
    instructor: "SkillSwap Academy",
    date: "November 5, 2026",
    skills: "React, JSX, Components, Hooks",
  },
  {
    id: "SS-2026-00125",
    learner: "Sudharshan R",
    course: "JavaScript Fundamentals",
    instructor: "SkillSwap Academy",
    date: "November 5, 2026",
    skills: "JavaScript, ES6, Functions",
  },
];

function CertificateDesign({ certificate }) {
  return (
    <div
      id="certificate-design"
      className="relative flex aspect-[1.414/1] w-full flex-col items-center justify-center overflow-hidden border-[12px] border-double border-amber-500 bg-white p-5 text-center sm:p-10"
    >
      <div className="absolute inset-3 border border-amber-200" />

      <div className="relative">
        <Award size={44} className="mx-auto text-amber-500" />

        <p className="mt-3 text-xs font-bold tracking-[0.3em] text-slate-500 sm:text-sm">
          SKILLSWAP ACADEMY
        </p>

        <h1 className="mt-4 font-serif text-2xl font-bold text-slate-900 sm:text-5xl">
          Certificate
        </h1>

        <p className="mt-2 text-sm tracking-widest text-amber-600 sm:text-lg">
          OF COMPLETION
        </p>

        <p className="mt-6 text-xs text-slate-500 sm:text-base">
          This certificate is proudly presented to
        </p>

        <h2 className="mt-3 break-words font-serif text-xl font-bold text-indigo-900 sm:text-4xl">
          {certificate.learner}
        </h2>

        <div className="mx-auto mt-3 h-0.5 w-2/3 bg-amber-400" />

        <p className="mt-5 text-xs text-slate-500 sm:text-base">
          for successfully completing the course
        </p>

        <h3 className="mt-2 text-lg font-bold text-slate-800 sm:text-2xl">
          {certificate.course}
        </h3>

        <p className="mt-3 text-xs text-slate-500 sm:text-sm">
          Skills: {certificate.skills}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-8 text-xs sm:text-sm">
          <div>
            <p className="font-semibold text-slate-800">
              {certificate.date}
            </p>
            <div className="mx-auto mt-1 h-px w-28 bg-slate-400" />
            <p className="mt-1 text-slate-500">Completion Date</p>
          </div>

          <div>
            <p className="font-semibold text-slate-800">
              SkillSwap Academy
            </p>
            <div className="mx-auto mt-1 h-px w-28 bg-slate-400" />
            <p className="mt-1 text-slate-500">Authorized Platform</p>
          </div>
        </div>

        <p className="mt-6 text-[9px] text-slate-400 sm:text-xs">
          Certificate ID: {certificate.id}
        </p>
      </div>
    </div>
  );
}

export default function Certificates() {
  const [selected, setSelected] = useState(null);

  const downloadPDF = (certificate) => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Outer border
    pdf.setDrawColor(212, 160, 50);
    pdf.setLineWidth(2);
    pdf.rect(8, 8, 281, 194);

    pdf.setLineWidth(0.5);
    pdf.rect(13, 13, 271, 184);

    // Heading
    pdf.setTextColor(180, 130, 30);
    pdf.setFont("times", "bold");
    pdf.setFontSize(18);
    pdf.text("SKILLSWAP ACADEMY", 148.5, 35, {
      align: "center",
    });

    pdf.setTextColor(25, 35, 65);
    pdf.setFontSize(38);
    pdf.text("CERTIFICATE", 148.5, 60, {
      align: "center",
    });

    pdf.setFontSize(15);
    pdf.setTextColor(180, 130, 30);
    pdf.text("OF COMPLETION", 148.5, 72, {
      align: "center",
    });

    pdf.setTextColor(100, 100, 100);
    pdf.setFont("times", "normal");
    pdf.setFontSize(14);
    pdf.text("This certificate is proudly presented to", 148.5, 92, {
      align: "center",
    });

    pdf.setTextColor(30, 45, 100);
    pdf.setFont("times", "bold");
    pdf.setFontSize(28);
    pdf.text(certificate.learner, 148.5, 110, {
      align: "center",
    });

    pdf.setDrawColor(212, 160, 50);
    pdf.line(65, 115, 232, 115);

    pdf.setTextColor(100, 100, 100);
    pdf.setFont("times", "normal");
    pdf.setFontSize(14);
    pdf.text("for successfully completing the course", 148.5, 130, {
      align: "center",
    });

    pdf.setTextColor(35, 35, 35);
    pdf.setFont("times", "bold");
    pdf.setFontSize(22);
    pdf.text(certificate.course, 148.5, 145, {
      align: "center",
      maxWidth: 240,
    });

    pdf.setFont("times", "normal");
    pdf.setFontSize(11);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Completion Date: ${certificate.date}`, 148.5, 165, {
      align: "center",
    });

    pdf.setFontSize(9);
    pdf.text(`Certificate ID: ${certificate.id}`, 148.5, 180, {
      align: "center",
    });

    pdf.save(`${certificate.id}.pdf`);
  };

  const printCertificate = (certificate) => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    pdf.setDrawColor(212, 160, 50);
    pdf.setLineWidth(2);
    pdf.rect(8, 8, 281, 194);

    pdf.setTextColor(180, 130, 30);
    pdf.setFont("times", "bold");
    pdf.setFontSize(18);
    pdf.text("SKILLSWAP ACADEMY", 148.5, 35, {
      align: "center",
    });

    pdf.setTextColor(25, 35, 65);
    pdf.setFontSize(38);
    pdf.text("CERTIFICATE", 148.5, 60, {
      align: "center",
    });

    pdf.setFontSize(15);
    pdf.setTextColor(180, 130, 30);
    pdf.text("OF COMPLETION", 148.5, 72, {
      align: "center",
    });

    pdf.setFont("times", "normal");
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(14);
    pdf.text("Presented to", 148.5, 92, {
      align: "center",
    });

    pdf.setFont("times", "bold");
    pdf.setTextColor(30, 45, 100);
    pdf.setFontSize(28);
    pdf.text(certificate.learner, 148.5, 110, {
      align: "center",
    });

    pdf.setFontSize(18);
    pdf.setTextColor(35, 35, 35);
    pdf.text(certificate.course, 148.5, 135, {
      align: "center",
      maxWidth: 240,
    });

    pdf.setFont("times", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Completed on ${certificate.date}`, 148.5, 160, {
      align: "center",
    });

    pdf.setFontSize(9);
    pdf.text(`Certificate ID: ${certificate.id}`, 148.5, 180, {
      align: "center",
    });

    pdf.autoPrint();
    window.open(pdf.output("bloburl"), "_blank");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-indigo-600">
              LEARNING ACHIEVEMENTS
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              My Certificates
            </h1>

            <p className="mt-2 text-slate-500">
              Celebrate your achievements and showcase your skills.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/20 p-4">
                <Award size={32} />
              </div>

              <div>
                <p className="text-sm text-indigo-100">
                  Certificates Earned
                </p>

                <h2 className="text-3xl font-bold">
                  {certificates.length}
                </h2>
              </div>
            </div>
          </div>

          {/* Certificate Gallery */}
          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((certificate) => (
              <article
                key={certificate.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="bg-slate-100 p-4">
                  <div className="relative flex aspect-[1.414/1] items-center justify-center overflow-hidden border-4 border-double border-amber-400 bg-white p-5 text-center">
                    <div>
                      <Award
                        size={32}
                        className="mx-auto text-amber-500"
                      />

                      <p className="mt-2 text-xs font-bold tracking-widest text-slate-500">
                        SKILLSWAP ACADEMY
                      </p>

                      <h2 className="mt-3 font-serif text-2xl font-bold text-slate-900">
                        CERTIFICATE
                      </h2>

                      <p className="mt-2 text-sm font-semibold text-indigo-900">
                        {certificate.learner}
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        {certificate.course}
                      </p>

                      <p className="mt-4 text-[10px] text-slate-400">
                        ID: {certificate.id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900">
                    {certificate.course}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={16} />
                    {certificate.date}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelected(certificate)}
                      className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Eye size={16} />
                      Preview
                    </button>

                    <button
                      onClick={() => downloadPDF(certificate)}
                      className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      <Download size={16} />
                      Download PDF
                    </button>

                    <button
                      onClick={() => printCertificate(certificate)}
                      className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Printer size={16} />
                      Print
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Verification Info */}
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <ShieldCheck className="mt-1 text-blue-600" size={22} />

            <div>
              <h3 className="font-semibold text-blue-900">
                Certificate Verification
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-800">
                Each certificate has a unique ID. In the production
                version, employers and other users can verify certificates
                through a public verification page.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-5 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-slate-900">
                Certificate Preview
              </h2>

              <button
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <CertificateDesign certificate={selected} />

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                onClick={() => downloadPDF(selected)}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
              >
                <Download size={18} />
                Download PDF
              </button>

              <button
                onClick={() => printCertificate(selected)}
                className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold text-slate-700"
              >
                <Printer size={18} />
                Print
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
