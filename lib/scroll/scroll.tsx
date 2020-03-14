import * as React from 'react';
import scrollbarWidth from './scrollbar-width'; 
import './style.scss';
import { HTMLAttributes } from "react";
interface Props extends HTMLAttributes<HTMLElement> {

 }
const Scroll: React.FunctionComponent<Props> = (props) => {
    const { children, ...rest } = props
    return (
        <div className="fui-scroll" {...rest}>
            <div className="fui-scroll-inner" style={{right: -scrollbarWidth()}}>
                {children}
            </div>
        </div>
    )
}
export default Scroll;