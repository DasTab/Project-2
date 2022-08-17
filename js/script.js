/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

// Чтобы прогрузилась ДОМ структура, а после скрипты
document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против",
    ],
  };

  const adv = document.querySelectorAll(".promo__adv img"),
    poster = document.querySelector(".promo__bg"),
    genre = poster.querySelector(".promo__genre"),
    movieList = document.querySelector(".promo__interactive-list"),
    addForm = document.querySelector("form.add"), // получаем форму полностью (вкл.инпут и чекбокс)
    addInput = addForm.querySelector(".adding__input"), // получаем инпут
    checkbox = addForm.querySelector("[type='checkbox']"); // получаем чекбокс через type


  // вешаем обработчик события 'submit' на форму
  addForm.addEventListener("submit", (event) => { // Отправка данных формы
    event.preventDefault(); // preventDefault чтобы страница не перезагружалась

    let newFilm = addInput.value; // Получение доступа к введенному значению
    const favorite = checkbox.checked; // True / false, свойство checked

    if (newFilm) { // Условие выполняется только когда в value есть данные, иначе false (проверка на пустую строку)
      
      if (newFilm.length > 21) { // Если название фильма больше, чем 21 символ - обрезаем его
        newFilm = `${newFilm.substring(0, 22)}...`; // Метод substring() возвращает строки между двумя индексами
      }
      if (favorite) { // 4 пункт
        console.log('Добавляем любимый фильм');
      }

      movieDB.movies.push(newFilm); // Добавляем указанный фильм в movieDB
      sortArr(movieDB.movies); // Сортируем
  
      createMovieList(movieDB.movies, movieList); // Создаем разметку под новый фильм
    }

    event.target.reset(); // Метод reset() очищает форму, после каждого submit
  });


  // ========= Функция по удалению рекламы ========= //
  // просто adv.remove(); не сработает т.к внутри находится коллекция псевдомассива
  const deleteAdv = (arr) => {
    arr.forEach((item) => {
      item.remove();
    });
  };


  // ========= Функция по замене жанра и фоновой картинки ========= //
  const makeChanges = () => {
    genre.innerHTML = "Драма";
    poster.style.backgroundImage = "url(img/bg.jpg)";
  };


  // =========== Функция сортировки =========== //
  const sortArr = (arr) => {
    arr.sort();
  };


  // ===== Функция которая очищает и вставляет список фильмов ===== //
  function createMovieList(films, parent) {
    parent.innerHTML = ""; // очищаем элемент
    sortArr(films);

    films.forEach((film, i) => {
      parent.innerHTML += `
          <li class="promo__interactive-item">${i + 1}. ${film}
              <div class="delete"></div>
          </li>
      `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove(); // При клике на мусорную корзину-элемент будет удаляться из списка
        movieDB.movies.splice(i, 1); // метод splice() изменяет содержимое массива, удаляя существующие элементы 
        createMovieList(films, parent); // рекурсия
      });
    });
  }


  deleteAdv(adv);
  makeChanges();
  createMovieList(movieDB.movies, movieList);


});

