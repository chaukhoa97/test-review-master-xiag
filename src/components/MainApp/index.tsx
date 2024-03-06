import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';

// List items should always have an unique id. This can be created by many ways like using `uuid` or current timestamp
// Without an unique id, we lose the best attribute for `key` in React, and also make our job harder if we want to do something with a specific item in the list
type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    // Should be `changeTodos` (plural) to align with the parameter and action type
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};

// From the name `Index` we can't know what this does, should be renamed to something more descriptive like `MainApp`
class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    // Should reuse the type `Todo` above
    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;
        // `allTodosIsDone` can be calculated from `this.props.todos` and doesn't need to be a global variable. Even in a more complex case, it should be a part of the state of the component or a part of the Redux store, global variables should be avoided.
        // The logic to compute `allTodosIsDone` can also be much more simple by using the `every` method
        window.allTodosIsDone = true;

        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {/* No keys here, but typically Eslint will yell at us for this */}
                {this.props.todos.map((t, idx) => (
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            // Every time a checkbox is clicked, a whole new array of todos is created and dispatched to the store. This is not efficient, and can cause performance issues if the list is long. 
                            // A better approach is to have a new action for changing a specific todo when its checkbox is clicked. This is one of the examples of why we should have an unique id for each list item
                            const changedTodos = this.props.todos.map((t, index) => {
                                const res = { ...t }
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        // Should reuse the type `Todo` above
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        // Wrong typo for the action type, should be `REMOVE_TODO`
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
