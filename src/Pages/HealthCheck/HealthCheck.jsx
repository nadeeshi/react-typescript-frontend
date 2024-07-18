import { useState, useEffect } from "react";
import { checkHealth } from "../../API/HealthCheck";

const HealthPage = () => {
  const [healthStatus, setHealthStatus] = useState("unknown");

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        const response = await checkHealth();

        if (response) {
          setHealthStatus(response.status);
        } else {
          setHealthStatus("unhealthy");
        }
      } catch (error) {
        console.error("Error checking health:", error);
        setHealthStatus("unhealthy");
      }
    };

    fetchHealthStatus();
  }, []);

  return (
    <div>
      <h1>Health Check</h1>
      <p>Status: {healthStatus}</p>
    </div>
  );
};

export default HealthPage;
