import React, {useState} from 'react'

import { useAuth } from '../../contexts/AuthContext'
import {FaTrashAlt, FaEdit} from 'react-icons/fa'
import axios from 'axios'
import ToDoEdit from './ToDoEdit'

export default function SingleToDo(props) {

  const {currentUser} = useAuth()

  const [showEdit, setShowEdit] = useState(false);

  const deleteToDo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)) {
      axios.delete(`https://localhost:7111/api/ToDos/${id}`).then(() => {props.getToDos()})
    }
  }

  return (
    <div className='singleToDo col-md-5 m-4'>

{currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
        <div>
          <button id='editLink' onClick={() => setShowEdit(true)}>
            <FaEdit />
          </button>
          <button  id='deleteLink' className='m-1 rounded' onClick={() => deleteToDo(props.todo.toDoId)}>
            <FaTrashAlt />
          </button>
          {showEdit &&
            <ToDoEdit
            todo={props.todo}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            getToDos={props.getToDos} />
          }
        </div>
      }

        <h3>{props.todo.name}</h3>
        {props.todo.done === true ?
            <p>{props.todo.name} is not done</p> :
            <p>{props.todo.name} is done.</p>
        }
    </div>
  )
}
