let addButton = document.getElementById('add');
addButton.addEventListener("click", addButtonOnClick);

let submitButton = document.getElementById('submit');
submitButton.addEventListener("click", submitButtonOnClick);


function addButtonOnClick() {
    let template = document.getElementById('template');
    let templateCopy = template.cloneNode(true);
    templateCopy.id = '';
    let button = document.getElementById('add');
    let form = document.getElementById('form');
    form.insertBefore(templateCopy, button);
    templateCopy.style.display = 'block';
}

function submitButtonOnClick() {
    let people = getPeople();
    let driversList = makeDriversList(people);
    let html = generateHtml(driversList);
    setInnerHtml(html);

}

function getPeople() {
    let people = []
    let form = document.getElementById('form');
    for (let child of form.childNodes) {
        if (child.tagName === 'DIV') {
            let person = {}
            let bNameProvided = false;
            for (let childChild of child.childNodes) {
                if (childChild?.name === 'name' && childChild.value != '') {
                    person.name = childChild.value;
                    bNameProvided = true
                }
                if (childChild?.name === 'driver') {
                    person.driver = childChild.checked;
                }
            }
            if (bNameProvided) {
                people.push(person);
            }
            bNameProvided = false
        }
    }
    return people;
}

function makeDriversList(people) {
    let drivers = getDrivers(people);
    let riders = getRiders(people);
    validate(drivers, riders);
    let driversList = generateList(drivers, riders);
    return driversList
}

function getDrivers(people) {
    let drivers = [];
    for (person of people) {
        if (person.driver) {
            drivers.push(person.name);
        }
    }
    return drivers
}

function getRiders(people) {
    let riders = [];
    for (person of people)
        if (!person.driver) {
            riders.push(person.name);
        }
    return riders;
}


function generateList(drivers, riders) {
    drivers = shuffleArray(drivers);
    riders = shuffleArray(riders);
    let driversList = [];
    for (driver of drivers) {
        let driverObj = {};
        driverObj.name = driver;
        driverObj.riders = [];
        driversList.push(driverObj);
    }
    while (riders.length > 0) {
        for (driver of driversList) {
            let randIndex = Math.floor(Math.random() * riders.length);
            if (riders[randIndex]) {
                driver.riders.push(riders[randIndex]);
            }
            riders.splice(randIndex, 1);
        }
    }
    return driversList;
}

function generateHtml(driversList) {
    let html = '';
    html += '<div>'
    for (driver of driversList) {
        html += `<h2>${driver.name}</h2>`;
        html += '<ul>';
        for (rider of driver.riders) {
            html += `<li>${rider}</li>`
        }
        html += '</ul>';
        html += '</div>';
    }
    return html;
}

function setInnerHtml(html) {
    let driverList = document.getElementById('driversList');
    driverList.innerHTML = html;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function validate(drivers, riders) {
    if (drivers.length > riders.length) {
        alert("Cannot have more drivers than riders!");
    }
}