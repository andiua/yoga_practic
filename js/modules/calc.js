function calc() {
  const counterInputs = document.querySelectorAll('.counter-block-input'),
    place = document.getElementById('select'),
    totalValue = document.getElementById('total');
  let total = 0;

  totalValue.textContent = total;

  counterInputs.forEach((input) =>
    input.addEventListener('change', () => {
      if (![...counterInputs].every((elem) => elem.value)) {
        totalValue.textContent = 0;
      } else {
        // let methodWithMap = [...counterInputs] //різні методи ред'юса
        //   .map((el) => el.value)
        //   .reduce((a, b) => {
        //     return Number(a) + Number(b);
        //   }, 10);
        // let methodWithEachValue = [...counterInputs].reduce((a, b) => {
        //   return Number(a.value) + Number(b.value);
        // });
        // let methodWithInitialValue = [...counterInputs].reduce((a, b) => {
        //   return Number(a) + Number(b.value);
        // }, 10);
        total =
          [...counterInputs].reduce((a, b) => {
            return Number(a) + Number(b.value);
          }, 0) * 1000;
        totalValue.textContent = total;
      }
    })
  );
  place.addEventListener('change', function () {
    if (![...counterInputs].every((elem) => elem.value)) {
      totalValue.textContent = 0;
    } else {
      let a = total;
      totalValue.textContent = a * this.options[this.selectedIndex].value; // options & selectedIndex - властивості тега selector
    }
  });
}

export default calc;
