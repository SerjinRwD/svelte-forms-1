### О проекте

Учебный проект по созданию клиентского приложения с использованием Svelte.

**Идея:** сделать одну форму для заполнения данных, разбитую на несколько экранов. На каждом экране выполняется клиентская валидация ввода.

Бесконечные создаваемые по долгу службы лендинги регистрации и подписки на ивенты и визиты, с ФИО, мейлом, датой рождения и обязательным согласием на хранение и ~~разбазаривание ПД всем и каждому~~ передачу ПД третьим сторонам, уже надоели, поэтому сделал "конструктор персонажа в РПГ".

В комьюнити Svelte я не нашёл реально готовых к эксплуатации плагинов для валидации ввода, поэтому решил заодно поисследовать какие решения для валидации ввода на JS существуют помимо старичка [jquery.validate.js](https://jqueryvalidation.org/) (на vue использовал [VeeValidate](https://logaretm.github.io/vee-validate/) и [vuelidate](https://github.com/vuelidate/vuelidate)) и убогенького Validation API в HTML5. Вариантов, довольно много, но реально мне понравились только два:
* [@yaireo/validator](https://github.com/yairEO/validator)
* [validate.js](https://validatejs.org/)

Оба пробую использовать на трёх экранах ввода:
* views/View1.svelte &mdash; используется @yaireo/validator "как есть", с минимальными настройками
* views/View2.svelte &mdash; используется validate.js "по-простому", т.е. просто создаю валидатор, правила валидации, вывод ошибок сделан без особых заморочек
* views/View3.svelte &mdash; так же используется validate.js, но помимо собственно полей ввода проверяются дополнительные нюансы:
  * количество выбранных навыков
  * количество распределённых очков скилов

  Так же сообщения об ошибках преобразованы в компонент components/ValidationError.svelte

@yaireo/validator очень простенький и неплохо интегрируется со Svelte. Но плане кастомизации слабоват (а в энтерпрайзе всегда что-нибудь приходится делать для внезапной хотелки клиента).

validate.js не имеет встроенного механизма рендеринга ошибок, что для решений типа Vue, React, Svelte (и т.д.) с моей точки зрения скорее плюс &mdash; не нужно сражаться с библиотекой, интегрируя её в экосистему любомого фреймворка. Зато в плане механизма валидации модели данных имеем много плюшек.

Технически, все три экрана формы это самостоятельные &lt;form&gt;, на которых вводятся отдельные параметры одной общей модели данных &mdash; абстрактного персонажа. Все введённые данные выводятся на экране views/Summary.svelte.

Модель персонажа хранится в Svelte storage. Работать со storage очень просто и приятно! На vuex мне бы это делать не понравилось (может быть, я просто не умею его готовить).

Для плавных и "красивых" переходов используется компонент components/Wrapper.svelte. Компонент в свою очередь использует Svelte transitions. Использование этого Svelte решения также отличается лёгкостью и прозрачностью.

Не уверен, что стал бы использовать Svelte в крупном SPA, но в небольших "интерактивных" лендингах он хорошо заменит и jquery и knockout.

### Установка и запуск

Приложение создано на основе [типового шаблона](https://svelte.dev/blog/the-easiest-way-to-get-started#2_Use_degit), поэтому команды те же:
* npm install &mdash; восстанавливаем зависимости
* npm run dev &mdash; запускаем dev-сервер с hot reload
* npm run build &mdash; собираем для прода