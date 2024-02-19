let seatArray = [];
const selectedSeat = document.getElementsByClassName('selectedSeat');
const totalSeat = Number(document.getElementById('remainSeat').innerText);

for(let repeat of selectedSeat){
    repeat.addEventListener('click',(event)=>{
        const takeSeat = event.srcElement.innerText;
        let holder ='';
    
        if(!seatArray.includes(takeSeat)){
            seatArray.push(takeSeat)
        }else{
            seatArray = seatArray.filter((value)=>{
                return value != takeSeat
            })
        }

        limitedSeat(seatArray)
    })
}

function limitedSeat(confirmation){
    let remainSeat = document.getElementById('remainSeat');
    let confirmLen =Number(confirmation.length);

    if(confirmLen > 4){
        confirmation.splice(confirmLen - 1,1);
    }else{
        remainSeat.innerText = totalSeat - confirmLen;
    }
}