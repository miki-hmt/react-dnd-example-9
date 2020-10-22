import React, {useState, useCallback, useMemo} from 'react';
import {useDrop} from 'react-dnd';
import {useDrag} from 'react-dnd';
import {Colors} from './Colors';

const style = {
    border: '1px dashed gray',
    padding: '2rem 5rem',
    margin: '0.5rem'
};


const TargetBox = ({onDrop, lastDroppedColor}) => {

        const [forbidDrag, setForbidDrag] = useState(false);

        const [action, setAction] = useState('drop');

        const [{isDragging}, drag] = useDrag({
            item: {type:Colors.YELLOW},
            begin: function () {
                console.log('begin drag')
            },
            // canDrag: !forbidDrag,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });


        const [{isOver, draggingColor, canDrop}, drop] = useDrop({
            accept: [Colors.YELLOW, Colors.BLUE],
            drop(item) {
                debugger
                onDrop(item.type);
                console.log(item.type)
               // setAction('drag')
                return undefined;
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
                draggingColor: monitor.getItemType(),
            }),
        });


        const opacity = isOver ? 1 : 0.7;
        let backgroundColor = '#fff';
        switch (draggingColor) {
            case Colors.BLUE:
                backgroundColor = 'lightblue';
                break;
            case Colors.YELLOW:
                backgroundColor = 'lightgoldenrodyellow';
                break;
            default:
                break;
        }

        const containerStyle = useMemo(() => ({
            ...style,

            opacity: isDragging ? 0.4 : 1,
            cursor: forbidDrag ? 'default' : 'move',
        }), [isDragging, forbidDrag, backgroundColor]);



        let box = null;
        if (action === 'drag') {

            box =
                <div ref={drag} style={containerStyle} color={Colors.BLUE}>
                    <small>source</small>
                </div>

        } else {
            box =
                <div ref={drop}  style={{...style, backgroundColor, opacity}}>
                    target
                    {!canDrop && lastDroppedColor && <p>Last dropped: {lastDroppedColor}</p>}
                </div>
        }


        return (<div onMouseDown={()=>setAction('drag')} >
            {box}
        </div>)
    }
;

export const StatefulTargetBox = (props) => {


    const [lastDroppedColor, setLastDroppedColor] = useState(null);


    const handleDrop = useCallback((color) => setLastDroppedColor(color), []);


    return (<TargetBox {...props} lastDroppedColor={lastDroppedColor} onDrop={handleDrop}/>);
};