import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    // Should reuse the type `Todo` from `MainApp`
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    React.useEffect(
        () => {
            console.log('userSelect');
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    // Typically in a React file useState should come before useEffect because it's common to see an Effect depending on a State
    // Bad naming, can't tell what `options` is actually about, should be renamed to `users`
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            // Should use `===` instead of `==`
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        <select name="user" className={styles.user} onChange={handleChange}>
            {/* No keys here, but typically Eslint will yell at us for this */}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
