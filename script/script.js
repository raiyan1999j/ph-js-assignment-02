let seatArray = [];
const selectedSeat = document.getElementsByClassName('selectedSeat');
const totalSeat = Number(document.getElementById('remainSeat').innerText);

for(let repeat of selectedSeat){
    repeat.addEventListener('click',(event)=>{
        const takeSeat = event.srcElement.innerText;
        const selectedBtn = event.srcElement.classList;

        if(!seatArray.includes(takeSeat)){
            seatArray.push(takeSeat)
            toggleSelection(selectedBtn,'add','bg-sky-500')
        }else{
            seatArray = seatArray.filter((value)=>{
                return value != takeSeat
            })
            toggleSelection(selectedBtn,'remove','bg-sky-500')
        }

        limitedSeat(seatArray,selectedBtn)
    })
}

function limitedSeat(confirmation,event){
    let remainSeat = document.getElementById('remainSeat');
    let seatAlert = document.getElementById('seatAlert');
    let confirmLen =Number(confirmation.length);

    if(confirmLen > 4){
        confirmation.splice(confirmLen - 1,1);
        seatAlert.classList.remove('hidden');
        setTimeout(()=>{
            seatAlert.classList.add('hidden')
        },2000)
        toggleSelection(event,'remove','bg-sky-500')
    }else{
        remainSeat.innerText = totalSeat - confirmLen;
    }

    totalSeatPrice(confirmation)
}

function toggleSelection(event,option,value){
    if(option == 'add'){
        event.add(value,'text-white')
    }else{
        event.remove(value,'text-white')
    }
}

function totalSeatPrice(listedSeat){
    console.log(listedSeat)
}