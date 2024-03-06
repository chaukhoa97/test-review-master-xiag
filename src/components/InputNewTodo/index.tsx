import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    // Should reuse the type `Todo` from `MainApp`
    onSubmit: (todo: any) => void,
    
}
type InputNewTodoState = {
    value: string
}

// `NewTodoInput` sounds better and grammatical correct in my opinion, but it's not a big deal, ppl can still know what this component does
export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    // The snapshot parameter is not used and can be removed, as it is optional
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        // Currently, the state of this component only depends on the props `todoTitle`, so instead of having the state here, it should be lifted up to the parent component (MainApp)
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    handleKeyDown = (event: React.KeyboardEvent) => {
        // `keyCode` is deprecated, should be replaced with `key` or `code`
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        // There is no reason to use `var` here, use `let` or `const` instead
        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
