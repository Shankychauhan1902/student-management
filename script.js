const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable');
let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

studentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const rollNumber = e.target.rollNumber.value;
    const name = e.target.name.value;
    const age = e.target.age.value;
    const enrollYear = e.target.enrollYear.value;
    const course = e.target.course.value;
    const fees = e.target.fees.value;

    if (editIndex !== null) {
        students[editIndex] = { rollNumber, name, age, enrollYear, course, fees };
        editIndex = null;
    } else {
        students.push({ rollNumber, name, age, enrollYear, course, fees });
    }

    e.target.reset();
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
});

function renderStudents() {
    studentTable.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');

        const rollCell = document.createElement('td');
        rollCell.textContent = student.rollNumber;

        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;

        const ageCell = document.createElement('td');
        ageCell.textContent = student.age;

        const enrollYearCell = document.createElement('td');
        enrollYearCell.textContent = student.enrollYear;

        const courseCell = document.createElement('td');
        courseCell.textContent = student.course;

        const feesCell = document.createElement('td');
        feesCell.textContent = student.fees;

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editStudent(index);
        };
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteStudent(index);
        };
        actionCell.append(editButton, deleteButton);

        row.append(rollCell, nameCell, ageCell, enrollYearCell, courseCell, feesCell, actionCell);
        studentTable.append(row);
    });
}

function editStudent(index) {
    const student = students[index];
    studentForm.rollNumber.value = student.rollNumber;
    studentForm.name.value = student.name;
    studentForm.age.value = student.age;
    studentForm.enrollYear.value = student.enrollYear;
    studentForm.course.value = student.course;
    studentForm.fees.value = student.fees;
    editIndex = index;
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderStudents();
}

renderStudents();
