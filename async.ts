console.log('Step 1');

const execute =()=>setTimeout(()=>{
        console.log('Step 2');
    },5000);

// const execute =()=>{
//     console.log('Step 2');
// }
execute();
console.log('Step 3');