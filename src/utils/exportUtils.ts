import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import type { Student } from "../types/student";
import type { Course } from "../types/course";
import type { SelectedFaculty } from "../types/selectedFaculty";

export async function exportPng(node: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: 2,
    cacheBust: true,
    style: {
      transform: "none",
    },
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function exportPdf(node: HTMLElement, filename: string): Promise<void> {
  const dataUrl = await toPng(node, {
    pixelRatio: 2.5,
    cacheBust: true,
    style: {
      transform: "none",
    },
  });

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a3",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgRatio = imgWidth / imgHeight;

      const margin = 20; // 20mm margin
      const maxW = pdfWidth - 2 * margin;
      const maxH = pdfHeight - 2 * margin;

      let width = maxW;
      let height = maxW / imgRatio;

      if (height > maxH) {
        height = maxH;
        width = maxH * imgRatio;
      }

      const x = (pdfWidth - width) / 2;
      const y = (pdfHeight - height) / 2;

      pdf.addImage(dataUrl, "PNG", x, y, width, height, undefined, "FAST");
      pdf.save(filename);
      resolve();
    };
    img.onerror = (err) => {
      reject(err);
    };
  });
}

export function exportJson(
  student: Student,
  selectedCourses: Course[],
  selectedFaculty: SelectedFaculty[],
): void {
  const data = {
    version: 1,
    student,
    selectedCourses,
    selectedFaculty,
  };
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data, null, 2),
  )}`;
  const downloadAnchor = document.createElement("a");

  const regNo = student.regNo
    ? student.regNo.toLowerCase().replace(/[^a-z0-9_-]/g, "")
    : "student";
  const filename = `${regNo}-timetable.json`;

  downloadAnchor.setAttribute("href", jsonString);
  downloadAnchor.setAttribute("download", filename);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function parseJsonText(content: string): {
  version: number;
  student: Student;
  selectedCourses: Course[];
  selectedFaculty: SelectedFaculty[];
} {
  const parsed = JSON.parse(content); // throws SyntaxError on bad JSON

  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Invalid content. Must be a JSON object.");
  }

  if (parsed.version === undefined) {
    throw new Error("Missing 'version' property in the JSON.");
  }

  if (!parsed.student || typeof parsed.student !== "object") {
    throw new Error("Missing or invalid 'student' profile.");
  }

  if (!parsed.student.name || !parsed.student.regNo) {
    throw new Error("Student profile is incomplete. Needs 'name' and 'regNo'.");
  }

  if (!Array.isArray(parsed.selectedCourses)) {
    throw new Error("Missing or invalid 'selectedCourses' list.");
  }

  if (!Array.isArray(parsed.selectedFaculty)) {
    throw new Error("Missing or invalid 'selectedFaculty' list.");
  }

  return {
    version: parsed.version,
    student: parsed.student,
    selectedCourses: parsed.selectedCourses,
    selectedFaculty: parsed.selectedFaculty,
  };
}

export function importJson(file: File): Promise<{
  version: number;
  student: Student;
  selectedCourses: Course[];
  selectedFaculty: SelectedFaculty[];
}> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (typeof parsed !== "object" || parsed === null) {
          throw new Error("Invalid file content. Must be a JSON object.");
        }

        if (parsed.version === undefined) {
          throw new Error("Missing 'version' property in the JSON file.");
        }

        if (!parsed.student || typeof parsed.student !== "object") {
          throw new Error("Missing or invalid 'student' profile.");
        }

        if (!parsed.student.name || !parsed.student.regNo) {
          throw new Error("Student profile is incomplete. Needs 'name' and 'regNo'.");
        }

        if (!Array.isArray(parsed.selectedCourses)) {
          throw new Error("Missing or invalid 'selectedCourses' list.");
        }

        if (!Array.isArray(parsed.selectedFaculty)) {
          throw new Error("Missing or invalid 'selectedFaculty' list.");
        }

        resolve({
          version: parsed.version,
          student: parsed.student,
          selectedCourses: parsed.selectedCourses,
          selectedFaculty: parsed.selectedFaculty,
        });
      } catch (error: any) {
        reject(error.message || "Failed to parse JSON file.");
      }
    };
    reader.onerror = () => {
      reject("Error reading the file.");
    };
    reader.readAsText(file);
  });
}
