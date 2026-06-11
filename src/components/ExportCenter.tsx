import { useState, useRef, useEffect } from "react";
import {
  Download,
  Image as ImageIcon,
  FileText,
  Code,
  UploadCloud,
  Copy,
  Check,
  AlertCircle,
  X,
  Lock,
  Share2,
  QrCode,
  Database,
  Columns,
  Sparkles,
} from "lucide-react";
import type { Student } from "../types/student";
import type { Course } from "../types/course";
import type { SelectedFaculty } from "../types/selectedFaculty";
import { ExportPreview } from "./ExportPreview";
import {
  exportPng,
  exportPdf,
  exportJson,
  importJson,
  parseJsonText,
} from "../utils/exportUtils";
import { formatName, formatRegNo } from "../utils/formatStudent";

type ExportCenterProps = {
  open: boolean;
  onClose: () => void;
  student: Student;
  selectedCourses: Course[];
  selectedFaculty: SelectedFaculty[];
  onImportSuccess: () => void;
};

type TabId = "png" | "pdf" | "json-export" | "json-import";

export default function ExportCenter({
  open,
  onClose,
  student,
  selectedCourses,
  selectedFaculty,
  onImportSuccess,
}: ExportCenterProps) {
  const [activeTab, setActiveTab] = useState<TabId>("png");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importedData, setImportedData] = useState<{
    version: number;
    student: Student;
    selectedCourses: Course[];
    selectedFaculty: SelectedFaculty[];
  } | null>(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [zoom, setZoom] = useState(0.35);
  const [previewHeight, setPreviewHeight] = useState(900);

  useEffect(() => {
    if ((activeTab === "png" || activeTab === "pdf") && previewRef.current) {
      const observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          setPreviewHeight(entries[0].contentRect.height);
        }
      });
      observer.observe(previewRef.current);
      return () => observer.disconnect();
    }
  }, [activeTab]);

  useEffect(() => {
    setSuccessMsg("");
    setErrorMsg("");
    setCopied(false);
    setImportedData(null);
    setLoading(false);
    setPasteMode(false);
    setPasteText("");
  }, [activeTab]);
  if (!open) return null;

  const handleExportPng = async () => {
    if (!previewRef.current) return;
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const regNo = student.regNo
        ? student.regNo.toLowerCase().replace(/[^a-z0-9_-]/g, "")
        : "student";
      const filename = `${regNo}-timetable.png`;
      await exportPng(previewRef.current, filename);
      setSuccessMsg("PNG timetable downloaded successfully!");
    } catch (err: any) {
      setErrorMsg("Failed to generate PNG export. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const regNo = student.regNo
        ? student.regNo.toLowerCase().replace(/[^a-z0-9_-]/g, "")
        : "student";
      const filename = `${regNo}-timetable.pdf`;
      await exportPdf(previewRef.current, filename);
      setSuccessMsg("PDF timetable downloaded successfully!");
    } catch (err: any) {
      setErrorMsg("Failed to generate PDF. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportJson = () => {
    try {
      exportJson(student, selectedCourses, selectedFaculty);
      setSuccessMsg("JSON configuration exported successfully!");
    } catch (err) {
      setErrorMsg("Failed to export JSON file.");
      console.error(err);
    }
  };

  const handleCopyJson = () => {
    const data = {
      version: 1,
      student,
      selectedCourses,
      selectedFaculty,
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setSuccessMsg("JSON configuration copied to clipboard!");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");
    setImportedData(null);
    try {
      if (!file.name.endsWith(".json")) {
        throw new Error("Invalid file format. Please upload a .json file.");
      }
      const data = await importJson(file);
      setImportedData(data);
      setSuccessMsg("File validated successfully. Review summary below.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load JSON file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const commitImport = () => {
    if (!importedData) return;
    try {
      sessionStorage.setItem("student", JSON.stringify(importedData.student));
      sessionStorage.setItem(
        "selectedCourses",
        JSON.stringify(importedData.selectedCourses),
      );
      sessionStorage.setItem(
        "selectedFaculty",
        JSON.stringify(importedData.selectedFaculty),
      );
      onImportSuccess();
      onClose();
    } catch (err) {
      setErrorMsg("Failed to import timetable data into sessionStorage.");
      console.error(err);
    }
  };

  const handlePasteVerify = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setImportedData(null);
    const trimmed = pasteText.trim();
    if (!trimmed) {
      setErrorMsg("Please paste some JSON text first.");
      return;
    }
    try {
      const data = parseJsonText(trimmed);
      setImportedData(data);
      setSuccessMsg("JSON verified successfully. Review the summary below.");
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid JSON. Check the pasted content.");
    }
  };

  const jsonPreviewString = JSON.stringify(
    {
      version: 1,
      student: {
        name: student.name || "Student Name",
        regNo: student.regNo || "REG12345",
        branch: student.branch || "CSE",
        yearLabel: student.yearLabel || "thirdYear",
      },
      selectedCourses: selectedCourses.map((c) => ({
        code: c.code,
        name: c.name,
        credits: c.credits,
      })),
      selectedFaculty: selectedFaculty.map((f) => ({
        courseCode: f.courseCode,
        theory: f.theory
          ? { name: f.theory.name, slots: f.theory.slots }
          : null,
        lab: f.lab ? { name: f.lab.name, slots: f.lab.slots } : null,
      })),
    },
    null,
    2,
  );

  return (
    <div
      onMouseDown={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/45 px-6 py-8 backdrop-blur-sm"
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="flex h-[88vh] w-full max-w-7xl flex-row overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300"
      >
        <aside className="w-[340px] shrink-0 border-r border-border bg-muted/10 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Import & Export Center
              </div>
              <h2 className="text-xl font-bold tracking-tight text-foreground mt-3">
                Workspace Tools
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Manage sharing, snapshots, and schedule configurations.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => setActiveTab("png")}
                className={`w-full text-left rounded-xl border p-3.5 transition-all duration-200 cursor-pointer flex gap-3 ${
                  activeTab === "png"
                    ? "border-primary bg-primary/[0.06] text-foreground shadow-sm scale-[1.01]"
                    : "border-border/60 bg-card text-muted-foreground hover:bg-muted/40 hover:border-border"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    activeTab === "png"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <ImageIcon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    PNG Export
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Best for sharing snapshots
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("pdf")}
                className={`w-full text-left rounded-xl border p-3.5 transition-all duration-200 cursor-pointer flex gap-3 ${
                  activeTab === "pdf"
                    ? "border-primary bg-primary/[0.06] text-foreground shadow-sm scale-[1.01]"
                    : "border-border/60 bg-card text-muted-foreground hover:bg-muted/40 hover:border-border"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    activeTab === "pdf"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    PDF Export
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Best for printing and storage
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("json-export")}
                className={`w-full text-left rounded-xl border p-3.5 transition-all duration-200 cursor-pointer flex gap-3 ${
                  activeTab === "json-export"
                    ? "border-primary bg-primary/[0.06] text-foreground shadow-sm scale-[1.01]"
                    : "border-border/60 bg-card text-muted-foreground hover:bg-muted/40 hover:border-border"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    activeTab === "json-export"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Code className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    JSON Export
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Share selections with friends
                  </div>
                </div>
              </button>

              <button
                onClick={() => setActiveTab("json-import")}
                className={`w-full text-left rounded-xl border p-3.5 transition-all duration-200 cursor-pointer flex gap-3 ${
                  activeTab === "json-import"
                    ? "border-primary bg-primary/[0.06] text-foreground shadow-sm scale-[1.01]"
                    : "border-border/60 bg-card text-muted-foreground hover:bg-muted/40 hover:border-border"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    activeTab === "json-import"
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <UploadCloud className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">
                    JSON Import
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    Load configurations instantly
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="border-t border-border/80 pt-4 mt-4 space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">
              Coming Soon
            </div>

            <div className="grid grid-cols-2 gap-2 opacity-60">
              <div className="flex flex-col gap-1 items-center justify-center p-2.5 border border-border/40 rounded-lg bg-muted/20">
                <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[9px] font-semibold">Share Link</span>
              </div>
              <div className="flex flex-col gap-1 items-center justify-center p-2.5 border border-border/40 rounded-lg bg-muted/20">
                <QrCode className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[9px] font-semibold">QR Code</span>
              </div>
              <div className="flex flex-col gap-1 items-center justify-center p-2.5 border border-border/40 rounded-lg bg-muted/20">
                <Database className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[9px] font-semibold">Cloud Backups</span>
              </div>
              <div className="flex flex-col gap-1 items-center justify-center p-2.5 border border-border/40 rounded-lg bg-muted/20">
                <Columns className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[9px] font-semibold">Compare Lists</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col min-w-0 bg-background overflow-y-auto">
          <header className="flex justify-between items-center px-8 py-5 border-b border-border">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                {activeTab === "png" && "Export PNG Image"}
                {activeTab === "pdf" && "Export PDF Document"}
                {activeTab === "json-export" && "Export Timetable Data"}
                {activeTab === "json-import" && "Import Selections"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {activeTab === "png" &&
                  "Download a pixel-perfect snapshot of your timetable."}
                {activeTab === "pdf" &&
                  "Generate an A3 landscape PDF ready for printing."}
                {activeTab === "json-export" &&
                  "Copy or download the setup file to share with classmates."}
                {activeTab === "json-import" &&
                  "Restore faculty selections from a timetable JSON file."}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </header>

          <div className="flex-1 p-8 space-y-6">
            {successMsg && (
              <div className="rounded-xl border border-primary/25 bg-primary/[0.04] p-4 flex gap-3 items-center">
                <Check className="h-5 w-5 text-primary shrink-0" />
                <span className="text-xs font-semibold text-primary">
                  {successMsg}
                </span>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-destructive/25 bg-destructive/[0.04] p-4 flex gap-3 items-center">
                <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                <span className="text-xs font-semibold text-destructive">
                  {errorMsg}
                </span>
              </div>
            )}

            {(activeTab === "png" || activeTab === "pdf") && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-foreground">
                      Live Export Preview
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Zoom is for preview only. Downloads are always captured at
                      100% full quality.
                    </p>
                  </div>

                  <div className="flex gap-4 items-center">
                    {/* Zoom Controller */}
                    <div className="flex items-center gap-2 border border-border/60 rounded-xl bg-muted/20 px-3 py-1.5">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                        Scale:
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setZoom((prev) => Math.max(0.25, prev - 0.05))
                        }
                        className="p-0.5 rounded border border-border bg-card hover:bg-muted text-[10px] font-bold shrink-0 w-5 h-5 flex items-center justify-center cursor-pointer transition-colors"
                        title="Zoom Out"
                      >
                        -
                      </button>
                      <input
                        type="range"
                        min="0.25"
                        max="1"
                        step="0.05"
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="w-20 cursor-pointer accent-primary h-1"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setZoom((prev) => Math.min(1, prev + 0.05))
                        }
                        className="p-0.5 rounded border border-border bg-card hover:bg-muted text-[10px] font-bold shrink-0 w-5 h-5 flex items-center justify-center cursor-pointer transition-colors"
                        title="Zoom In"
                      >
                        +
                      </button>
                      <span className="text-[10px] font-mono font-bold text-foreground min-w-[28px] text-right">
                        {Math.round(zoom * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={() => setZoom(0.35)}
                        className="text-[9px] font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer ml-1"
                      >
                        Fit
                      </button>
                    </div>

                    <button
                      onClick={
                        activeTab === "png" ? handleExportPng : handleExportPdf
                      }
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-all disabled:opacity-50 cursor-pointer shadow-sm shadow-primary/20 hover:scale-[1.01]"
                    >
                      {loading ? (
                        <>
                          <span className="h-3 w-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          {activeTab === "png"
                            ? "Download PNG"
                            : "Download PDF"}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="border border-border/60 bg-muted/10 rounded-2xl p-6 overflow-auto max-h-[580px]">
                  <div
                    style={{
                      width: `${2100 * zoom}px`,
                      height: `${previewHeight * zoom}px`,
                      position: "relative",
                      overflow: "hidden",
                      margin: "0 auto",
                      transition: "width 0.12s ease-out, height 0.12s ease-out",
                    }}
                  >
                    <div
                      style={{
                        width: "2100px",
                        transform: `scale(${zoom})`,
                        transformOrigin: "top left",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    >
                      <ExportPreview
                        ref={previewRef}
                        student={student}
                        selectedCourses={selectedCourses}
                        selectedFaculty={selectedFaculty}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "json-export" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-foreground">
                      Sharing Configuration Data
                    </span>
                    <p className="text-[11px] text-muted-foreground">
                      Below is the exact schema representation of your
                      selections.
                    </p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={handleCopyJson}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-bold hover:bg-muted transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-primary" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy JSON
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleExportJson}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-all cursor-pointer shadow-sm shadow-primary/20 hover:scale-[1.01]"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download JSON
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-secondary/25 bg-secondary/[0.03] p-4 flex gap-3">
                  <Sparkles className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-foreground">
                      Perfect for Team Coordination
                    </h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Send the downloaded `.json` file to classmates. When they
                      import it in their dashboard, they will instantly match
                      your exact courses and teacher configurations.
                    </p>
                  </div>
                </div>

                <div className="relative rounded-xl border border-border bg-muted/40 p-5 overflow-hidden">
                  <div className="absolute right-4 top-4 text-[10px] font-bold text-muted-foreground/60 uppercase select-none">
                    JSON Schema Preview
                  </div>
                  <pre className="max-h-[360px] overflow-auto text-xs font-mono leading-relaxed text-foreground/80 whitespace-pre">
                    {jsonPreviewString}
                  </pre>
                </div>
              </div>
            )}

            {activeTab === "json-import" && (
              <div className="space-y-6">
                {!importedData ? (
                  <div className="space-y-5">
                    {/* Mode toggle */}
                    <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1 w-fit">
                      <button
                        onClick={() => { setPasteMode(false); setErrorMsg(""); }}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          !pasteMode
                            ? "bg-card text-foreground shadow-sm border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Upload file
                      </button>
                      <button
                        onClick={() => { setPasteMode(true); setErrorMsg(""); }}
                        className={`rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                          pasteMode
                            ? "bg-card text-foreground shadow-sm border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Paste JSON
                      </button>
                    </div>

                    {!pasteMode ? (
                      /* ---- File upload dropzone ---- */
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center transition-all cursor-pointer min-h-[300px] ${
                          dragActive
                            ? "border-primary bg-primary/[0.04]"
                            : "border-border/80 hover:border-border bg-muted/5"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".json"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                          <UploadCloud className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-bold text-foreground">
                          Drag &amp; Drop your configuration file
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1.5 max-w-sm">
                          Upload a <code className="font-mono">.json</code> file containing a timetable shared by a
                          classmate or exported from another session.
                        </p>
                        <button
                          type="button"
                          className="mt-6 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold hover:bg-muted transition-all cursor-pointer shadow-sm"
                        >
                          Browse Files
                        </button>
                      </div>
                    ) : (
                      /* ---- Paste JSON pane ---- */
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-foreground">Paste your JSON</span>
                          <p className="text-[11px] text-muted-foreground">
                            Copy the JSON text from a friend's export or from the JSON Export tab, then paste it below and click Verify.
                          </p>
                        </div>
                        <textarea
                          value={pasteText}
                          onChange={(e) => { setPasteText(e.target.value); setErrorMsg(""); setSuccessMsg(""); }}
                          placeholder={'{ "version": 1, "student": { ... }, "selectedCourses": [...], "selectedFaculty": [...] }'}
                          rows={10}
                          spellCheck={false}
                          className="w-full rounded-xl border border-input bg-muted/20 px-4 py-3 font-mono text-xs text-foreground leading-relaxed outline-none resize-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/50 transition-all"
                        />
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => { setPasteText(""); setErrorMsg(""); setSuccessMsg(""); }}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            Clear
                          </button>
                          <button
                            type="button"
                            onClick={handlePasteVerify}
                            disabled={!pasteText.trim()}
                            className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-primary/20"
                          >
                            Verify JSON
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground">
                        Review Import Configuration
                      </span>
                      <p className="text-[11px] text-muted-foreground">
                        Ensure this matches the student profile you intend to
                        load.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                      <div className="bg-muted/30 px-6 py-4 border-b border-border flex justify-between items-center">
                        <div>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Student Profile
                          </div>
                          <h4 className="text-sm font-bold text-foreground mt-0.5">
                            {formatName(importedData.student.name)}
                          </h4>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Registration No.
                          </div>
                          <span className="font-mono text-xs font-bold text-foreground mt-0.5 block">
                            {formatRegNo(importedData.student.regNo)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 p-6">
                        <div>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Academic Branch
                          </div>
                          <div className="text-sm font-semibold text-foreground mt-1">
                            {importedData.student.branch}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Selected Courses
                          </div>
                          <div className="text-sm font-semibold text-foreground mt-1 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                            {importedData.selectedCourses.length} Courses
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            Faculty selections
                          </div>
                          <div className="text-sm font-semibold text-foreground mt-1 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-secondary"></span>
                            {importedData.selectedFaculty.length} Instructors
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-destructive/25 bg-destructive/[0.03] p-4 flex gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-foreground">
                          Destructive Action
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Confirming the import will replace your active
                          courses, current faculty, and student settings with
                          the loaded file content. Any unsaved modifications in
                          this session will be lost.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => { setImportedData(null); setSuccessMsg(""); }}
                        className="rounded-xl border border-border bg-card px-5 py-2.5 text-xs font-bold hover:bg-muted transition-all cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        onClick={commitImport}
                        className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-primary/95 transition-all cursor-pointer shadow-sm shadow-primary/20"
                      >
                        Import Timetable
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
