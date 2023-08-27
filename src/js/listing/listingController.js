import * as view from './listingView';

export default function(state){
    console.log('Start!!');
    //рендер контейнера для карточек
    view.render();

    // рендер карточек
    state.results.forEach(function(item){
        view.renderCard(item, state.favourites.isFav(item.id));
    });

    // Запускаем прослушку клика на иконки "добавить в избранное"
    addToFavsListener();

    state.emitter.subscribe('event:render-listing', ()=> {
        // очистить контейнер с карточками
        view.clearListingContainer();
        // Отрендерить карточки
        state.results.forEach(function(item){
            view.renderCard(item, state.favourites.isFav(item.id));
        });

         // Запускаем прослушку клика на иконки "добавить в избранное"
        addToFavsListener();
    });
    
    // Функция для работы иконок Добавить в избранное
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