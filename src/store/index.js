// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'; // для конфигурации store
// import ReduxThunk from 'redux-thunk';
import heroes from '../components/heroesList/heroSlice';
import filter from '../components/heroesFilters/filterSlice';
// compose позволяет скомбинировать разные функции внутри createstore
// combinereduser позволяет использования большого количества редюсеров
// createstore создает глобальный store для всего приложения
// heroes и filter это разные редюсеры потом закидываем в комбайн
// const enchanser = (createStore) => (...args) => {  // данная функция позволяет проверить не приходит ли строка вместо обьекта
//    const store = createStore(...args);

//    const oldDispatch = store.dispatch;
//    store.dispatch = (action) => {
//       if (typeof action === 'string') {
//          return oldDispatch({
//             type: action
//          });
//       }
//       return oldDispatch(action);
//    }
//    return store
// }

const stringMiddleware = () => (next) => (action) => {  // данный вариант позволяет принимать не только обьекты  action но и функцииб переменные и так далее 
    if (typeof action === 'string') {
         return next({
           type: action,
         });
      }
      return next(action);
}
   


// const store = createStore(
//    combineReducers({ heroes, filter }),
//   compose(applyMiddleware(ReduxThunk, stringMiddleware),
//      //  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
//    );

const store = configureStore({
   reducer: { heroes, filter },
   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),  // это то что входит в redux toolkit
   devTools: process.env.NODE_ENV !== 'production',

});

export default store;
