import {useState} from 'react'

import style from './components/Todo.module.css'

export default function App() {

      const [studentName, setStudentName] = useState('');
      const [students, setStudents] = useState([]);
      const [editMode, setEditMode] = useState(false);
      const [editablestudent, setEditableStudent] = useState(null);



      const createStudentHandler = () => {
        if (studentName) {
          const newStudent = {
            id: Date.now(),
            name: studentName,
          }
          setStudents([...students, newStudent])
          setStudentName("")
        } else {
          alert('please enter a valid name');
        }
      }

      const editStudentHandler = (id) => {
        const toBeEditedStudent = students.find(item => item.id === id);
        setEditMode(true);
        setStudentName(toBeEditedStudent.name);
        setEditableStudent(toBeEditedStudent);
      }

      const deleteStudentHandler = (id) => {
        setStudents(students.filter(item => item.id !== id));
        // const newList = students.filter(item => item.id !== id);
        // setStudents(newList);
      }
      
      const updateStudentHandler = () => {
        setStudents(students.map((student) => {
          if (student.id === editablestudent.id) {
            student.name = studentName;
          }
          return student;
        }))
        setEditMode(false);
        setStudentName("");
        setEditableStudent(null);
      }

      const presentHandler = (id) => {
        const student = students.find(item => item.id === id);
        if (student.isPresent === true) {
          alert("the student is a already present student");
        } else if (student.isPresent === false) {
          alert ("The student is a already absent student");
        } else if (student.isPresent === undefined) {
          setStudents(students.map((item) => {
            if (item.id === student.id) {
              item.isPresent = true;
            }
             return item
          }))
        }
      }

      const absentHandler = (id) => {
        const student = students.find(item => item.id === id);
        if (student.isPresent === true) {
          alert("the student is a already present student");
        } else if (student.isPresent === false) {
          alert ("The student is a already absent student");
        } else if (student.isPresent === undefined) {
          setStudents(students.map((item) => {
            if (item.id === student.id) {
              item.isPresent = false;
            }
             return item
          }))
        }
      }

      const toggleHandler = (id) => {
        const student = students.find(item => item.id === id);
        setStudents(students.map((item) => {
          if (item.id === student.id) {
            item.isPresent = !item.isPresent;
          }

          return item
        }))
      }

  return (
    <div>
      <form className={style.form_todo} onSubmit={(e) => {
        e.preventDefault();
        editMode ? updateStudentHandler() : createStudentHandler()
      }}>
      <input className={style.form_input} type="text" 
      placeholder='Enter a valid name'
      value={studentName}
      onChange={(event) => {setStudentName(event.target.value)}}
       />
      <button className={style.form_btn}>
        {editMode ? "Update Student" : "Add Student"}
      </button>
      </form>
    {/* all students */}
      <div id={style.all_student} className="students-section">
      <div id={style.single_student} className="all-students">
        <ul>
        {students.map(student => (
          <li>
            <span><h4>{student.name}</h4></span>
            <button className={style.boxbtn} onClick={() => {editStudentHandler(student.id)}}>Edit</button>
            <button className={style.boxbtn} onClick={() => {deleteStudentHandler(student.id)}}>Delete</button>
            <button className={style.boxbtn} onClick={() => {presentHandler(student.id)}}>Present</button>
            <button className={style.boxbtn} onClick={() => {absentHandler(student.id)}}>Absent</button>
          </li>
        ))}
        </ul>
      </div>
      <div id={style.single_student} className="present-students">
        <ul>
          {students.filter(item => item.isPresent === true).map(student => (
            <li>
              <span><h4>{student.name}</h4></span>
              <button className={style.boxbtn} onClick={() => {toggleHandler(student.id)}}>Accidentally Added</button>
            </li>
          ))}
        </ul>
      </div>
      <div id={style.single_student} className="adsent-students">
        <ul>
          {students.filter(item => item.isPresent === false).map(student => (
            <li>
              <span><h4>{student.name}</h4></span>
              <button className={style.boxbtn} onClick={() => {toggleHandler(student.id)}}>Accidentally Added</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}
