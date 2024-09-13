import { categories } from "../data/categories";
import { useState } from "react";
import { Activity } from "../types";
import { Dispatch } from "react";
import { ActivityActions, ActivityState } from "../reducers/activtiy-reducer";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

//estado inicial
const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  //estado mas generico para lamacenar un objeto de estado
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // funcion que retorna una validacion a traves de true o false
    const isNumeberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumeberField ? +e.target.value : e.target.value,
    });
  };

  // retorna true o false segun exista una cadena de texto con una longitud mayor a 0
  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  // el html for hace referencia al id del elemento trigger
  // e => para ver el tipo
  // cambia

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    //con esto genero un id nuevo porque si no genera siempre el mismo
    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" space-y-5 bg-white shadow p-10 rounded-xl"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría:
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. comida, ejercicio, naranja, pesas, bicicleta, etc."
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorías ej. 100 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        className="bg-gray-800 disabled:bg-slate-300 hover:bg-gray-900 w-full font-bold uppercase text-white cursor-pointer p-3 rounded-lg"
        type="submit"
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
