<template>
  <div class="slidersAdmin">
    <h1 class="tytle">Слайдеры</h1>

    <fieldset>
      <legend>слайдеры страницы Radio:</legend>
      <h2>Слайдер шапки:</h2>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperHeadOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperHeadOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperHeadOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperHeadOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperHeadOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperHeadOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperHeadOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperHeadOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperHeadOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperHeadOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperHeadOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperHeadOp.mousewheel" /></label>
        <label>навигация: <input type="checkbox" v-model="swiperHeadOp.navigationActive" /></label>        
        <div class="option">Авто воспроизведение:
          <label>отложить воспроизведение: <input type="checkbox" v-model="swiperHeadOp.autoplay.delay" /></label>
          <label>скорость воспроизведения: <input type="checkbox" v-model="swiperHeadOp.autoplay.speed" /></label>
          <label>отключать автовоспроизведение после активности пользователя: <input type="checkbox" v-model="swiperHeadOp.autoplay.disableOnInteraction" /></label>
        </div>
        <div class="option">нумерация слайдов:
          <label>возможность клика по нумерации: <input type="checkbox" v-model="swiperHeadOp.pagination.clickable" /></label>
        </div>
      </div>
      <div class="box">
        <div class="newBoxItem">
          Создать новый слайд: <button type="button" @click="create('Head')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperHead" :key="item.id">
          <upload :preImgShow="item" :src="'headerSlider'" />
          <label>Автор: <input type="text" v-model="item.author" /></label>
          <label>Заголовок: <input type="text" v-model="item.track" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete head" @click.prevent="Delete(index, 'Head')">X</button></label>
        </div>
      </div>

      <h2>Слайдер новинки:</h2>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperNewItemsOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperNewItemsOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperNewItemsOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperNewItemsOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperNewItemsOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperNewItemsOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperNewItemsOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperNewItemsOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperNewItemsOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperNewItemsOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperNewItemsOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperNewItemsOp.mousewheel" /></label>
      </div>
      <div class="box">
        <div class="newBoxItem">        
          Создать новый слайд: <button type="button" @click="create('NewItems')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperNewItems" :key="item.id">
          <upload :preImgShow="item" :src="'newItams'" />
          <label>Автор: <input type="text" v-model="item.author" /></label>
          <label>Заголовок: <input type="text" v-model="item.track" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete items" @click.prevent="Delete(index, 'NewItems')">X</button></label>
        </div>
      </div>
      
      <h2>Слайдер видео:</h2>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperNewVideoOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperNewVideoOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperNewVideoOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperNewVideoOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperNewVideoOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperNewVideoOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperNewVideoOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperNewVideoOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperNewVideoOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperNewVideoOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperNewVideoOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperNewVideoOp.mousewheel" /></label>
        <label>навигация: <input type="checkbox" v-model="swiperNewVideoOp.navigationActive" /></label>
      </div>
      <div class="box">
        <div class="newBoxItem">
          Создать новый слайд: <button type="button" @click="create('NewVideo')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperNewVideo" :key="item.id">
          <label>внутренняя ссылка: <input type="checkbox" v-model="item.selfLinck" /></label>
          <label>показать изображение: <input type="checkbox" v-model="item.showImg" /></label>
          <label>показать текст: <input type="checkbox" v-model="item.showText" /></label>
          <label>внешняя ссылка: <input type="text" v-model="item.linck" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete video" @click.prevent="Delete(index, 'NewVideo')">X</button></label>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>Слайдр страницы ice-hot:</legend>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperIceHotOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperIceHotOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperIceHotOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperIceHotOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperIceHotOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperIceHotOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperIceHotOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperIceHotOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperIceHotOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperIceHotOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperIceHotOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperIceHotOp.mousewheel" /></label>
        <label>навигация: <input type="checkbox" v-model="swiperIceHotOp.navigationActive" /></label>
        <div class="option">Авто воспроизведение:
          <label>отложить воспроизведение: <input type="checkbox" v-model="swiperIceHotOp.autoplay.delay" /></label>
          <label>скорость воспроизведения: <input type="checkbox" v-model="swiperIceHotOp.autoplay.speed" /></label>
          <label>отключать автовоспроизведение после активности пользователя: <input type="checkbox" v-model="swiperIceHotOp.autoplay.disableOnInteraction" /></label>
        </div>
        <div class="option">нумерация слайдов:
          <label>возможность клика по нумерации: <input type="checkbox" v-model="swiperIceHotOp.pagination.clickable" /></label>
        </div>
      </div>
      <div class="box">
        <div class="newBoxItem">
          Создать новый слайд: <button type="button" @click="create('IceHot')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperIceHot" :key="item.id">
          <upload :preImgShow="item" :src="'slider'" />
          <label>внутренняя ссылка: <input type="checkbox" v-model="item.selfLinck" /></label>
          <label>показать изображение: <input type="checkbox" v-model="item.showImg" /></label>
          <label>показать текст: <input type="checkbox" v-model="item.showText" /></label>
          <label>внешняя ссылка: <input type="text" v-model="item.linck" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete this item" @click.prevent="Delete(index, 'IceHot')">X</button></label>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>Слайдер страницы Новинки:</legend>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperNewItemOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperNewItemOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperNewItemOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperNewItemOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperNewItemOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperNewItemOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperNewItemOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperNewItemOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperNewItemOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperNewItemOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperNewItemOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperNewItemOp.mousewheel" /></label>
        <label>навигация: <input type="checkbox" v-model="swiperNewItemOp.navigationActive" /></label>
        <div class="option">Авто воспроизведение:
          <label>отложить воспроизведение: <input type="checkbox" v-model="swiperNewItemOp.autoplay.delay" /></label>
          <label>скорость воспроизведения: <input type="checkbox" v-model="swiperNewItemOp.autoplay.speed" /></label>
          <label>отключать автовоспроизведение после активности пользователя: <input type="checkbox" v-model="swiperNewItemOp.autoplay.disableOnInteraction" /></label>
        </div>
        <div class="option">нумерация слайдов:
          <label>возможность клика по нумерации: <input type="checkbox" v-model="swiperNewItemOp.pagination.clickable" /></label>
        </div>
      </div>
      <div class="box">
        <div class="newBoxItem">
          Создать новый слайд: <button type="button" @click="create('NewItem')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperNewItem" :key="item.id">
          <upload :preImgShow="item" :src="'slider'" />
          <label>внутренняя ссылка: <input type="checkbox" v-model="item.selfLinck" /></label>
          <label>показать изображение: <input type="checkbox" v-model="item.showImg" /></label>
          <label>показать текст: <input type="checkbox" v-model="item.showText" /></label>
          <label>внешняя ссылка: <input type="text" v-model="item.linck" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete this item" @click.prevent="Delete(index, 'NewItem')">X</button></label>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>Слайдер страницы Команда:</legend>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperTeamOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperTeamOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperTeamOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperTeamOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperTeamOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperTeamOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperTeamOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperTeamOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperTeamOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperTeamOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperTeamOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperTeamOp.mousewheel" /></label>
        <label>навигация: <input type="checkbox" v-model="swiperTeamOp.navigationActive" /></label>
        <div class="option">Авто воспроизведение:
          <label>отложить воспроизведение: <input type="checkbox" v-model="swiperTeamOp.autoplay.delay" /></label>
          <label>скорость воспроизведения: <input type="checkbox" v-model="swiperTeamOp.autoplay.speed" /></label>
          <label>отключать автовоспроизведение после активности пользователя: <input type="checkbox" v-model="swiperTeamOp.autoplay.disableOnInteraction" /></label>
        </div>
        <div class="option">нумерация слайдов:
          <label>возможность клика по нумерации: <input type="checkbox" v-model="swiperTeamOp.pagination.clickable" /></label>
        </div>
      </div>
      <div class="box">
        <div class="newBoxItem">
          Создать новый слайд: <button type="button" @click="create('Team')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperTeam" :key="item.id">
          <upload :preImgShow="item" :src="'slider'" />
          <label>внутренняя ссылка: <input type="checkbox" v-model="item.selfLinck" /></label>
          <label>показать изображение: <input type="checkbox" v-model="item.showImg" /></label>
          <label>показать текст: <input type="checkbox" v-model="item.showText" /></label>
          <label>внешняя ссылка: <input type="text" v-model="item.linck" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete this list item" @click.prevent="Delete(index, 'Team')">X</button></label>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>Слайдер страницы плейлист:</legend>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperPlayListOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperPlayListOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperPlayListOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperPlayListOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperPlayListOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperPlayListOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperPlayListOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperPlayListOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperPlayListOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperPlayListOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperPlayListOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperPlayListOp.mousewheel" /></label>
        <label>навигация: <input type="checkbox" v-model="swiperPlayListOp.navigationActive" /></label>
        <div class="option">Авто воспроизведение:
          <label>отложить воспроизведение: <input type="checkbox" v-model="swiperPlayListOp.autoplay.delay" /></label>
          <label>скорость воспроизведения: <input type="checkbox" v-model="swiperPlayListOp.autoplay.speed" /></label>
          <label>отключать автовоспроизведение после активности пользователя: <input type="checkbox" v-model="swiperPlayListOp.autoplay.disableOnInteraction" /></label>
        </div>
        <div class="option">нумерация слайдов:
          <label>возможность клика по нумерации: <input type="checkbox" v-model="swiperPlayListOp.pagination.clickable" /></label>
        </div>
      </div>
      <div class="box">
        <div class="newBoxItem">
          Создать новый слайд: <button type="button" @click="create('PlayList')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperPlayList" :key="item.id">
          <upload :preImgShow="item" :src="'slider'" />
          <label>внутренняя ссылка: <input type="checkbox" v-model="item.selfLinck" /></label>
          <label>показать изображение: <input type="checkbox" v-model="item.showImg" /></label>
          <label>показать текст: <input type="checkbox" v-model="item.showText" /></label>
          <label>внешняя ссылка: <input type="text" v-model="item.linck" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete this list item" @click.prevent="Delete(index, 'PlayList')">X</button></label>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>Слайдер страницы видео:</legend>
      <div class="newBoxItem options">
        <h2>Настройки слайдера:</h2>
        <label>количество слайдов для отображения: <input type="number" v-model="swiperVideoOp.slidesPerView" /></label>
        <label>пространство между слайдами: <input type="number" v-model="swiperVideoOp.spaceBetween" /></label>
        <label>количество милисекунд перелистывания: <input type="number" v-model="swiperVideoOp.speed" /></label>
        <label>эффект смены слайда:
          <select v-model="swiperVideoOp.effect">
            <option value="fade">fade</option>
            <option value="cube">cube</option>
            <option value="coverflow">coverflow</option>
            <option value="flip">flip</option>
          </select>
        </label>
        <label>центрирование слайдов: <input type="checkbox" v-model="swiperVideoOp.centeredSlides" /></label>
        <label>прелоадер картинок слайда: <input type="checkbox" v-model="swiperVideoOp.lazy" /></label>
        <label>авто высота слайда: <input type="checkbox" v-model="swiperVideoOp.autoHeight" /></label>
        <label>листание слайдов паралах фоне: <input type="checkbox" v-model="swiperVideoOp.parallax" /></label>
        <label>курсор захвата слайда: <input type="checkbox" v-model="swiperVideoOp.grabCursor" /></label>
        <label>бесконечное листание: <input type="checkbox" v-model="swiperVideoOp.loop" /></label>
        <label>свободный режим слайдов: <input type="checkbox" v-model="swiperVideoOp.freeMode" /></label>
        <label>скрол колисом мышки: <input type="checkbox" v-model="swiperVideoOp.mousewheel" /></label>
        <label>навигация: <input type="checkbox" v-model="swiperVideoOp.navigationActive" /></label>
        <div class="option">Авто воспроизведение:
          <label>отложить воспроизведение: <input type="checkbox" v-model="swiperVideoOp.autoplay.delay" /></label>
          <label>скорость воспроизведения: <input type="checkbox" v-model="swiperVideoOp.autoplay.speed" /></label>
          <label>отключать автовоспроизведение после активности пользователя: <input type="checkbox" v-model="swiperVideoOp.autoplay.disableOnInteraction" /></label>
        </div>
        <div class="option">нумерация слайдов:
          <label>возможность клика по нумерации: <input type="checkbox" v-model="swiperVideoOp.pagination.clickable" /></label>
        </div>
      </div>
      <div class="box">
        <div class="newBoxItem">
          Создать новый слайд: <button type="button" @click="create('Video')">+</button>
        </div>
        <div class="item" v-for="(item, index) in swiperVideo" :key="item.id">
          <upload :preImgShow="item" :src="'slider'" />
          <label>внутренняя ссылка: <input type="checkbox" v-model="item.selfLinck" /></label>
          <label>показать изображение: <input type="checkbox" v-model="item.showImg" /></label>
          <label>показать текст: <input type="checkbox" v-model="item.showText" /></label>
          <label>внешняя ссылка: <input type="text" v-model="item.linck" /></label>
          <label>Удалить слайд: <button class="del" type="button" title="Delete this video" @click.prevent="Delete(index, 'Video')">X</button></label>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import GetImages from '@/components/getImages.vue'
import upload from '@/components/upload.vue'

export default {
  components: {
    GetImages, upload,
  },
  data() {
    return {
      swiperHead: [],
      swiperNewItems: [],
      swiperNewVideo: [],
      swiperIceHot: [],
      swiperNewItem: [],
      swiperTeam: [],
      swiperPlayList: [],
      swiperVideo: [],

      swiperHeadOp: {},
      swiperNewItemsOp: {},
      swiperNewVideoOp: {},
      swiperIceHotOp: {},
      swiperNewItemOp: {},
      swiperTeamOp: {},
      swiperPlayListOp: {},
      swiperVideoOp: {},

      swiperVideoCr:{
        id: 0,
        img: 'download.png',
        selfLinck: false,
        showImg: false,
        showText: false,
        linck: 'http://',
        text: 'Slide',
      },
      swiperPlayListCr:{
        id: 0,
        img: 'download.png',
        selfLinck: false,
        showImg: false,
        showText: false,
        text: 'Slide',
        linck: 'http://',
      },
      swiperTeamCr:{
        id: 0,
        img: 'download.png',
        selfLinck: false,
        showImg: false,
        showText: false,
        text: 'Slide',
        linck: 'http://',
      },
      swiperNewItemCr:{
        id: 0,
        img: 'download.png',
        selfLinck: false,
        showImg: false,
        showText: false,
        text: 'Slide',
        linck: 'http://',
      },
      swiperIceHotCr:{
        id: 0,
        img: 'download.png',
        selfLinck: false,
        showImg: false,
        showText: false,
        text: 'Slide',
        linck: 'http://',
      },
      swiperNewVideoCr:{
        id: 0,
        name: '',
        linck: 'https://',
        play: false
      },
      swiperNewItemsCr:{
        id: 0,
        img: 'download.png',
        author: '',
        track: '',
        hover: false,
        play: false,
      },
    }
  },
  computed: {
    ...mapGetters({
      GET_SWIPER_HEAD: 'Radio/GET_SWIPER_HEAD',
      GET_SWIPER_NEW_ITEM: 'Radio/GET_SWIPER_NEW_ITEM',
      GET_SWIPER_NEW_VIDEO: 'Radio/GET_SWIPER_NEW_VIDEO',
      GET_SWIPER_IH: 'IceHot/GET_SWIPER',
      GET_SWIPER_NI: 'NewItem/GET_SWIPER',
      GET_SWIPER_T: 'Team/GET_SWIPER',
      GET_SWIPER_PL: 'PlayList/GET_SWIPER',
      GET_SWIPER_V: 'Video/GET_SWIPER',
      
      GET_SWIPER_HEAD_OP: 'Radio/GET_SWIPER_HEAD_OP',
      GET_SWIPER_NEW_ITEM_OP: 'Radio/GET_SWIPER_NEW_ITEM_OP',
      GET_SWIPER_NEW_VIDEO_OP: 'Radio/GET_SWIPER_NEW_VIDEO_OP',
      GET_SWIPER_IH_OP: 'IceHot/GET_SWIPER_OP',
      GET_SWIPER_NI_OP: 'NewItem/GET_SWIPER_OP',
      GET_SWIPER_T_OP: 'Team/GET_SWIPER_OP',
      GET_SWIPER_PL_OP: 'PlayList/GET_SWIPER_OP',
      GET_SWIPER_V_OP: 'Video/GET_SWIPER_OP',

      GET_MENU_ADMIN: 'Admin/GET_MENU_ADMIN',
    }),
  },
  methods: {
    ...mapActions({
      //loader: 'preLoader/loader',
    }),
    ...mapMutations({
      SET_MENU_ADMIN: 'Admin/SET_MENU_ADMIN',
    }),
    bubbleSort(arr){
      for (let i = 0, endI = arr.length - 1; i < endI; i++) {
        let wasSwap = false;
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
          if (arr[j].id > arr[j + 1].id) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            wasSwap = true;
          }
        }
        if (!wasSwap) break;
      }
      return arr;
    },
    create(option){
      let arr = eval('this.swiper'+option),
        sortArr = this.bubbleSort(eval('this.swiper'+option)),
        create = eval('this.swiper'+option+'Cr')

      create.id = (sortArr[sortArr.length-1].id+1)
      let tmp = eval('this.swiper'+option+'Cr')
      arr.unshift(tmp)
      //eval('this.swiper'+option) = arr
    },
    Delete(index, option){
      let arr = eval('this.swiper'+option)
      arr.splice(index, 1)
    },
  },
  watch: {
    GET_SWIPER_HEAD(newD, lastD){
      this.swiperHead = newD
    },
    GET_SWIPER_HEAD_OP(newD, lastD){
      this.swiperHeadOp = newD
    },
    GET_SWIPER_NEW_ITEM(newD, lastD){
      this.swiperNewItems = newD
    },
    GET_SWIPER_NEW_ITEM_OP(newD, lastD){
      this.swiperNewItemsOp = newD
    },
    GET_SWIPER_NEW_VIDEO(newD, lastD){
      this.swiperNewVideo = newD
    },
    GET_SWIPER_NEW_VIDEO_OP(newD, lastD){
      this.swiperNewVideoOp = newD
    },
    GET_SWIPER_IH(newD, lastD){
      this.swiperIceHot = newD
    },
    GET_SWIPER_IH_OP(newD, lastD){
      this.swiperIceHotOp = newD
    },
    GET_SWIPER_NI(newD, lastD){
      this.swiperNewItem = newD
    },
    GET_SWIPER_NI_OP(newD, lastD){
      this.swiperNewItemOp = newD
    },
    GET_SWIPER_T(newD, lastD){
      this.swiperTeam = newD
    },
    GET_SWIPER_T_OP(newD, lastD){
      this.swiperTeamOp = newD
    },
    GET_SWIPER_PL(newD, lastD){
      this.swiperPlayList = newD
    },
    GET_SWIPER_PL_OP(newD, lastD){
      this.swiperPlayListOp = newD
    },
    GET_SWIPER_V(newD, lastD){
      this.swiperVideo = newD
    },
    GET_SWIPER_V_OP(newD, lastD){
      this.swiperVideoOp = newD
    },
  },
  created() {
    this.swiperHead = this.GET_SWIPER_HEAD
    this.swiperNewItems = this.GET_SWIPER_NEW_ITEM
    this.swiperNewVideo = this.GET_SWIPER_NEW_VIDEO
    this.swiperIceHot = this.GET_SWIPER_IH
    this.swiperNewItem = this.GET_SWIPER_NI
    this.swiperTeam = this.GET_SWIPER_T
    this.swiperPlayList = this.GET_SWIPER_PL
    this.swiperVideo = this.GET_SWIPER_V

    this.swiperHeadOp = this.GET_SWIPER_HEAD_OP
    this.swiperNewItemsOp = this.GET_SWIPER_NEW_ITEM_OP
    this.swiperNewVideoOp = this.GET_SWIPER_NEW_VIDEO_OP
    this.swiperIceHotOp = this.GET_SWIPER_IH_OP
    this.swiperNewItemOp = this.GET_SWIPER_NI_OP
    this.swiperTeamOp = this.GET_SWIPER_T_OP
    this.swiperPlayListOp = this.GET_SWIPER_PL_OP
    this.swiperVideoOp = this.GET_SWIPER_V_OP
  },
}
</script>

<style lang="scss" scoped>
.slidersAdmin{
  width: 100%;
  height: 100%;
  
  input{
    border: 0.1px solid;
  }
  button{
    cursor: pointer;
  }
  &>.tytle{
    color: tan;
    font-size: 30px;
    font-family: Tahoma;
    text-transform: capitalize;
    padding: 0 0 20px;
    user-select: none;
  }
  fieldset {
    border: 1.5px solid #CCA383;
    width: calc(100% - 20px);
    padding: 0 4px 4px 4px;
    margin: 0 0 50px 0;

    &>legend {
      white-space: normal;
      font-size: 17px;
      color: burlywood;
      text-transform: capitalize;
    }
    h2{
      white-space: normal;
      font-size: 17px;
      color: burlywood;
      text-transform: capitalize;
    }
    &>.box{
      width: 100%;
      display: flex;
      flex-flow: wrap row;
      justify-content: space-evenly;

      &>.item{
        width: 270px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 0 0 0 10px;
        border-top: 1px solid;
        border-bottom: 1px solid;
        margin: 8px 0 0 0;
        border-radius: 20px;

        &>label{
          .del{
            width: 24px;
            height: 24px;
            background: brown;
            color: chartreuse;
            border-radius: 50%;
            margin: 0;
            cursor: pointer;
          }
        }
      }
    }

    &>.options{
      display: flex;
      flex-flow: wrap column;
      width: 670px;
      margin: 0 auto;

      &>.option{
        display: flex;
        flex-flow: wrap row;
        width: 260px;
      }
      &>h2{
        width: 100%;
      }


    }
  }
}
</style>