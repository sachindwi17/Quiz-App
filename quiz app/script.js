n1=0;
n2=0;
flag=false;
async function getQuiz()
{
    document.querySelector('.finish').style.display='none';
    document.querySelector('.next').style.display='none';
    document.querySelector('.submit').style.display='block';
    document.querySelector('.box1').style.display='none';
    document.querySelector('.box2').style.display='none';
    document.querySelector('.lds-grid').style.display='inline-block';
    var url="https://opentdb.com/api.php?amount=1";
    var response=await fetch(url);
    var data=await response.json();
    let arr=[];
    arr.push(data.results[0].correct_answer);
    document.getElementById('hid').value=data.results[0].correct_answer;
    arr=arr.concat(data.results[0].incorrect_answers);
    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
      
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
    var str1="";
    for(i of shuffle(arr))
    {
        str1+=`<div class="op1">
            <div class="pt"></div>
            <h5>${i}</h5>
        </div>`;
    }
    document.querySelector('.box1').style.display='block';
    document.querySelector('.lds-grid').style.display='none';
    // console.log(str1);
    document.querySelector('.opt').innerHTML=str1;
    document.querySelector('.ques').innerHTML=`<h4>Q. ${data.results[0].question}</h4>`;
    flag=true;

    let b1=document.querySelectorAll('.op1');
    for(i of b1)
    {
        i.addEventListener('click',(e)=>{
            if(document.querySelector('.active')!=undefined)
            {
                document.querySelector('.active').classList.remove('active');
                document.querySelector('.active-pt').classList.remove('active-pt');
            }
            if(e.target.tagName=='DIV')
            {
                if(!e.target.classList.contains('pt'))
                {
                    e.target.classList.add('active');
                    e.target.children[0].classList.add('active-pt');
                }
                else
                {
                    e.target.parentNode.classList.add('active');
                    e.target.classList.add('active-pt');
                }
            }
            else
            {
                e.target.parentNode.classList.add('active');
                e.target.previousElementSibling.classList.add('active-pt');
            }
        })
    }
}
getQuiz();

document.querySelector('.submit').addEventListener('click',()=>{
    flag=false;
    if(document.querySelector('.active')!=undefined)
    {
        n2++;
        let c1=document.getElementById('hid').value;
        let c2=document.querySelector('.active').children[1].innerText;
        if(c1==c2)
        {
            document.querySelector('.active').classList.add('true');
            n1++;
        }
        else
        {
            let b2=document.querySelectorAll('.op1');
            for(i of b2)
            {
                if(i.children[1].innerText==c1)
                {
                    i.classList.add('true');
                    break;
                }
            }
            document.querySelector('.active').classList.add('false');
        }
        document.querySelector('.finish').style.display='block';
        document.querySelector('.next').style.display='block';
        document.querySelector('.submit').style.display='none';
        document.querySelector('.score').innerHTML=`<p>${n1}/${n2}</p>`;
    }
    else
    {
        document.querySelector('.alert').style.display='block';
    }
})
document.querySelector('.next').addEventListener('click',()=>{
    document.querySelector('.box1').style.display='none';
    document.querySelector('.lds-grid').style.display='inline-block';
    getQuiz();

})
document.querySelector('.finish').addEventListener('click',()=>{
    flag=false;
    document.querySelector('.box1').style.display='none';
    document.querySelector('.box2').style.display='block';
    document.getElementById('fsc').innerText=`${n1}/${n2}`;

})
document.querySelector('.play').addEventListener('click',()=>{
    document.querySelector('.box1').style.display='none';
    document.querySelector('.lds-grid').style.display='inline-block';
    n1=0;
    n2=0;
    getQuiz();
})
document.querySelector('.alert').addEventListener('click',()=>{
    document.querySelector('.alert').style.display='none';
})