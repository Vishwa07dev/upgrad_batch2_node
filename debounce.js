function debounce(cb, to) {
    let timer ; //previous timerId
    return ()=>{
        /**
         * Every time this function is hit, clear the timeout and 
         * then set a new time out.
         * This will enable the call back to be called only once after the last call !
         */
        clearTimeout(timer);
        timer = setTimeout(()=>{
         cb();
        }, to);
    }

}

function main() {
    const interval = 30;

    let count = 0;
    const dfn = debounce(() => {
        count++;
        console.log(count);
    }, interval);

    for (let i = 0; i < 1000; i++) {
        dfn();
    }

}


main();