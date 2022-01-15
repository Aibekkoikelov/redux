import { useHttp } from "../../hooks/http.hook";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchHeroes } from "../../actions";
import { heroesDelete, fetchHeroes } from "./heroSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import "./index.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { createSelector } from "reselect"; // данный пакет надо установить и позволяет мемоизировать state чтобы не было 
// перерендеривания компонента используем как написано внутри



const HeroesList = () => {
  const filteredHeroesSelector = createSelector(
    (state) => state.filter.activeFilter,
    (state) => state.heroes.heroes,
    (filter, heroes) => {
      if (filter == "all") {
        console.log("render");
        
        return heroes;
      } else {
        return heroes.filter((hero) => hero.element === filter);
      }
    }
  );
 
  const filteredHeroes = useSelector(filteredHeroesSelector);
  const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
  const dispatch = useDispatch();
  const { request } = useHttp();
  
  const onDelete = useCallback(
    (id) => {
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then((response) => console.log(response))
        .then(() => dispatch(heroesDelete(id)))
        .catch((e) => console.log(e));
    },
    [request]
  );
  
  useEffect(() => {
      dispatch(fetchHeroes())
    // eslint-disable-next-line
  }, []);

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    
    if (arr.length === 0) {
      return (
        <CSSTransition timeout={0} classNames="hero">
          <h5 className="text-center mt-5">Героев пока нет</h5>
        </CSSTransition>
      );
    }

    return arr.map(({ id, ...props }) => {
      return (
        <CSSTransition key={id} classNames="hero" timeout={500}>
          <HeroesListItem onDelete={() => onDelete(id)} {...props} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
