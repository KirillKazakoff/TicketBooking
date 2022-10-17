# Дипломная работа к профессии frontend-разработчик (Система бронирования ЖД билетов) 

<span style="font-size: 20px">Ссылка на сайт: [**GitHubPages**][GitHubPages]</span>

</br>


<span style="font-size: 20px">Оглавление</span>

- [Дипломная работа к профессии frontend-разработчик (Система бронирования ЖД билетов)](#дипломная-работа-к-профессии-frontend-разработчик-система-бронирования-жд-билетов)
  - [Основные элементы](#основные-элементы)
  - [Демонстрация](#демонстрация)
  - [Архитектура](#архитектура)
  - [Подробнее](#подробнее)
  - [Плагины](#плагины)
  - [Установка](#установка)

[![Build status](https://ci.appveyor.com/api/projects/status/bl402k39q5shdes8/branch/master?svg=true)](https://ci.appveyor.com/project/KirillKazakoff/finaldiploma/branch/master)

Результатом является SPA на React с использованием TypeScript. Маршрутизация работает на react-router (v6). Сборка всего проекта осуществляется с помощью Webpack.

## Основные элементы
1. Вагон
2. Направление
3. Группа направлений
4. Место (билет)

</br>

- Вагон    
    - Вагон может быть одним из типов: сидячий, люкс (СВ), купе, плацкарт
    - У каждого типа вагона своя карта рассадки мест. 
    - У каждого вагона своя стоимость билетов.
    - Для каждого вагона есть возможность выбора дополнительных услуг: 
бельё, кондиционер и Wi-Fi.
    - Для некоторых вагонов стоимость белья включена в стоимость билета 
(стоимость белья не должна прибавляться при формировании конечной стоимости билета).
- Направление
    - Направление - путь движения вагона из одного города в другой.
    - Направление предполагает движение поезда только в одну сторону.
    - Направление имеет дату отправления и дату прибытия.
- Группа направлений
    - Используется для того, чтобы обеспечить возможность
путешествия из одного города в другой и обратно.
    - Объединяет в себе два направления
- Место (билет)
    - Имеет свой номер на карте вагона
    - Может быть занято другим пассажиром
    - Закреплено за конкретным направлением
- Место-пассажир
    - Закрепляет пассажира за выбранным местом.
    - Проверяется условие "на 1 взрослого максимум 3 ребенка"
---

## Демонстрация 
- ### **Главная страница** </br>
    На главной странице пользователь вводит направление маршрута, а также 
    дату поездки "туда". При желании он может также ввести дату "обратно". Тогда будут искаться также билеты с соответствующим направлением.
    
    При submit-событии, форма валидируется и если статус valid, то пользователь переходит на следующий route "/tickets".

    ![mainPageGif]

    <details>
    <summary>🦔</summary>
      Также здесь есть slider (анимированный через css-анимации (keyframes)). Календарь построен с помощью библиотеки для работы с датами и временем "luxon".
    </details>

</br>

- ### **Билеты** </br>
    Страница бронирования билетов. Слева расположена секция с фильтрами. Также можно отсортировать билеты, показать указаное количество билетов (они сортируются на сервере). После нажатия на кнопку "Выбрать места" происходит переход в секцию с местами, в redux state заносится активный билет (выбранный пользователем).

    При наведении на количество свободных мест выплывает подсказка с информацией о минимальной цене на опр. тип места.

    ![ticketsGif]

</br>

- ### **Выбор мест** </br>
    Страница выбора мест в поезде. Места могут быть выбраны в разных вагонах. Также, для каждого вагона перерасчитывается отдельно цена на доп. услуги (wi-fi, белье и т.д). 
    
    Если пользователь не выбрал места, то он не сможет пройти в следующую секцию

    ![placesGif]

</br>

- ### **Пассажиры** </br>
    В этой секции пользователь заполняет информацию о пассажирах. Информация о каждом пассажире является формой. Если форма валидна, то она подсвечивается зеленым цветом. При желании можно изменить количество мест(добавить новые или убрать существующие), а также удалять ненужную информацию.
    
    Также, если пользователь взрослый, то он может добавить ребенка без занятия кресла.

    ![passengersGif]

</br>

- ### **Пассажиры-места** </br>
    Эта секция закрепляет за каждым пассажиром конкретное место в вагоне. Если пассажир является ребенком, то цена на билет снижается в 2 раза.

    В данной секции форма также проверяется на несколько условий перед submit (если какое-то из мест не закрепленно или на 1 взрослого больше 3 детей, то пользователь не сможет пройти в следующую секцию)

    ![pasplacesGif]

</br>

- ### **Персональные данные (payment)** </br>
    Здесь пользователь (человек, который будет за все это платить) заполняет свои персональные данные, а также выбирает способ оплаты. 

    ![paymentGif]

</br>

- ### **Проверка** </br>
    Пользователь проверяет введеные им данные. При желании он может вернуться на любой из маршрутов и изменить их. После submit'а отправляется POST-запрос с информацией о заказе.

    Затем, в случае успешного ответа от сервера, пользователь перенаправляется в секцию с дальнейшими инструкциями. При желании, он может поставить оценку сервису.

    ![orderGif]

</br>

---

## Архитектура
- ### **Хранилище состояний** </br>
    Структура приложения базируется на redux. Для упрощения работы с хранилищем состояний используется redux-toolkit. Для мемоизации некоторых  select'ов (возвращающих каждый раз новое значение) используется встроенная библиотека reselect. По событию onbeforeunload все состояние перезаписывается в local storage и затем достаются оттуда в preloadedState при перезагрузке SPA.
    
    </br>

- ### **HTTP-запросы** </br>
    Для запросов на сервер и других асинхронных операций используется библиотека redux-thunk.

    </br>
    
- ### **Маршрутизация** </br>
    Маршрут на верхнем уровне (компонент PageRoute) является родительским для остальных маршрутов (кроме ErrorRoute и HistoryError, здесь происходит обработка ошибок). 
    
    В верхнем компоненте "соединяются" Header, Footer и Outlet (текущий подмаршрут), а также компоненты-утилиты (Information, LocationNavigator, ErrorNavigator).
---

## Подробнее
- ### **Redux и формы** </br>
    Для того, чтобы упростить работу над формами (хранение полей и их валидация), были созданы 3 основных компонента: Form, Feedback, FormFeedback. Компонент Form принимает submit-колбэк и добавляет форме класс ".submit" после отправки. Feedback добавляет ошибку полю после валидации (при некоторых условиях, например, если пользователь вводит данные впервые, то ошибка не отображается). FormFeedback "собирает" ошибки со всех полей в хранилище и, при наличии ошибки, выводит ее.

    Для того, чтобы переиспользовать эти компоненты пришлось передавать dispatch-action-ы в качестве колбэков.

    В redux состояния полей всех форм представляют идентичные структуры (reducer'ы типа setInput, setError, setFormError, setActive, setBlured и сама структура полей одинаковы), но при необходимости они были расширены (например, passengersSlice с динамическими формами). 
    
    Также было создано множество вспомогательных функций-хуков для работы с состояниями (useChange - диспатч значения после onChange события в input; useSetInput - диспатч значения, useValidateInput - валидация input'ов и т.д);

- ### **Thunk request** </br>
    Для "обобщения" всех запросов создана "обертка" над HTTP-запросами (функция request). Функция принимает на входе action-callback, устанавливающий статус запроса, а также объект, описывающий запрос (с свойствами url, method и т.д). 
    
    В результате либо приходят данные, либо, в случае ошибки, диспачится статус 'failed' и происходит навигация пользователя в ErrorRoute.

- ### **History Error Route** </br>
    Для того, чтобы исключить возврат пользователя назад в истории после оформления заказа был создан отдельный slice, куда записываются ключи локаций, в которых был пользователь (хук useLocation в react router). После успешного оформления всем локациям присваивается статус wasOrderSucceded = true. 

    Соответственно, в PageRoute при смене текущей локации она проверяется на статус, и при попытке вернуться назад пользователь будет перенаправлен в HistoryErrorRoute 

    ![historyGif]

- ### **Типизация** </br>
    Основные типы были вынесены в каталог types. Структуры, которые приходили в ответе запроса, либо отправлялись в запрос (POST), были вынесены в папку models.

- ### **Макет** </br>
    В ходе верстки было принято решение отказаться от полной модели БЭМ, а также не использовать ни препроцессоры, ни CSS-in-JS библиотеки (emotion, styled components, rebass и т.д). В данном проекте нет ничего, кроме css. Некоторые компоненты были вынесены отдельно вместе с css-файлами, основной код находится в style.css. 


- ### **Webpack-сборщик** </br>
    Это моя сборка (не create-react-app). В целом все как обычно, картинки и svg отправляются в dist с помощью copyPlugin.

    </br>

---

PS: Вы дочитали до конца! </br> Вы не человек, а просто какое-то чудо :3
    <details>
    <summary>🐇</summary>
    Вы еще и кролика развернули... **Ну вы даете, блин!** 👍
    </details>



---

</br>

## Плагины 

| Plugin        | README                                            |
| ------------- | ------------------------------------------------- |
| React         | [plugins/react/README.md][PlReact]                |
| Redux         | [plugins/redux/README.md][PlRedux]                |
| Redux-toolkit | [plugins/redux-toolkit/README.md][PlReduxToolkit] |
| TypeScript    | [plugins/typeScript/README.md][PlTypeScript]      |
| React-router  | [plugins/react-router/README.md][PlReactRouter]   |
| luxon         | [plugins/luxon/README.md][PlLuxon]                |
| Webpack       | [plugins/webpack/README.md][PlWebpack]            |
| Nanoid        | [plugins/nanoid/README.md][PlNanoid]              |

</br>

## Установка
Если вы хотите запустить приложение, клонируйте репозиторий, затем установите зависимости

```sh
yarn
```
И запустите webpack-dev-server:
```sh
yarn start
```



 <!-- Table  -->
 [PlReact]: <https://github.com/facebook/react/blob/main/README.md>
 [PlRedux]: <https://github.com/reduxjs/redux/blob/master/README.md>
 [PlReduxToolkit]: <https://github.com/reduxjs/redux-toolkit#readme>
 [PlTypeScript]: <https://github.com/microsoft/TypeScript/blob/main/README.md>
 [PlReactRouter]: <https://github.com/remix-run/react-router#readme>
 [PlLuxon]: <https://github.com/moment/luxon/blob/master/README.md>
 [PlWebpack]: <https://github.com/webpack/webpack/blob/main/README.md>
 [PlNanoid]: <https://github.com/ai/nanoid>


<!-- Links in text -->
[GitHubPages]: https://kirillkazakoff.github.io/TicketBooking/
[portfolioSrc]: https://github.com/KirillKazakoff/portfolio/tree/master/src
[mainPageGif]: ./assets/MainPage.gif
[ticketsGif]: ./assets/tickets.gif
[placesGif]: ./assets/places.gif
[passengersGif]: ./assets/passengers.gif
[pasplacesGif]: ./assets/pasPlaces.gif
[paymentGif]: ./assets/payment.gif
[orderGif]: ./assets/order.gif
[historyGif]: ./assets/history.gif