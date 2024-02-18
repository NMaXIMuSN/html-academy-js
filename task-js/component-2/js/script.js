(function() {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки слайдера, параметры получаются из командной строки
   * pagination - boolean, отображает пагинацию
   * loop - boolean, зацикливает слайдер
   *
   * Для тестирования работы своего скрипта при разных значениях параметров временно
   * переопределяйте значение переменных, хранящих эти параметр.
   * Либо можете дописыват гет-параметры с нужным значением в конец адресной строки,
   * например: ?pagination=1&loop=0
   */
  const settings = {
    pagination: !!getUrlValue('pagination'),
    loop: !!getUrlValue('loop'),
  };

  /* Код компонента пишите ниже */
  const SliderItems = document.querySelectorAll('.slider-item');
  const Pagination = document.querySelector('.slider-pagination');
  const BtnNext = document.querySelector('.slider-toggle--next');
  const BtnPrev = document.querySelector('.slider-toggle--prev');

  const UpdateSliderItem = (prevIndex, newIndex) => {
    SliderItems[prevIndex].classList.remove('slider-item--current');
    SliderItems[newIndex].classList.add('slider-item--current');
  };

  const UpdatePagination = (prevIndex, newIndex) => {
    Pagination.children[newIndex].querySelector('button').disabled = true;
    Pagination.children[prevIndex].querySelector('button').disabled = false;
  };

  const UpdateButtonDisabled = (index) => {
    if (index === 0 && !settings.loop) {
      BtnPrev.disabled = true;
    } else {
      BtnPrev.disabled = false;
    }

    if (index === SliderItems.length - 1 && !settings.loop) {
      BtnNext.disabled = true;
    } else {
      BtnNext.disabled = false;
    }
  };

  const AllUpdated = (prevIndex, newIndex) => {
    UpdatePagination(prevIndex, newIndex);
    UpdateSliderItem(prevIndex, newIndex);
    UpdateButtonDisabled(newIndex);
  };


  let CurrentIndex = 0;

  if (settings.loop) {
    BtnPrev.disabled = false;
  }

  if (!settings.pagination && Pagination) {
    Pagination.style.display = 'none';
  }

  BtnNext.addEventListener('click', () => {
    const prev = CurrentIndex;
    if (settings.loop) {
      CurrentIndex = (CurrentIndex + 1) % SliderItems.length;
    } else {
      CurrentIndex = Math.min(CurrentIndex + 1, 2);
    }

    AllUpdated(prev, CurrentIndex);
  });

  BtnPrev.addEventListener('click', () => {
    const prev = CurrentIndex;
    if (settings.loop) {
      CurrentIndex = CurrentIndex - 1 < 0 ? SliderItems.length - 1 : CurrentIndex - 1;
    } else {
      CurrentIndex = Math.max(CurrentIndex - 1, 0);
    }

    AllUpdated(prev, CurrentIndex);
  });

  for (let i = 0; i < Pagination.children.length; i++) {
    Pagination.children[i].addEventListener('click', () => {
      if (i !== CurrentIndex) {
        AllUpdated(CurrentIndex, i);
        CurrentIndex = i;
      }
    });
  }

})();
