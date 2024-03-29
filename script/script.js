let seatArray = [];
const selectedSeat = document.getElementsByClassName('selectedSeat');
const seatTable = document.getElementById('seatTable').children[1];
const ticketPrice= document.getElementById('ticketPrice');
const totalPrice = document.getElementById('totalPrice');
const couponBtn = document.getElementById('couponBtn');
const singleOffer = document.getElementById('singleOffer');
const singleOffCode=document.getElementById('singleOffCode');
const coupleOffer = document.getElementById('coupleOffer');
const coupleOffCode= document.getElementById('coupleOffCode');
const grandSection = document.getElementById('grandSection');
const grandTotal = document.getElementById('grandTotal');
const customerInfo = document.getElementById('customerInfo');
const customerName = document.getElementById('customerName');
const customerPhn = document.getElementById('customerPhn');
const customerMail= document.getElementById('customerMail');
const totalSeat = Number(document.getElementById('remainSeat').innerText);
const nextBtn = document.getElementById('nextBtn');
const congratulation = document.getElementById('congratulation');
const continueBtn = document.getElementById('continueBtn');
const seatCount = document.getElementById('seatCount');
const discountAmount = document.getElementById('discountAmount');

customerInfo.addEventListener('change',(event)=>{
    let [name,phone,mail] = "not match";

    if(customerName.value.length < 4){
        warningMessage(customerName,'at least 4 character!')
    }else{
        name='match';
    }

    if(isNaN(Number(customerPhn.value))){
        warningMessage(customerPhn,'input must be number')
    }else if(customerPhn.value.split("").length !== 11){
        warningMessage(customerPhn,'must have 11 digit')
    }else{
        phone='match';
    }

    if(!customerMail.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )){
        warningMessage(customerMail,'input must be email')
    }else{
        mail='match';
    }

    if(name == 'match' && phone == 'match' && mail == 'match'){
        nextBtn.classList.remove('opacity-30');
        nextBtn.classList.add('hover:cursor-pointer');
        nextBtn.removeAttribute('disabled')
    }else{
        nextBtn.classList.add('opacity-30');
        nextBtn.classList.remove('hover:cursor-not-allowed');
        nextBtn.setAttribute('disabled','');
    }
})

nextBtn.addEventListener('click',(event)=>{
    congratulation.classList.remove('hidden');
})

continueBtn.addEventListener('click',(event)=>{
    event.srcElement.offsetParent.classList.add('hidden');
    location.reload();
})

couponBtn.addEventListener('click',(event)=>{
    const offerValue = document.getElementById('inputValue');
    const hideBtn =()=> event.srcElement.offsetParent.offsetParent.classList.add('hidden');
    let percentage ="";

    if(offerValue.value.toLowerCase() == singleOffCode.innerText.toLowerCase()){
        percentage = Number(singleOffer.innerText.match(/\d+/g));
        hideBtn();
        grandTotalPrice(percentage);
    }else if(offerValue.value.toLowerCase() == coupleOffCode.innerText.toLowerCase()){
        percentage = Number(coupleOffer.innerText.match(/\d+/g));
        hideBtn();
        grandTotalPrice(percentage);
    }else{
        percentage = 'please input valid coupon!';
        offerValue.classList.add('text-red-500','font-medium');
        offerValue.value = percentage;
        
        setTimeout(()=>{
            offerValue.classList.remove('text-red-500','font-medium');
            offerValue.value ='';
        },2000)
    }

    for(let repeat of selectedSeat){
        repeat.classList.add('opacity-30');
        repeat.setAttribute('disabled','');
        repeat.removeEventListener('click',seatSelection)
    }
})

for(let repeat of selectedSeat){
    repeat.addEventListener('click',seatSelection)
}

function seatSelection(event){
    const tableRow = document.createElement('tr');
        const takeSeat = event.srcElement.innerText;
        const selectedBtn = event.srcElement.classList;

        tableRow.classList.add('text-base','font-normal','font-inter','text-[#03071299]','capitalize','border-none');

        tableRow.setAttribute('id',takeSeat);
        tableRow.innerHTML = `<td>${takeSeat}</td> <td>Economy</td> <td>${ticketPrice.innerText}</td>`;

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
    const totalTicket = seatTable.children.length;
    const perPrice = Number(ticketPrice.innerText.match(/\d+/g));

    if(seatTable.children.length > 4){
        seatTable.removeChild(seatTable.lastChild)
    }else{
        totalPrice.innerText = perPrice * totalTicket;
        grandTotal.innerText = perPrice * totalTicket;
        seatCount.innerText = totalTicket;
    }

    if(seatTable.children.length >= 4){
        couponBtn.classList.remove('opacity-30','hover:cursor-not-allowed');
        couponBtn.classList.add('hover:cursor-pointer');
        couponBtn.removeAttribute('disabled');
    }else{
        couponBtn.classList.add('opacity-30','hover:cursor-not-allowed');
        couponBtn.setAttribute('disabled','');
    }
}

function grandTotalPrice(discountPrice){
    const perPrice = Number(ticketPrice.innerText.match(/\d+/g));
    const discount = perPrice * discountPrice / 100;
    const afterDiscount = perPrice - discount;
    
    discountAmount.classList.remove('hidden');
    discountAmount.children[0].innerText = discount * 4 + 'taka';
    grandTotal.innerText = afterDiscount * 4;
}

function warningMessage(section,msg){
    section.classList.add('text-red-500','font-medium');
    section.value = `${msg}`;

    setTimeout(()=>{
        section.classList.remove('text-red-500','font-medium');
        section. value =''
    },1000)
}