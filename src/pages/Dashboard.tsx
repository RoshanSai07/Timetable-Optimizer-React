import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Courses from "../components/courses";
import Faculty from "../components/faculty";
import Timetable from "../components/timetable";

export function Dashboard() {
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
