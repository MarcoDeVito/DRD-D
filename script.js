let selected = document.getElementById('monster-select-ca');
totalDamage = document.querySelector('#total-damage')
monsterNumber = document.querySelector('#monster-number')
let diceRes = document.getElementById('dice-result');

fetch('monster2.json')
    .then(response => response.json())
    .then(data => {
        data.sort((a, b) => a['mostro'].localeCompare(b['mostro']));
        const selectCA = document.getElementById('monster-select-ca');


        data.forEach(monster => {
            const optionCA = document.createElement('option');
            optionCA.value = monster['Classe Armatura (CA)'];
            optionCA.textContent = monster.mostro;
            optionCA.setAttribute("PF", monster['Punti Ferita (PF)']);
            selectCA.appendChild(optionCA);

        });
        let index = localStorage.getItem('Index');
        let Danni = localStorage.getItem('Danni');
        selected.selectedIndex = index
        if (Danni != 0) { totalDamage.value = Danni; }
        let init=localStorage.getItem('Iniziativa');
        console.log(init);
        if (init) {
            diceRes.innerText=init
            diceRes.classList.add("border", "rounded", "bg-danger", "p-2");
        }
    });

function checkMonsterCA() {

    let selectedValue = parseInt(selected.value);
    let number = parseInt(document.getElementById('monster-number').value);
    let monsterCa = document.getElementById('result-ca');
    let selectedOption = selected.options[selected.selectedIndex];
    let extraInfoPF = selectedOption.getAttribute("PF");

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

function checkMonsterPF() {



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

function dice() {
    const result = Math.floor(Math.random() * 20) + 1;
    diceRes.innerText = result;
    diceRes.classList.add("border", "rounded", "bg-danger", "p-2");
    localStorage.setItem('Iniziativa', diceRes.innerText);

}
function somma() {
    totalDamage = document.querySelector('#total-damage')
    sommaDanno = document.querySelector('#nuovoDanno')
    dannoTotale = parseInt(totalDamage.value);
    nuovoDanno = parseInt(sommaDanno.value);
    console.log(nuovoDanno);
    totalDamage.value = dannoTotale + nuovoDanno;
    sommaDanno.value = 0;
    localStorage.setItem('Danni', totalDamage.value);
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

