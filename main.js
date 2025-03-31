document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();

    document.getElementById('studentForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('studentId').value;
        const student = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            course: document.getElementById('course').value,
        };
        if (id) {
            updateStudent(id, student);
        } else {
            addStudent(student);
        }
    });
});

function fetchStudents() {
    fetch('http://localhost:5000/students')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#studentTable tbody');
            tbody.innerHTML = '';
            data.forEach(student => {
                tbody.innerHTML += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                        <td>${student.age}</td>
                        <td>${student.course}</td>
                        <td>
                            <button onclick="editStudent(${student.id}, '${student.name}', '${student.email}', ${student.age}, '${student.course}')">Edit</button>
                            <button onclick="deleteStudent(${student.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function addStudent(student) {
    fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    }).then(() => fetchStudents());
}

function updateStudent(id, student) {
    fetch(`http://localhost:5000/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    }).then(() => fetchStudents());
}

function deleteStudent(id) {
    fetch(`http://localhost:5000/students/${id}`, {
        method: 'DELETE',
    }).then(() => fetchStudents());
}

function editStudent(id, name, email, age, course) {
    document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('age').value = age;
    document.getElementById('course').value = course;
}
