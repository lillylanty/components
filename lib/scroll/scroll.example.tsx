import * as React from 'react';
import Scroll from "./scroll";
const x: React.FunctionComponent = (props) => {
    const fakes = [];
    let rans = (Math.random()*(50-30)+30)
    for(var i=0;  i< rans ; i++){
        fakes.push(`${i}--------${i}-------${i}------${i}------${i}`)
    }
    return (
        <Scroll style={{ width: '500px', height: '60vh' }}>
           {
               fakes.map(a=> <h1 key={a}>{a}</h1> )
           }
        </Scroll>
    )
}
export default x;