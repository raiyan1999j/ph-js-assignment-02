let seatArray = [];
let supportArr= [];
const selectedSeat = document.getElementsByClassName('selectedSeat');
const seatTable = document.getElementById('seatTable').children[1];
const totalSeat = Number(document.getElementById('remainSeat').innerText);

for(let repeat of selectedSeat){
    repeat.addEventListener('click',(event)=>{
        const tableRow = document.createElement('tr');
        const takeSeat = event.srcElement.innerText;
        const selectedBtn = event.srcElement.classList;

        tableRow.classList.add('text-base','font-normal','font-inter','text-[#03071299]','capitalize','border-none');

        tableRow.setAttribute('id',takeSeat);
        tableRow.innerHTML = `<td>${takeSeat}</td> <td>Economy</td> <td>550</td>`;

        if(!seatArray.includes(takeSeat)){
            seatArray.push(takeSeat)

            seatTable.appendChild(tableRow);
            toggleSelection(selectedBtn,'add','bg-sky-500')
        }else{
            seatArray = seatArray.filter((value)=>{
                return value != takeSeat
            })

            for(let repeat of seatTable.children){
                if(repeat.id == takeSeat){
                    seatTable.removeChild(repeat)
                }
            }

            toggleSelection(selectedBtn,'remove','bg-sky-500')
        }

        limitedSeat(seatArray,selectedBtn)
        totalSeatPrice();
    })
}

function limitedSeat(confirmation,event){
    let remainSeat = document.getElementById('remainSeat');
    let seatAlert = document.getElementById('seatAlert');
    let confirmLen =Number(confirmation.length);
    let arr =[];

    if(confirmLen > 4){
        confirmation.splice(confirmLen - 1,1);

        seatAlert.classList.remove('hidden');

        setTimeout(()=>{
            seatAlert.classList.add('hidden')
        },2000)

        toggleSelection(event,'remove','bg-sky-500')

        
    }else{
        remainSeat.innerText = totalSeat - confirmLen;
        arr.push(confirmation);
    }
}

function toggleSelection(event,option,value){
    if(option == 'add'){
        event.add(value,'text-white')
    }else{
        event.remove(value,'text-white')
    }
}

function totalSeatPrice(){
    if(seatTable.children.length > 4){
        seatTable.removeChild(seatTable.lastChild)
    }
}