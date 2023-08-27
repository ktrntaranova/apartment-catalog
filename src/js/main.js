import homePage from './pages/homePage';
import singleItem from './pages/singleItemPage';
import favouritesPage from './pages/favouritesPage';
import bidsPage from './pages/bidsPage';
import errorPage from './pages/errorPage';
import EventEmitter from './utils/EventEmitter';
import Favourites from './favourites/favouritesModel';

const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites()
}

window.state = state;

// Маршруты

const routes = [
    { path: '/', component: homePage},
    { path: 'item', component: singleItem},
    { path: 'favourites', component: favouritesPage},
    { path: 'bids', component: bidsPage},
];

function findComponentByPath (path, routes) {
    return routes.find(function(route){
        return route.path === path;
    })
}

// router
function router(){
    // разбиваем путь на массив
    const pathArray = location.hash.split('/');

    // устанавливаем текущий путь
    let currentPath = pathArray[0] === '' ? '/' : pathArray[1];
    currentPath = currentPath === '' ? '/' : currentPath; // item // bids

    // save route params
    state.routeParams = pathArray[2] ? pathArray[2] : '';

    // Выбираем компонент для указанного адреса, либо компонент с ошибкой
    const { component = errorPage } = 
        findComponentByPath(currentPath, routes) || {};

    component(state);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);