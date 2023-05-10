export default function wait(time) { // time is in seconds
    return new Promise(resolve => setTimeout(resolve, time * 1000));
}
//import wait from "./wait"

//wait(1).then(() => console.log('ran after 1 second passed'));
/*
console.log('start timer');
await wait(1);
console.log('after 1 second');
*/