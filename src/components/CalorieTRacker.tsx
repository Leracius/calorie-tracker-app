import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CalorieTRacker() {
  const { caloriesConsumed, caloriesBurned, netCalories } = useActivity();
  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="consumidas" />
        <CalorieDisplay calories={caloriesBurned} text="quemadas" />
        <CalorieDisplay calories={netCalories} text="totales" />
      </div>
    </>
  );
}
