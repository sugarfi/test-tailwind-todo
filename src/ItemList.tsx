import React from 'react';

export const ItemList = (props) => {
    return (
        <ul
            className={
                `
                mt-2
                max-w-full
                `
            }
        >
            {
                props.list.length == 0 ?
                <li className={
                    `
                    w-full
                    text-center
                    `
                }>
                    {props.emptyMessage}
                </li>
                : props.list
            }
        </ul>
    )
};