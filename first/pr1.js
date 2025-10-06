let votes={
    JavaScript:0,
    Python:0,
    Java:0
};

function vote(language){
    votes[language]++;
    updatevotes();
}
function updatevotes(){
    total_votes=votes.JavaScript+votes.Python+votes.Java;
    if(total_votes==0)return;

    document.getElementById('js-votes').textContent=votes.JavaScript;
    document.getElementById('python-votes').textContent=votes.Python;
    document.getElementById('java-votes').textContent=votes.Java;
    
    const jsp=(votes.JavaScript/total_votes)*100;
    const pyp=(votes.Python/total_votes)*100;
    const jp=(votes.Java/total_votes)*100;

    document.getElementById('bar-js').style.width=jsp+'%';
    document.getElementById('bar-python').style.width=pyp+'%';
    document.getElementById('bar-java').style.width=jp+'%';
}

setInterval(()=>{
    const langs=['JavaScript','Python','Java'];
    const randomLang=langs[Math.floor(Math.random() *langs.length)];
    votes[randomLang]++;
    updatevotes();
},2000);
