import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Courses from "../components/courses";
import Faculty from "../components/faculty";
import Timetable from "../components/timetable";

export function Dashboard() {
  const [currentSection, setCurrentSection] = useState("courses");

  return (
    <div className="min-h-screen flex flex-col">
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

        {currentSection === "faculty" && <Faculty />}

        {currentSection === "timetable" && <Timetable />}
      </div>
      <Footer />
    </div>
  );
}
