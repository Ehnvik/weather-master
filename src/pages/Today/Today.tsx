import { useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { fetchWeatherData } from "../../services/weatherService";

export const Today = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWeatherData("59.3293", "18.0686");
      console.log(response.daily[0]);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Todays Weather</h1>
      </div>
    </Layout>
  );
};
