"use client";
import { useState } from "react";
import Stage1Email from "./components/Stage1Email";
import Stage2Credentials from "./components/Stage2Credentials";
import Stage3Success from "./components/Stage3Success";

export default function RegisterPage() {
  const [currentStage, setCurrentStage] = useState(1);
  const [userData, setUserData] = useState({});

  const handleStage1Complete = (data) => {
    setUserData(prev => ({ ...prev, email: data.email }));
    setCurrentStage(2);
  };

  const handleStage2Complete = (data) => {
    setUserData(prev => ({ ...prev, ...data }));
    setCurrentStage(3);
  };

  const handleBackToStage1 = () => {
    setCurrentStage(1);
    setUserData({});
  };

  const handleBackToStage2 = () => {
    setCurrentStage(2);
  };

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 1:
        return <Stage1Email onNext={handleStage1Complete} />;
      case 2:
        return (
          <Stage2Credentials
            email={userData.email}
            onNext={handleStage2Complete}
            onBack={handleBackToStage1}
          />
        );
      case 3:
        return (
          <Stage3Success
            userData={userData}
            email={userData.email}
            onBack={handleBackToStage2}
          />
        );
      default:
        return <Stage1Email onNext={handleStage1Complete} />;
    }
  };

  return (
    <div id="Content">
      {renderCurrentStage()}
    </div>
  );
}
