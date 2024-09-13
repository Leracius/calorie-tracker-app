import Form from "./components/Form";
import { useReducer, useEffect, useMemo } from "react";
import { activityReducer, initialState } from "./reducers/activtiy-reducer";
import ActivityList from "./components/ActivityList";
import CalorieTRacker from "./components/CalorieTRacker";

export default function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  return (
    <>
      <header className="bg-violet-700 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase px-3">
            Contador de calorias
          </h1>
          <button
            className="bg-gray-800 hover:bg-gray-900 mx-2 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar app
          </button>
        </div>
      </header>
      <section className="bg-violet-500 py-20 px-5 border-black">
        <div className="max-w-3xl mx-auto">
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>
      <section className="bg-gray-800 py-10 ">
        <div className="max-w-4xl mx-auto">
          <CalorieTRacker activities={state.activities} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList dispatch={dispatch} activities={state.activities} />
      </section>
    </>
  );
}
