import * as React from 'react';
import scrollbarWidth from './scrollbar-width';
import './style.scss';
import {
    HTMLAttributes, MouseEventHandler,
    useState, useEffect, useRef
} from "react";
interface Props extends HTMLAttributes<HTMLElement> {

}
// @ts-ignore
let clientHeight: number; // 网页可见区高
let scrollTop: number; // 网页被卷去的高
// @ts-ignore
let scrollHeight: number; // 网页正文全文高

const Scroll: React.FunctionComponent<Props> = (props) => { //
    const { children, ...rest } = props
    const wholeDivRef = useRef(null)
    const [barTop, setBarTop] = useState(0);
    // @ts-ignore    


    const onMouseDown: MouseEventHandler<HTMLDivElement> = (e) => { }
    const onMouseUp = () => { } //:MouseEventHandler<HTMLDivElement>
    const onMouseMove: MouseEventHandler<HTMLDivElement> = (e) => { //: HTMLDivElement
        console.log('move', e.currentTarget!.scrollTop)
        setBarTop(e.currentTarget!.scrollTop)
    }
    const onContScroll = (e: any) => {
        const _div = e.target.getBoundingClientRect()
        // console.log('sScroll',e.target,_div)
        console.log('ContScroll', _div.scrollTop)
        console.log('csroll2', scrollHeight, clientHeight)
        if (!scrollHeight) {
            // @ts-ignore
            // clientHeight = wholeDivRef.current.getBoundingClientRect().height;
            // @ts-ignore
            scrollHeight = _div.scrollTop
        }
        console.log('csroll3', scrollHeight, clientHeight)
        if (scrollHeight && clientHeight) {
            // @ts-ignore
            scrollTop = e.target.scrollTop;
            console.log('scrollTop',scrollTop)
            const delta = Math.abs((scrollTop * scrollTop) / scrollHeight)
            // @ts-ignore
            let str =`${parseInt(delta)}`
            console.log('delta', str)
            // @ts-ignore
            setBarTop(str)
        }
    }

    useEffect(() => {
        // document.addEventListener('onmousedown', onMouseDown)
        console.log(wholeDivRef.current, typeof wholeDivRef.current)
        // const div = wholeDivRef.current as object
        if (typeof wholeDivRef.current === "object") {
            // @ts-ignore
            console.log(wholeDivRef.current.scrollHeight, wholeDivRef.current.clientY, wholeDivRef.current.offsetHeight, wholeDivRef.current.top)
            // @ts-ignore        
            console.log(wholeDivRef.current.offsetY, wholeDivRef.current.getBoundingClientRect())
            // @ts-ignore               
            clientHeight = wholeDivRef.current.getBoundingClientRect().height;
            // @ts-ignore
            scrollHeight = wholeDivRef.current!.scrollHeight
        }
        document.addEventListener('onmouseup', onMouseUp)
        return () => {
            document.removeEventListener('onmouseup', onMouseUp)
        };
    }, []);

    return (
        <div className="fui-scroll" {...rest}>
            <div className="fui-scroll-track"
                onMouseMove={onMouseMove}
                ref={wholeDivRef}
            >
                <div className="fui-scroll-bar"
                    style={{ top: barTop }}
                    onClick={onMouseDown}
                ></div>
            </div>
            <div className="fui-scroll-inner"
                style={{ right: -scrollbarWidth() }}
                onScroll={onContScroll}
            >
                {children}
            </div>
        </div>
    )
}
export default Scroll;