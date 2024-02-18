(function() {
  /**
   * Служебная функция для заполнения диапазона слайдера цветом.
   * @param {number} from - начальное значение в %% диапазона.
   * @param {number} to - конечное значение в %% диапазона.
   * @param {HTMLElement} controlSlider - Элемент управления слайдером
   */
  const fillSlider = (from, to, controlSlider) => {
    const sliderColor = '#ffffff';
    const rangeColor = '#25daa5';
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${from}%,
      ${rangeColor} ${from}%,
      ${rangeColor} ${to}%,
      ${sliderColor} ${to}%,
      ${sliderColor} 100%)`;
  };

  /* Код компонента пишите ниже */
  const Sliders = document.querySelectorAll('.range_container');

  for (const slider of Sliders) {
    const DataSet = slider.dataset;

    const [fromSlider, toSlider] = [slider.querySelector('.fromSlider'), slider.querySelector('.toSlider')];
    const [fromInput, toInput] = [slider.querySelector('.fromInput'), slider.querySelector('.toInput')];

    if (!DataSet.range) {
      slider.querySelector('.form_control_container').style.display = 'none';
      slider.querySelector('.fromSlider').style.display = 'none';
    }

    const UpdateLine = (from, to) => {
      if (!DataSet.range) {
        fillSlider(to / 12 * 100, to / 12 * 100, toSlider);
        return;
      }
      fillSlider(from / 12 * 100, to / 12 * 100, toSlider);
    };

    const UpdateFromSlider = (newValue) => {
      fromSlider.value = Math.min(newValue, 12 - (parseInt(DataSet.minDiff, 10) || 0));
      fromInput.value = newValue;
    };

    const UpdateToSlider = (newValue) => {
      toSlider.value = Math.max(newValue, (parseInt(DataSet.minDiff, 10) || 0));
      toInput.value = toSlider.value;
    };

    const OnInputTo = (e) => {
      UpdateToSlider(e.target.value);
      const CurrDiff = parseInt(toSlider.value,10) - parseInt(fromSlider.value, 10);

      if (CurrDiff >= parseInt(DataSet.maxDiff, 10)) {
        UpdateFromSlider(parseInt(toSlider.value, 10) - parseInt(DataSet.maxDiff, 10));
      }

      if (CurrDiff <= (parseInt(DataSet.minDiff, 10) || 0)) {
        UpdateFromSlider(parseInt(toSlider.value, 10) - (parseInt(DataSet.minDiff, 10) || 0));
      }

      UpdateLine(fromSlider.value, toSlider.value);
    };

    toSlider.addEventListener('input', OnInputTo);

    toInput.addEventListener('input', OnInputTo);

    const OnInputFrom = (e) => {
      UpdateFromSlider(e.target.value);
      const CurrDiff = parseInt(toSlider.value,10) - parseInt(fromSlider.value, 10);

      if (CurrDiff >= parseInt(DataSet.maxDiff, 10)) {
        UpdateToSlider(parseInt(fromSlider.value, 10) + parseInt(DataSet.maxDiff, 10));
      }
      if (CurrDiff <= (parseInt(DataSet.minDiff, 10) || 0)) {
        UpdateToSlider(parseInt(fromSlider.value, 10) + (parseInt(DataSet.minDiff, 10) || 0));
      }

      fromInput.value = fromSlider.value;
      UpdateLine(fromSlider.value, toSlider.value);
    };

    fromSlider.addEventListener('input', OnInputFrom);
    fromInput.addEventListener('input', OnInputFrom);

    UpdateLine(fromSlider.value, toSlider.value);

  }
})();
