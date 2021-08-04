const form = document.querySelector("#form");
const $buttons = document.querySelectorAll(".button[type='submit']");
const $customInput = document.querySelector("#custom-input");
const $resetBtn = document.querySelector("#reset");
const $tipAmount = document.querySelector('#tip-amount')
const $totalAmount = document.querySelector('#total-amount');

$buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        $buttons.forEach((button) => {
            if (button !== btn) {
                button.classList.remove("active");
            }
        });
        console.log('click')
        btn.classList.add("active");
    });
});

$customInput.addEventListener('focus', () => {
    $buttons.forEach(btn => {
        btn.classList.remove("active");
    })
})

$resetBtn.addEventListener("click", () => {
    $tipAmount.innerHTML = '$0.00'
    $totalAmount.innerHTML = '$0.00'
    form.reset();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const bill = formData.get("bill") - 0;
    const person = formData.get("personNumber") - 0;
    const custom = formData.get("custom") - 0;

    console.log(custom)
    if(!isNaN(bill) && bill > 0 && person > 0) {
        setValues({
            bill,
            person,
            custom,
        });
    }
});

function setValues({ bill, person, custom }) {
    const percent = custom > 0
        ? custom
        : Array.prototype.find.call($buttons, (btn) =>
              btn.classList.contains("active")
          ).value - 0;

    console.log(bill, person, custom)
    const tip = tipAmount(bill - 0, percent);
    const amount = tip / 5
    const totalBill = total(bill, person, amount);


    if($tipAmount.innerHTML && $totalAmount.innerHTML) {
        $tipAmount.innerHTML = '';
        $totalAmount.innerHTML = '';
    }

    $tipAmount.innerHTML = `$${amount.toFixed(2)}`
    $totalAmount.innerHTML = `$${totalBill}`
    document.querySelector('#custom-input').value = 0;
}

function tipAmount(amount, percent) {
    const result = ((amount * percent) / 100)
    return Number(result.toFixed(2));
}

function total(bill, person, tip) {
    const result = (bill / person) + tip
    return Number(result.toFixed(2));
}
