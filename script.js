// localStorage.clear
let diceRes = document.getElementById('dice-result');
let ita = document.querySelector('#ita')
let itaSave = localStorage.getItem('ITA');
if (itaSave == 'true') {

    ita.checked = true;
}
else {
    ita.checked = false;
}

ita.addEventListener("input", () => {
    localStorage.setItem('ITA', ita.checked);
    location.reload();
});

document.getElementById('add-instance').addEventListener('click', addInstance);



let init = localStorage.getItem('Iniziativa');

if (init) {
    diceRes.innerText = init
    diceRes.classList.add("border", "rounded", "bg-danger", "p-2");
}

let numIstanceSaved = localStorage.getItem('InstanceIndex') || 0;
document.querySelector('#numMostri').innerHTML = numIstanceSaved
instanceIndex = 0;
for (let i = 0; i < numIstanceSaved; i++) {
    addInstance();
}

function addInstance() {
    instanceIndex++;
    localStorage.setItem('InstanceIndex', instanceIndex);
    let numIstanceSaved = localStorage.getItem('InstanceIndex') || 0;
    document.querySelector('#numMostri').innerHTML = numIstanceSaved

    let instanceHTML = `
    

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Cancellazione</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Sei sicuro di Voler cancellare la Card Mostro?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onclick="removeInstance(${instanceIndex})" class="btn btn-danger">Cancella</button>
      </div>
    </div>
  </div>
</div>
    <div class="col-12 col-lg-4" id="instance-${instanceIndex}">
        <form id="monster-form-${instanceIndex}" class="mt-5 border border-black rounded p-lg-3">
            <div class="d-flex justify-content-end mb-3 ms-auto">
            <input type="text" class="form-control me-auto" style="width: 75%;" name="" id="mosterName-${instanceIndex}">
            <!-- Button trigger modal -->

                <button type="button" class="btn btn-outline-danger"data-bs-toggle="modal" data-bs-target="#staticBackdrop">X</button>
            </div>
            <div class="mb-3">
                <label for="monster-select-ca-${instanceIndex}" class="form-label">Scegli un mostro (CA):</label>
                <select id="monster-select-ca-${instanceIndex}" class="form-select"></select>
            </div>
            <div class="d-block">
                <label for="monster-number-${instanceIndex}" class="form-label">Colpo:</label>
            </div>
            <div class="input-group mb-3">
                <button id="btnClearHit-${instanceIndex}" class="btn btn-outline-secondary" type="button" onclick="clearHit(${instanceIndex})">X</button>
                <input type="number" id="monster-number-${instanceIndex}" class="form-control" min="1" max="40" placeholder="1">
            </div>
            <div class="mb-3">
                <button type="button" id="btnIsHit-${instanceIndex}" class="btn btn-primary w-100" onclick="checkMonsterCA(${instanceIndex})">Colpisce?</button>
                <p id="result-ca-${instanceIndex}" class="mt-2 text-center"></p>
            </div>
            <div class="d-block">
                <label for="total-damage-${instanceIndex}" class="form-label">Danno Totale:</label>
            </div>
            <div class="input-group mb-3">
                <button id="btnClearDamage-${instanceIndex}" class="btn btn-outline-secondary" type="button" onclick="clearDamage(${instanceIndex})">X</button>
                <input type="number" id="total-damage-${instanceIndex}" class="form-control" min="0" placeholder="0">
                <button id="sommaDanno-${instanceIndex}" class="btn btn-outline-secondary" type="button" onclick="somma(${instanceIndex})">+</button>
                <input type="number" id="nuovoDanno-${instanceIndex}" class="form-control" min="0" placeholder="0">
            </div>
            <div class="mb-3">
                <button type="button" id="btnIsDead-${instanceIndex}" class="btn btn-primary w-100" onclick="checkMonsterPF(${instanceIndex})">E' Morto?</button>
                <p id="result-pf-${instanceIndex}" class="mt-2 text-center"></p>
            </div>
        </form>
    </div>`;

    document.getElementById('instances-container').insertAdjacentHTML('beforeend', instanceHTML);
    initializeInstance(instanceIndex);



}

function initializeInstance(index) {
    let selected = document.getElementById(`monster-select-ca-${index}`);
    let totalDamage = document.getElementById(`total-damage-${index}`);
    let monsterNumber = document.getElementById(`monster-number-${index}`);
    let sommaDanno = document.getElementById(`nuovoDanno-${index}`);
    let mosterName = document.querySelector(`#mosterName-${index}`);




    totalDamage.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector("#btnIsDead-" + index).click();
        }
    });

    monsterNumber.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector("#btnIsHit-" + index).click();
        }
    });
    sommaDanno.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            if (sommaDanno.value) {
                event.preventDefault();
                document.querySelector("#sommaDanno-" + index).click();
            }
            else {
                event.preventDefault();
                document.querySelector("#btnIsDead-" + index).click();
            }

        }
    });

    totalDamage.addEventListener("keydown", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Delete") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector("#btnClearDamage-" + index).click();
        }
    });

    monsterNumber.addEventListener("keydown", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Delete") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.querySelector("#btnClearHit-" + index).click();
        }
    });

    selected.addEventListener("input", () => {
        localStorage.setItem(`Index-${index}`, selected.selectedIndex);
        let stringanome = mosterName.value
        let stringaArray = stringanome.split(" ")
        let num = stringaArray[stringaArray.length - 1];
        let nome = selected.options[selected.selectedIndex].text;
        // Ottiene il testo dell'opzione selezionata
        nome = tagliaStringa(nome)
        mosterName.value = nome + " " + num
        localStorage.setItem(`Nome-${index}`, mosterName.value)




    });

    totalDamage.addEventListener("input", () => {
        localStorage.setItem(`Danni-${index}`, totalDamage.value);

    });


    nome = localStorage.getItem(`Nome-${index}`)
    if (nome) { mosterName.value = nome }
    else {
        mosterName.value = `Mostro ${index}`

    }
    localStorage.setItem(`Nome-${index}`, mosterName.value)

    mosterName.addEventListener("input", () => {
        localStorage.setItem(`Nome-${index}`, mosterName.value)
    })

    let Danni = localStorage.getItem(`Danni-${index}`);
    if (Danni != 0) { totalDamage.value = Danni; }

    fetch('monster2.json')
        .then(response => response.json())
        .then(data => {
            let itaSave = localStorage.getItem(`ITA`);
            if (itaSave == 'true') {
                data.sort((a, b) => a['ITA'].localeCompare(b['ITA']));
            } else {
                data.sort((a, b) => a['mostro'].localeCompare(b['mostro']));
            }

            data.forEach((monster, idx) => {
                const optionCA = document.createElement('option');
                optionCA.value = monster['Classe Armatura (CA)'];
                optionCA.textContent = itaSave == 'true' ? monster.ITA : monster.mostro;
                optionCA.setAttribute("PF", monster['Punti Ferita (PF)']);
                optionCA.setAttribute("PE", monster.PE);
                optionCA.setAttribute("CR", monster["Grado Sfida (CR)"]);
                selected.appendChild(optionCA);
            });

            let selectedIndex = localStorage.getItem(`Index-${index}`);
            selected.selectedIndex = selectedIndex;
        });


}

function removeInstance(index) {
    document.getElementById(`instance-${index}`).remove();
    localStorage.removeItem(`Index-${index}`);
    localStorage.removeItem(`Danni-${index}`);
    localStorage.removeItem(`ITA-${index}`);
    localStorage.removeItem(`Nome-${index}`);
    instanceIndex--
    localStorage.setItem("InstanceIndex", instanceIndex)
    let i = index + 1

    while (localStorage.getItem(`Nome-${i}`)) {
        console.log('eccomi' + i);
        localStorage.setItem(`Index-${i - 1}`, localStorage.getItem(`Index-${i}`));
        localStorage.removeItem(`Index-${i}`)
        localStorage.setItem(`Danni-${i - 1}`, localStorage.getItem(`Danni-${i}`));
        localStorage.removeItem(`Danni-${i}`)
        localStorage.setItem(`Nome-${i - 1}`, localStorage.getItem(`Nome-${i}`));
        localStorage.removeItem(`Nome-${i}`)
        i++
    }
    location.reload();
}

function checkMonsterCA(index) {
    let monsterNumber = document.getElementById(`monster-number-${index}`).value;
    if (monsterNumber) {
        let selectedValue = parseInt(document.getElementById(`monster-select-ca-${index}`).value);
        let number = parseInt(monsterNumber);
        let monsterCa = document.getElementById(`result-ca-${index}`);
        document.getElementById(`monster-number-${index}`).value = '';

        if (number >= selectedValue) {
            monsterCa.innerText = 'Colpito';
            monsterCa.classList.remove("bg-danger");
            monsterCa.classList.add("border", "rounded", "bg-success", "p-2");
        } else {
            monsterCa.innerText = 'Mancato';
            monsterCa.classList.remove("bg-success");
            monsterCa.classList.add("border", "rounded", "bg-danger", "p-2");
        }
    }
}

function checkMonsterPF(index) {
    let totalDamage = parseInt(document.getElementById(`total-damage-${index}`).value);
    if (totalDamage) {
        let selectedOption = document.getElementById(`monster-select-ca-${index}`).options[document.getElementById(`monster-select-ca-${index}`).selectedIndex];
        let extraInfoPF = selectedOption.getAttribute("PF");
        let monsterPf = document.getElementById(`result-pf-${index}`);

        if (totalDamage < extraInfoPF) {
            monsterPf.innerText = 'Vivo';
            monsterPf.classList.remove("bg-danger");
            monsterPf.classList.add("border", "rounded", "bg-success", "p-2");
        } else {
            monsterPf.innerText = `Morto ${selectedOption.getAttribute("PE")} PE`;
            monsterPf.classList.remove("bg-success");
            monsterPf.classList.add("border", "rounded", "bg-danger", "p-2");
        }
    }
}

function somma(index) {
    let sommaDanno = parseInt(document.getElementById(`nuovoDanno-${index}`).value);
    if (sommaDanno) {
        let dannoTotale = parseInt(document.getElementById(`total-damage-${index}`).value) || 0;
        document.getElementById(`total-damage-${index}`).value = dannoTotale + sommaDanno;
        document.getElementById(`nuovoDanno-${index}`).value = '';
        localStorage.setItem(`Danni-${index}`, document.getElementById(`total-damage-${index}`).value);
    }
}

function clearDamage(index) {
    localStorage.setItem(`Danni-${index}`, 0);
    document.getElementById(`total-damage-${index}`).value = '';
}

function clearHit(index) {
    document.getElementById(`monster-number-${index}`).value = '';
}

function dice() {
    const result = Math.floor(Math.random() * 20) + 1;
    diceRes.innerText = result;
    diceRes.classList.add("border", "rounded", "bg-danger", "p-2");
    localStorage.setItem('Iniziativa', diceRes.innerText);

}

function tagliaStringa(input) {
    // Trova l'indice della prima parentesi aperta
    const indiceParentesi = input.indexOf('(');

    // Se non trova la parentesi aperta, restituisce l'intera stringa
    if (indiceParentesi === -1) {
        return input;
    }

    // Restituisce la sottostringa prima della parentesi aperta
    return input.substring(0, indiceParentesi).trim();
}


localStorage.clear