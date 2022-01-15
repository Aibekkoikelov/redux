import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
// import { fetchFilter } from "../../actions";
import { changeActiveFilter, fetchFilter } from "./filterSlice";
import { useEffect } from "react";
import classNames from "classnames";
import Spinner from "../spinner/Spinner";


const HeroesFilters = () => {
  const { request } = useHttp();
  const dispatch = useDispatch();
  const { filters,filtersLoadingStatus, activeFilter } = useSelector((state) => state.filter);
  
    useEffect(() => {
      dispatch(fetchFilter());
  }, []);

      if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
      } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
      }

  
  const renderFilters = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
    }
     return  arr.map(({ name, label, className }) => {
        
      const btnClass = classNames("btn", className, {
        "active": name === activeFilter,
      });
      
     return <button
         key={name}
         id={name}
         className={btnClass}
         onClick={() => dispatch(changeActiveFilter(name))}
       >
         {label}
       </button>
     
    });
  };
   const elements = renderFilters(filters)
  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
             {elements}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;

