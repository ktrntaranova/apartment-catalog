import * as view from './bidsView.js';
import Bids from './bidsModel.js';

export default async function (state){

    // создаем объект модели для работы с заявками
    if (!state.bids) state.bids = new Bids();

    // получаем заявки с сервера
    await state.bids.getBids();

    // отображаем заявки с сервера
    view.renderBids(state.bids.bids);
}