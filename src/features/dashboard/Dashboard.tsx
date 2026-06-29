import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import Courses from "@/features/courses/components/courses";
import Faculty from "@/features/faculty/components/faculty";
import Timetable from "@/features/timetable/components/timetable";

export function Dashboard() {
  const student = JSON.parse(sessionStorage.getItem("student") || "{}");

  if (!student.email) {
    return <Navigate to="/" replace />;
  }
  const [currentSection, setCurrentSection] = useState("courses");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleImportSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    setCurrentSection("timetable");
  };

  return (
    <div key={refreshKey} className="min-h-screen flex flex-col">
      <Navbar
        loggedIn={true}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />
      <div className="flex-1">
        {currentSection === "courses" && (
          <Courses
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        )}

        {currentSection === "faculty" && (
          <Faculty
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        )}

        {currentSection === "timetable" && (
          <Timetable
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            onImportSuccess={handleImportSuccess}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
