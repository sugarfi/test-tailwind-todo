import React, { useState } from 'react';

export const Tabs = (props) => {
    const [open, setOpen] = useState(0);
    const [old, setOld] = useState(0);
    return (
        <div {...props}>
            <ul className={
                `
                w-full md:w-1/2
                flex
                justify-between
                mx-auto
                relative
                `
            }>
                {
                    props.children.map((child, index) => {
                        return (
                            <li className={
                                `
                                cursor-pointer
                                flex-1
                                text-center
                                ${
                                    index == open 
                                    ?
                                    `
                                    text-blue-500
                                    border-b-2 border-blue-500
                                    `
                                    :
                                    ``
                                }
                                `
                                }
                                onClick={
                                    () => {
                                        setOld(open);
                                        setOpen(index);
                                    }
                                }
                            >
                                {child.props.tabLabel}
                            </li>
                        );
                    })
                }
            </ul>
            {props.children[open]}
        </div>
    );
};