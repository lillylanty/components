import * as React from 'react';
import scrollbarWidth from './scrollbar-width';
import './style.scss';
import {
    //@ts-ignore
    HTMLAttributes, MouseEventHandler, UIEventHandler,TouchEventHandler,
    useState, useEffect, useRef
} from "react";
interface Props extends HTMLAttributes<HTMLElement> {

}

const Scroll: React.FunctionComponent<Props> = (props) => { 
    const { children, ...rest } = props
    const wholeDivRef = useRef<HTMLDivElement>(null)

    const [barHeight, setBarHeight ] = useState(0);
    const [barTop, _setBarTop] = useState(0);
    const [barVisible, setBarVisible] = useState(!('ontouchstart' in document.documentElement))

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
            }, 1500);
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
        // setBarVisible(!('ontouchstart' in document.documentElement))
        console.log('barVisible', barVisible)
        // return () => {
        //     cleanup
        // };
    }, [barVisible]);
// @ts-ignore
    const [translateY, _setTranslateY] = useState(0)
    const setTranslateY = (y:number)=>{
        if(y<0){
            return 
        }else if(y > 150 ){
            y = 150
        }
        _setTranslateY(y)
    }
    //跨状态的变量用useRef 不要用 useState
    const lastYRef = useRef(0)
    const moveCount = useRef(0)
    const pulling = useRef(false)

    const onTouchStart:TouchEventHandler = (e)=>{
        const scrollTop = wholeDivRef.current!.scrollTop
        if(scrollTop !== 0){
            return
        }
        lastYRef.current = e.touches[0].clientY
        moveCount.current = 0
        pulling.current = true;
        console.log('y1',lastYRef.current )
    }

    const onTouchMove:TouchEventHandler = (e)=>{
        const deltaY = e.touches[0].clientY - lastYRef.current 
        moveCount.current += 1
        if( moveCount.current === 1 && deltaY <0){
            // 不是下拉，是正常的内容滚动
            pulling.current = false
            console.log('deltaY',deltaY)
            return
        }
        if(pulling.current === false){
            return
        }
        if(deltaY>0){
            console.log('看上面')
            setTranslateY(translateY + deltaY)
        }else{
            setTranslateY(translateY + deltaY)
            console.log('看下面')
        }
        lastYRef.current = e.touches[0].clientY
    }
    
    const onTouchEnd:TouchEventHandler = (e)=>{
        // lastYRef.current = e.touches[0].clientY
        setTranslateY(0)
        console.log('y2',lastYRef.current )
    }

    return (
        <div className="fui-scroll" {...rest}
            // onMouseMove={onMouseMoveBar}
            // onMouseUp={onMouseUpBar}
        >
            <div className="fui-scroll-inner" style={{ 
                right: -scrollbarWidth() ,
                transform: `translateY${translateY}px`
            }}
                ref={wholeDivRef}
                onScroll={onContScroll}
                onTouchMove = {onTouchMove}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
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
            <div className="fui-scroll-p" style={{height:`${translateY}px`}}> 下... </div>
        </div>
    )
}
export default Scroll;