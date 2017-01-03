import React from 'react';

function UndoButton(props) {
    return (
        <button
            className="btn btn-block btn-default"
            onClick={ props.onClick }
            disabled={ props.disabled }
        >
            Undo
        </button>
    )
}

export default UndoButton;
