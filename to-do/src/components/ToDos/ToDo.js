import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import SingleToDo from './SingleToDo';
import axios from 'axios'
import FilterCat from './FilterCat';
import './ToDo.css'
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate';

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each resources to the screen (also add any supplemental UI (table and thead)...combo of Resources and SingleResource)

export default function ToDos() {
  const [todos, setToDos] = useState([]);

  const {currentUser} = useAuth()

  const [showCreate, setShowCreate] = useState(false);

  //Filtering steps - use .filter() to create a limited list of resources.
//1. Create a hook that will store values for what the user wants to filter resources by...this hook will store the categoryId for the category they want to filter by.
//2. place the conditional rendering for when filter === 0 in the initial map of resources
//3. Create FilterCat to give the buttons to the user to filter by
//4. Render in resources...see below
//5. Create the conditional rendering for when filter != 0...see below

  //below we set useState to default to 0 because there is no CategoryId of 0
  const [filter, setFilter] = useState(0);

  const getToDos = () => {
      axios.get(`https://localhost:7111/api/ToDos`).then(response => {
          console.log(response)
          setToDos(response.data)
      })
  }

  useEffect(() => {
      getToDos()
  }, []);

return (
  <section className='todos'>
      <article className='bg-info p-5'>
          <h1 className='text-center'>ToDo's Dashboard</h1>
      </article>

     {/* CREATE UI */}
     {currentUser.email === process.env.REACT_APP_EMAIL_ADMIN &&
            <div className='bg-dark p-2 mb-3 text-center'>
                <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}>
                    {!showCreate ? 'Create New ToDo' : "Close Form"}
                </button>
                <div className='createContainer'>
                    {showCreate &&
                        //Conditionally render ToDoCreate if showCreate is true
                        <ToDoCreate getToDos={getToDos} setShowCreate={setShowCreate} />
                    }
                </div>
            </div>
        }
        {/* END OF CREATE UI */}

      <FilterCat setFilter={setFilter} />
      <Container>
          <article className='todoGallery row justify-content-center'>
              {/* Below we write conditional rendering to see if the user is trying to filter
              results or not, and display the right todos accordingly. */}
              {filter === 0 ? todos.map(x =>
                  //SingleToDo will map each todo to a tile in our display. We add
                  //getToDos so we can pass GET todo functionality into SingleToDo
                  //for Edit/Delete (we added this during Edit/Delete functionality)
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />
              ) :
              todos.filter(x => x.categoryId === filter).map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDos={getToDos} />
                  )}
                  {filter !== 0 && todos.filter(x => x.categoryId === filter).length === 0 && 
                      <h2 className='alert alert-warning text-dark'>
                          There are no results for this category.
                      </h2>
                  }
          </article>
      </Container>
  </section>
)
}
