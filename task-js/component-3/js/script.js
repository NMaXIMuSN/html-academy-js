(function() {
  /* Код компонента пишите здесь */
  const form = document.getElementById('booking-form');
  const Phone = document.getElementById('phone');
  const CheckoutDate = document.getElementById('checkout-date');
  const CheckinDate = document.getElementById('checkin-date');
  const radioBtn = document.querySelectorAll('input[type=radio]');
  const adults = document.getElementById('adults');
  const children = document.getElementById('children');

  const GetClassValid = (element) => {
    element.classList.add('field-correct');
    element.classList.remove('field-error');
  };

  const GetClassUnValid = (element) => {
    element.classList.remove('field-correct');
    element.classList.add('field-error');
  };

  const ValidPhone = () => {
    const RegExValid = /^\+7 [(]?[0-9]{3}[)]? [0-9]{3}[- | \s]?[0-9]{2}[-\s]?[0-9]{2}$/im;
    const IsValid = RegExValid.test(Phone.value);
    if (IsValid) {
      GetClassValid(Phone);
    } else {
      GetClassUnValid(Phone);
    }
  };

  const ValidDate = () => {
    const [yearIn, monthIn, dayIn] = CheckinDate.value.split(/[.-]/ig);
    const [yearOut, monthOut, dayOut] = CheckoutDate.value.split(/[.-]/ig);

    const DateIn = new Date(Math.max(yearIn, dayIn), monthIn, Math.min(yearIn, dayIn));
    const DateOut = new Date(Math.max(yearOut, dayOut), monthOut, Math.min(yearOut, dayOut));

    if (DateIn.toString() !== 'Invalid Date' && DateOut.toString() !== 'Invalid Date') {
      const IsValidDates = (DateOut.getTime() - DateIn.getTime()) / (1000 * 60 * 60 * 24);

      if (IsValidDates >= 4) {
        GetClassValid(CheckinDate);
        GetClassValid(CheckoutDate);
        return null;
      }
    }

    GetClassUnValid(CheckinDate);
    GetClassUnValid(CheckoutDate);
  };

  const ValidRadio = () => {
    let currentType = '';
    radioBtn.forEach((el) => {
      if (el.checked) {
        currentType = el.value;
      }
    });

    if (currentType === 'family') {
      if (+adults.value < 2 || +children.value < 1) {
        GetClassUnValid(adults);
        GetClassUnValid(children);
        return false;
      }
    }

    if (currentType === 'single' && +adults.value > 1) {
      GetClassUnValid(adults);
      GetClassUnValid(children);
      return false;
    }

    if (+adults.value < +children.value || +adults.value < 1) {
      GetClassUnValid(adults);
      GetClassUnValid(children);
      return false;
    }

    GetClassValid(adults);
    GetClassValid(children);
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    ValidPhone();
    ValidDate();
    ValidRadio();
  });

})();
