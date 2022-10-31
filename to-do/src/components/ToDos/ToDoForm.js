import React, { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { todoSchema } from '../../utilities/validationSchema'
import axios from 'axios'//we need axios here to getCategories() for a dropdown list.

export default function ToDoForm(props) {

    //We need to get categories from the API to populate a dropdown list in our form
    const [categories, setCategories] = useState([]);

    const [todos, setTodos] = useState([]);

    const getCategories = () => {
        axios.get(`https://localhost:7111/api/Categories`).then(response => setCategories(response.data))
    }

    const getToDos = () => {
        axios.get(`https://localhost:7111/api/ToDos`).then(response => setTodos(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        //Below is the create portion of handleSubmit()
        if(!props.todo) {
            const todoToCreate = values

            axios.post(`https://localhost:7111/api/ToDos`, todoToCreate).then(() => {
                props.getToDos()//updates resources from the API
                props.setShowCreate(false)//close the create form
            })
        }
        //below is the edit portion of handleSubmit()
        else {
            const todoToEdit = {
                toDoId: props.todo.toDoId,
                name: values.name,
                url: values.url,
                linkText: values.linkText,
                description: values.description,
                categoryId: values.categoryId
            }

            axios.put(`https://localhost:7111/api/ToDos/${props.todo.toDoId}`, todoToEdit).then(() => {
                props.getToDos()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        getToDos()
    }, []);

  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',
            done: props.todo ? props.todo.done : '',
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={todoSchema}
        onSubmit={(values) => handleSubmit(values)}
        >
            {/* start with the structure below and place your form in the empty parens
                {({errors, touched}) => ()}
            */}
            {({errors, touched}) => (
                <Form id='todoForm'>
                    <div className='form-group m-3'>
                        <Field name='name' className='form-control' placeholder='Name' />
                    {errors.name && touched.name ? (
                        <div className='text-danger'>{errors.name}</div>
                        ) : null}
                    </div>
                    {/* <div className='form-group m-3'>
                        <Field as='select' name='done' className='form-control' />
                        <input value='' disabled>[--Please Choose--]</input>
                        {todos.every(todo =>
                            <option key={todo.toDoId} value={todo.done}>
                                {todo.done}
                            </option>
                            )}
                    </div> */}
                    <div className='form-group m-3'>
                        <Field as='checkbox' name='done'>
                            <p>
                            <input type='checkbox' name='done' key={todos.toDoId} defaultChecked={todos.done} disabled={todos.done}>
                                {todos.name}
                            </input>
                                  Done
                            </p>
                        </Field>
                    </div>
                    <div className='form-group m-3'>
                        <Field as='select' name='categoryId' className='form-control'>
                            <option value='' disabled>[--Please Choose--]</option>
                            {/* Below we will map an option for every category in the API */}
                            {categories.map(cat =>
                                <option key={cat.categoryId} value={cat.categoryId}>
                                    {cat.catName}
                                </option>
                            )}
                        </Field>
                    </div>
                    <div className='form-group m-3'>
                        <button type='submit' className='btn btn-info m-3'>Submit ToDo to API</button>
                    </div>
                </Form>
            )}
        </Formik>
  )
}
