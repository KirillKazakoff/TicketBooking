const fillReviews = () => {
    const reviewsData = [
        {
            src: './img/reviews/Kate.png',
            title: 'Просто класс',
            desc: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
        },
        {
            src: './img/reviews/Eugene.png',
            title: 'Сервис пушка',
            desc: 'СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
        },
        {
            src: './img/reviews/CatInBread.png',
            title: 'Кот в хлебе',
            desc: 'Слушайте рэп альбом кота в хлебе "Всратая Чайка". Ставьте лайки! Всех обнял',
        },
        {
            src: './img/reviews/humanEyesCat.png',
            title: 'Кот с глазами',
            desc: 'Всем привет, я кот с глазами. Кто мне глаза прифотошопил то? Ну людишки... Вы за все заплатите!!',
        },
        {
            src: './img/reviews/niceCat.png',
            title: 'Милый кот',
            desc: 'Меня позвали в массовку... Я здесь чисто по фану...',
        },
        {
            src: './img/reviews/whoIsThisCat.png',
            title: 'Кот стоик',
            desc: 'В этом мире лишь два пути - суицид или стоицизм!',
        },
    ];

    let offset = 0;

    while (reviewsData.length % 2 > 0) {
        reviewsData.push(reviewsData[offset]);
        offset += 1;
    }

    return reviewsData;
};

export const reviewsData = fillReviews();
