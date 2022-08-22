

/**
 * Simran is sending promise to Rahul
 */
function promiseFromSimram(){

    return new Promise((resolve, reject)=>{
       
         setTimeout(()=>{

            console.log("No resolve , no reject");

         },5000);
    
    });
}

const rahulGotAPromise = promiseFromSimram();


rahulGotAPromise.then((msg)=>{
    console.log("Let Nacho ! , It's marriage time. This is what she has to say", msg);
}).catch((msg)=>{
    console.log("Reason I got for breaking my heart : ", msg);
    console.log("Tinder here I come ...");
})