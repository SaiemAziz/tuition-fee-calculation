
// load from local storage at first entry 
const allStudentsList = [
    { name: 'Sahil', honorariam: 4000, address: 'North Chowdhury Bari'},
    { name: 'Isti', honorariam: 4000, address: 'South Chowdhury Bari'},
    { name: 'Shihab', honorariam: 4000, address: 'South Chowdhury Bari'},
    { name: 'Saima', honorariam: 2000, address: 'North Chowdhury Bari'},
]
const moneyPerMonth = {
     January: 0,
     February: 0,
     March: 0,
     April: 0,
     May: 0,
     June: 0,
     July: 0,
     August: 0,
     September: 0,
     October: 0,
     November: 0,
     December: 0,
}
if(!localStorage.getItem('students'))
    localStorage.setItem('students', JSON.stringify(allStudentsList));
if(!localStorage.getItem('months'))
    localStorage.setItem('months', JSON.stringify(moneyPerMonth));
let students;


// showing students as cards and list names 
let displayStudents = (month) => {
    document.getElementById('current-month').innerText = month;
    document.getElementById('current-month-money').innerText = JSON.parse(localStorage.getItem('months'))[month];
    let allStudents = document.getElementById('students-div');
    allStudents.innerHTML = ``;
    document.getElementById('due-names').innerHTML = ``;
    document.getElementById('due-headline').innerText = 'All Paid';
    document.getElementById('due').classList.remove('bg-amber-900');
    document.getElementById('due').classList.add('bg-blue-900');
    if(localStorage.getItem(`${month}`))
        students = localStorage.getItem(`${month}`);
    else
        students = localStorage.getItem(`students`);
    students = JSON.parse(students);

    // every students card 
    students.forEach(student => {
        let studentBlock = document.createElement('div');
        studentBlock.classList.add('p-5');
        studentBlock.classList.add('rounded-3xl');
        studentBlock.setAttribute('id', `${student.name.toLowerCase()}`);
        if(student.status === `Paid`)
        {
            studentBlock.classList.add('bg-green-900');
            studentBlock.innerHTML = `
                        <p class="text-3xl mb-5 text-center">${student.name}</p>
                        <p class="text-1xl mb-3 text-center text-green-200">Payment: ${student.honorariam} Taka</p>
                        <p class="text-2xl text-center">Status: <span id="${student.name.toLowerCase()}-status">Paid</span></p>
            `;
        }
        else
        {
            document.getElementById('due-headline').innerText = 'Due Names';
            document.getElementById('due').classList.add('bg-amber-900');
            document.getElementById('due').classList.remove('bg-blue-900');
            let li = document.createElement('li');
            let listSize = document.getElementById('due-names').childNodes.length;
            li.innerText = `${listSize+1}. ${student.name}`;
            li.classList.add('text-2xl');
            li.classList.add('text-center');
            li.classList.add('mt-5');
            // <li class="text-2xl text-center">Sahil</li>
            document.getElementById('due-names').appendChild(li);
            studentBlock.classList.add('bg-[#81433de8]');
            studentBlock.innerHTML = `
                        <p class="text-3xl mb-5 text-center">${student.name}</p>
                        <p class="text-1xl mb-3 text-center text-amber-300">Payment: ${student.honorariam} Taka</p>
                        <p class="text-2xl text-center">Status: <span id="${student.name.toLowerCase()}-status">Due</span></p>
                        <div class="w-max mx-auto mt-5" id="${student.name.toLowerCase()}-paid">
                            <button class="bg-green-200 text-green-800 font-bold py-2 hover:scale-125 hover:transition-transform px-10 rounded-lg" onclick="studentPaid('${student.name.toLowerCase()}', '${month}')">Paid</button>
                        </div>
            `;
        }
        allStudents.appendChild(studentBlock);

        // if none pays 
        if(document.getElementById('due-names').childNodes.length === 4)
        {
            document.getElementById('due-names').innerHTML = ``;
            document.getElementById('due-headline').innerText = 'None Paid';
            document.getElementById('due').classList.remove('bg-amber-900');
            document.getElementById('due').classList.add('bg-red-900');
        }
    })

    localStorage.setItem(`${month}`, JSON.stringify(students));
}

// if someone pays 
let studentPaid = (studentName, month) => {
    let surity = confirm(`Are you sure ${studentName} paid`);
    if(surity)
    {
        students = localStorage.getItem(`${month}`);
        students = JSON.parse(students);
        let monthList = localStorage.getItem('months');
        monthList = JSON.parse(monthList);
        students.forEach(student => {
            if(student.name.toLowerCase() === studentName.toLowerCase()){
                student.status = 'Paid';
                monthList[month] = monthList[month] + student.honorariam;
            }
        });
        localStorage.setItem(`${month}`, JSON.stringify(students));
        localStorage.setItem(`months`, JSON.stringify(monthList));
        displayStudents(month);
    }
}

// clear all history
let clearHistory = () => {
    let surity = confirm('Are you sure to delete All history?')
    if(surity)
    {
        localStorage.clear();
        location.href = 'index.html';
    }
}

// clear current month history
let clearHistoryMonth = () => {
    let month = document.getElementById('current-month').innerText;
    let surity = confirm(`Are you sure to delete ${month}'s history?`)
    if(surity)
    {
        localStorage.removeItem(month);
        let monthList = localStorage.getItem('months');
        monthList = JSON.parse(monthList);
        monthList[month] = 0;
        // console.log(monthList);
        localStorage.setItem('months', JSON.stringify(monthList));
        displayStudents(month);
    }
}

// months show dynamically
let showMonths = () => {
    let monthNames = Object.keys(moneyPerMonth);
    monthNames.forEach(month => {
    let btn = document.createElement('button');
        btn.innerText = month;
        // <button class="bg-[#580000] text-center rounded-lg py-2 hover:scale-125 hover:transition-transform hover:bg-[#920000]" onclick="displayStudents(`January`)">January</button>
        btn.classList.add('bg-[#580000]');
        btn.classList.add('text-center');
        btn.classList.add('rounded-lg');
        btn.classList.add('py-2');
        btn.classList.add('hover:scale-125');
        btn.classList.add('hover:transition-transform');
        btn.classList.add('hover:bg-[#920000]');
        btn.setAttribute('onclick', `displayStudents('${month}')`)
        document.getElementById('months-div').appendChild(btn);
    });
}


// call functions at first load
let currentMonth = new Date().getMonth();
currentMonth = Object.keys(moneyPerMonth)[currentMonth];
displayStudents(currentMonth);
showMonths();

