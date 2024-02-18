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
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue('tabs_limit') || 0,
  };

  /* Код компонента пишите ниже */
  const AllAccordionTitle = document.querySelectorAll('.accordeon-item');
  let stack = [];

  for (let i = 0; i < AllAccordionTitle.length; i++) {
    const AccordionTitle = AllAccordionTitle[i];

    AccordionTitle.addEventListener('click', (e) => {
      if (e.target && e.target.className === 'accordeon-item-title') {
        const IsOpen = AccordionTitle.className.includes('accordeon-item--open');
        if (IsOpen) {
          AccordionTitle.classList.remove('accordeon-item--open');
          stack = stack.filter((el) => el !== i);
          return 1;
        }

        if (settings.tabsLimit && stack.length >= settings.tabsLimit) {
          const CloseAccordionIndex = stack.shift();
          AllAccordionTitle[CloseAccordionIndex].classList.remove('accordeon-item--open');
        }
        AccordionTitle.classList.add('accordeon-item--open');
        stack.push(i);
      }
    });
  }

})();
