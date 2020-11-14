import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Tabs } from './Tabs.tsx';
// @ts-ignore
import { ItemList } from './ItemList.tsx';

const _useStickyState = (key, initial) => {
    const [value, setValue] = useState(() =>
        JSON.parse(localStorage.getItem(key)) || initial
    );

    return [value, newValue => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    }];
};

const renderDone = (item, done, setDone) =>
    <li 
        className={
            `
            flex
            items-center
            mb-2
            `
        }
    >
        <input 
            type="checkbox"
            className={
                `
                mr-2
                `
            }
            checked
            disabled
        />
        <button
            className={
                `
                inline-flex
                items-center
                rounded-lg
                px-1
                mr-2
                border-solid border-2 border-red-500 
                text-red-500  
                transition ease-in-out duration-300
                shadow-sm 
                hover:bg-red-500 hover:text-white hover:shadow-md
                focus:outline-none focus:shadow-outline focus:border-blue-300 focus:shadow-md
                `
            }
            onClick={
                () => {
                    setDone(done.filter(test => test != item))
                }
            }
        >
            <i 
                className={
                    `
                    material-icons
                    `
                }
            >
                delete
            </i>
        </button>
        <span>
            {item}
        </span>
    </li>;

export const App = (props) => {
    const [todo, setTodo] = _useStickyState('todo', []);
    const [done, setDone] = _useStickyState('done', []);
    const [input, setInput] = useState('');

    return (
        <main className={
            `
            w-full h-full 
            flex flex-col 
            items-center
            font-sans
            `
        }>
            <h1 
                className={
                    `
                    text-5xl lg:text-4xl
                    text-black-900
                    `
                }
            >
                Todo List
            </h1>
            <div className={
                `
                px-2
                flex
                `
            }>
                <input 
                    type="text"
                    className=
                    {
                        `
                        rounded-lg 
                        p-2
                        border-solid border-2 border-black-100 
                        transition ease-in-out duration-300
                        shadow-sm
                        hover:border-blue-500 hover:shadow-md
                        focus:outline-none focus:shadow-outline focus:border-blue-300 focus:shadow-md
                        `
                    }
                    value={input}
                    onChange={
                        ({ target: { value }}) => setInput(value)
                    }
                />
                <button
                    className={
                        `
                        inline-flex
                        items-center
                        rounded-lg
                        p-2
                        ml-2
                        border-solid border-2 border-blue-500 
                        text-blue-500  
                        transition ease-in-out duration-300
                        shadow-sm 
                        hover:bg-blue-500 hover:text-white hover:shadow-md
                        focus:outline-none focus:shadow-outline focus:border-blue-300 focus:shadow-md
                        `
                    }
                    onClick={
                        () => {
                            if (input.length > 0) {
                                setTodo([...todo, input]);
                                setInput('');
                            }
                        }
                    }
                >
                    <i 
                        className={
                            `
                            material-icons
                            md:mr-2
                            `
                        }
                    >
                        add_task
                    </i>
                    <span 
                        className={
                            `
                            hidden
                            md:block
                            `
                        }
                    >
                        Add
                    </span>
                </button>
            </div>
            <Tabs className={
                `
                w-full md:w-1/2
                mt-2 
                px-2
                `
            }>
                <ItemList
                    tabLabel="All"
                    emptyMessage="Looks like there's nothing to do and nothing done yet..."
                    list={
                        [
                            ...todo.map(item =>
                                <li>
                                    <input 
                                        type="checkbox"
                                        className={
                                            `
                                            mr-2
                                            `
                                        }
                                        onChange={
                                            () => {
                                                setDone([...done, item]);
                                                setTodo(todo.filter(test => test != item));
                                            }
                                        }
                                        checked={false}
                                    />
                                    <span>
                                        {item}
                                    </span>
                                </li>
                            ),
                            ...done.map(item => renderDone(item, done, setDone))
                        ]
                    }
                />
                <ItemList
                    tabLabel="Todo"
                    emptyMessage="Looks like there's nothing to do yet..."
                    list={
                        todo.map(item =>
                            <li>
                                <input 
                                    type="checkbox"
                                    className={
                                        `
                                        mr-2
                                        `
                                    }
                                    onChange={
                                        () => {
                                            setDone([...done, item]);
                                            setTodo(todo.filter(test => test != item));
                                        }
                                    }
                                />
                                <span>
                                    {item}
                                </span>
                            </li>
                        )
                    }
                />
                <ItemList
                    tabLabel="Done"
                    emptyMessage="Looks like there's nothing done yet..."
                    list={
                        done.map(item => renderDone(item, done, setDone))
                    }
                />
            </Tabs>
        </main>
    );
};