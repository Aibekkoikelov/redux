import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { heroCreated } from "../heroesList/heroSlice";
import { useHttp } from "../../hooks/http.hook";
import { v4 as uuidv4 } from 'uuid';
const HeroesAddForm = () => {
  let { filters, filtersLoadingStatus } = useSelector((state) => state.filter);

  
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [descr, setDescr] = useState("")
    const [elements, setElement] = useState("")
    const {request} = useHttp();
    const res = (e) => {
        e.preventDefault()
        let obj = {
          id: uuidv4(),
          name,
          description: descr,
          element: elements,
        };
        request("http://localhost:3001/heroes", "POST", JSON.stringify(obj))
            .then(data => console.log(data))
            .then(() => dispatch(heroCreated(obj)))
            .catch(err => console.log(err))
        setName("")
        setDescr("")
        setElement("")
    }
     
    const renderFilters = (filters, status) => {
      if (status === "loading") {
        return <option>Загрузка элементов</option>;
      } else if (status === "error") {
        return <option>Ошибка загрузки</option>;
      }

      if (filters && filters.length > 0) {
        return filters.map(({ name, label }) => {
          // eslint-disable-next-line
          if (name === "all") return;

          return (
            <option key={name} value={name}>
              {label}
            </option>
          );
        });
      }
    };
   
    return (
      <form onSubmit={res} className="border p-4 shadow-lg rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-4">
            Имя нового героя
          </label>
          <input
            required
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={name}
            placeholder="Как меня зовут?"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label fs-4">
            Описание
          </label>
          <textarea
            required
            name="text"
            className="form-control"
            id="text"
            value={descr}
            placeholder="Что я умею?"
            style={{ height: "130px" }}
            onChange={(e) => setDescr(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="element" className="form-label">
            Выбрать элемент героя
          </label>
          <select
            value={elements}
            onChange={(e) => setElement(e.target.value)}
            required
            className="form-select"
            id="element"
            name="element"
          >
            <option>Я владею элементом...</option>
            {renderFilters(filters, filtersLoadingStatus)}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Создать
        </button>
      </form>
    );
};

export default HeroesAddForm;
