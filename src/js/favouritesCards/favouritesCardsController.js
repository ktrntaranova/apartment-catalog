import FavouritesCards from "./favouritesCardsModel";
import * as view from './favouritesCardsView';

export default async function (state) {
    
    // получить список объектов которые находятся в избранном
    const favsList = state.favourites.favs;

    // получение данных с сервера
    const favouriteCards = new FavouritesCards(favsList);
    await favouriteCards.getFavs();
     
    // отображаем контейнер и карточки 
    view.renderPage(favouriteCards.cards);

    // Запускаем прослушку клика на иконки "добавить в избранное"
    addToFavsListener();

    // функция для работы иконок Добавить в избранное
    function addToFavsListener(){
        Array.from(document.getElementsByClassName('card__like')).forEach((item)=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault();
                // находим ID объекта, по которому кликнули
                const currentId = e.target.closest('.card').dataset.id;
                // добавляем  / убираем элемент из избранного
                state.favourites.toggleFav(currentId);
                // вкл выкл иконку с избранным
                view.toggleFavouriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            });
        });
    }
}