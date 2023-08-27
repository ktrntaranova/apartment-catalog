import singleItem from './../singleItem/singleItemController';

export default function (state){

    // очищаем контейнер приложения
    document.querySelector("#app").innerHTML = "";

    //Запускаем компонент singleItem
    singleItem(state);
}

