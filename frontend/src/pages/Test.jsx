import { useState } from "react";
import ResultsPanel from "../components/Map/ResultsPanel";
import { Button } from "@/components/ui/button";

const Test = () => {
  const [showResults, setShowResults] = useState(false);

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  return (
    <div>
      <Button onClick={handleShowResults}>Show Results</Button>
      <ResultsPanel isVisible={showResults} onClose={handleCloseResults} />
    </div>
  );
};

export default Test;