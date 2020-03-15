import * as React from 'react';
import scrollbarWidth from './scrollbar-width';
import './style.scss';
import {
    //@ts-ignore
    HTMLAttributes, MouseEventHandler, UIEventHandler,
    useState, useEffect, useRef
} from "react";
interface Props extends HTMLAttributes<HTMLElement> {

}

const Scroll: React.FunctionComponent<Props> = (props) => { 
    const { children, ...rest } = props
    const wholeDivRef = useRef<HTMLDivElement>(null)

    const [barHeight, setBarHeight ] = useState(0);
    const [barTop, _setBarTop] = useState(0);
    const [barVisible, setBarVisible] = useState('ontouchstart' in document.documentElement)

    const setBarTop = (number:number)=>{
        if(number<0) {return}
        const scrollHeight = wholeDivRef.current!.scrollHeight; 
        const viewHeight = wholeDivRef.current!.getBoundingClientRect().height;
        const maxBarTop = (scrollHeight- viewHeight)*viewHeight / scrollHeight;   
        if(number > maxBarTop) {return}
        _setBarTop(maxBarTop)
    }
    useEffect(() => {
        const scrollHeight = wholeDivRef.current!.scrollHeight; //滚动全高
        const viewHeight = wholeDivRef.current!.getBoundingClientRect().height;
        const barHeight = viewHeight * viewHeight / scrollHeight;   //可视高度
        setBarHeight(barHeight)
       
    }, []);

    let draggingRef = useRef(false);    
    let firstY = useRef(0)
    let firstBarTopRef = useRef(0)

    const onMouseDownBar: MouseEventHandler = (e) => {
        draggingRef.current = true;
        console.log('down')
        firstY.current = e.clientY
        firstBarTopRef.current = barTop;
    }
    const onMouseUpBar = (e: MouseEvent) => { 
        draggingRef.current = false
        console.log('up')
    }   
    const onMouseMoveBar = (e: MouseEvent) => { 
        // console.log('move',draggingRef)
        if (draggingRef.current) {
            const delta = (e.clientY - firstY.current)
            const newBarTop = firstBarTopRef.current + delta
            setBarTop(newBarTop)
            const scrollHeight = wholeDivRef.current!.scrollHeight; //滚动全高
            const viewHeight = wholeDivRef.current!.getBoundingClientRect().height;
            wholeDivRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight
        }
    }
    let timerIdRef  = useRef<number|null>(null)
    const onContScroll: UIEventHandler = (e: any) => { //<UIEvent>
        setBarVisible(true)
        const scrollHeight = wholeDivRef.current!.scrollHeight; //滚动全高
        const viewHeight = wholeDivRef.current!.getBoundingClientRect().height;
        const scrollTop = wholeDivRef.current!.scrollTop; // 容器滚动的距离

        setBarTop(scrollTop * viewHeight / scrollHeight)
        if(timerIdRef.current !== null ){
            clearTimeout(timerIdRef.current!)
        }
        timerIdRef.current = window.setTimeout(() => {
            setBarVisible(false)
        }, 1000);
    }

    useEffect(() => {    
        document.addEventListener('mousemove', onMouseMoveBar)
        document.addEventListener('mouseup', onMouseUpBar)
        return () => {
            document.removeEventListener('mousemove', onMouseMoveBar)
            document.removeEventListener('mouseup', onMouseUpBar)
        };
    }, []);

    useEffect(() => {
        console.log('barVisible', barVisible)
        // return () => {
        //     cleanup
        // };
    }, [barVisible]);

    return (
        <div className="fui-scroll" {...rest}
            // onMouseMove={onMouseMoveBar}
            // onMouseUp={onMouseUpBar}
        >
            <div className="fui-scroll-inner" style={{ right: -scrollbarWidth() }}
                ref={wholeDivRef}
                onScroll={onContScroll}
            >
                {children}
            </div>
            {
                barVisible && (
                    <div className="fui-scroll-track" >
                <div className="fui-scroll-bar" style={{ transform: `translateY(${barTop}px)`, height: barHeight }}
                    onMouseDown={onMouseDownBar}
                ></div>
            </div>
                )
            }
            
        </div>
    )
}
export default Scroll;