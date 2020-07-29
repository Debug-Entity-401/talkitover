import React from 'react';

const render = (condition = false , children = null) => {
    return condition ? children : null;
};

// IfRenderer component
/*
* React.Children -> array of arrays  (React is a constructor obj, Children is an array property on React obj)
* props.children -> array element
* child -> index (of the array element)
*/
export const IfRenderer = props =>
    React.Children.map(props.children, child =>
        React.cloneElement(child, {condition: props.condition})
    );

    
// Then component
export const Then = props => render(props.condition, props.children);

// Else component
export const Else = props => render(!props.condition, props.children);
