let selected = document.getElementById('monster-select-ca');
let totalDamage = document.querySelector('#total-damage')
let monsterNumber = document.querySelector('#monster-number')
let diceRes = document.getElementById('dice-result');
let ita = document.querySelector('#ita');
let itaSave = localStorage.getItem('ITA');
if (itaSave == 'true') {

    ita.checked = true;
}
else {
    ita.checked = false;
}
let Danni = localStorage.getItem('Danni');
if (Danni != 0) { totalDamage.value = Danni; }
let init = localStorage.getItem('Iniziativa');

if (init) {
    diceRes.innerText = init
    diceRes.classList.add("border", "rounded", "bg-danger", "p-2");
}


fetch('monster2.json')
    .then(response => response.json())
    .then(data => {
        let itaSave = localStorage.getItem('ITA');
        if (itaSave == 'true') {


            data.sort((a, b) => a['ITA'].localeCompare(b['ITA']));
            const selectCA = document.getElementById('monster-select-ca');
            data.forEach(monster => {
                const optionCA = document.createElement('option');
                optionCA.value = monster['Classe Armatura (CA)'];
                optionCA.textContent = monster.ITA;
                optionCA.setAttribute("PF", monster['Punti Ferita (PF)']);
                selectCA.appendChild(optionCA);

            });
        }
        else {

            data.sort((a, b) => a['mostro'].localeCompare(b['mostro']));
            const selectCA = document.getElementById('monster-select-ca');
            data.forEach(monster => {
                const optionCA = document.createElement('option');
                optionCA.value = monster['Classe Armatura (CA)'];
                optionCA.textContent = monster.mostro;
                optionCA.setAttribute("PF", monster['Punti Ferita (PF)']);
                selectCA.appendChild(optionCA);

            });
        }
        let index = localStorage.getItem('Index');
        selected.selectedIndex = index

    });

function checkMonsterCA() {
    if (monsterNumber.value) {

        let selectedValue = parseInt(selected.value);
        let number = parseInt(document.getElementById('monster-number').value);
        let monsterCa = document.getElementById('result-ca');
        monsterNumber.value="";



        if (number >= selectedValue) {
            monsterCa.innerText = 'Colpito';
            monsterCa.classList.remove("bg-danger");
            monsterCa.classList.add("border", "rounded", "bg-success", "p-2");

        }
        else {

            monsterCa.innerText = 'Mancato';
            monsterCa.classList.remove("bg-success");
            monsterCa.classList.add("border", "rounded", "bg-danger", "p-2");

        }
    }
}

function checkMonsterPF() {
    if (totalDamage.value) {

        let selectedOption = selected.options[selected.selectedIndex];
        let extraInfoPF = selectedOption.getAttribute("PF");


        let totalDamage = parseInt(document.getElementById('total-damage').value);

        let monsterPf = document.getElementById('result-pf');
        if (totalDamage < extraInfoPF) {
            monsterPf.innerText = 'Vivo';
            monsterPf.classList.remove("bg-danger");
            monsterPf.classList.add("border", "rounded", "bg-success", "p-2");


        }
        else {

            monsterPf.innerText = 'Morto';
            monsterPf.classList.remove("bg-success");
            monsterPf.classList.add("border", "rounded", "bg-danger", "p-2");
        }
    }





}

function dice() {
    const result = Math.floor(Math.random() * 20) + 1;
    diceRes.innerText = result;
    diceRes.classList.add("border", "rounded", "bg-danger", "p-2");
    localStorage.setItem('Iniziativa', diceRes.innerText);

}
function somma() {

    let sommaDanno = document.querySelector('#nuovoDanno')
    if (sommaDanno.value) {

        let dannoTotale = parseInt(totalDamage.value);
        nuovoDanno = parseInt(sommaDanno.value);

        if (isNaN(dannoTotale)) {
            totalDamage.value = nuovoDanno;
        }
        else {

            totalDamage.value = dannoTotale + nuovoDanno;
        }
        sommaDanno.value = '';
        localStorage.setItem('Danni', totalDamage.value);
    }
}

function clearDamage() {

    localStorage.setItem('Danni', 0);
    totalDamage.value = ''

}
function clearHit() {
    monsterNumber.value = ''
}

selected.addEventListener("input", () => {

    localStorage.setItem('Index', selected.selectedIndex);


})

totalDamage.addEventListener("input", () => {

    localStorage.setItem('Danni', totalDamage.value);


})

ita.addEventListener("input", () => {

    localStorage.setItem('ITA', ita.checked);

    location.reload();



})

totalDamage.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector("#btnIsDead").click();
    }
});

monsterNumber.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector("#btnIsHit").click();
    }
});

totalDamage.addEventListener("keydown", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Delete") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector("#btnClearDamage").click();
    }
});

monsterNumber.addEventListener("keydown", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Delete") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.querySelector("#btnClearHit").click();
    }
});