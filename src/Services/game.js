import {app} from '../firebase';
import 'firebase/firestore';
const db = app.firestore();


const prepareGame = async(wait, result) =>{
    wait();
    try{
        const questions = await db.collection('questions').get();
        var quearr = [];
        for(const doc of questions.docs){
            quearr = quearr.concat(doc.data().data);
        }

        //get random question & answer sets
        quearr = (shuffle(quearr)).slice(0, 25);
        //extract answers object array
        var ansarr = quearr.map(object => object.answer);
        //var shuffle answers
        ansarr = shuffle(ansarr);

        //convert the 1D array to 2D array
        var new_ansarr = [];
        while(ansarr.length) new_ansarr.push({row : ansarr.splice(0,5)});
        
        const docref = await db.collection('gamerooms').add({
            questionset : quearr,
            board : new_ansarr
        });
        result({success:true, link: docref.id});
    }catch(err){
        result({success:false, message: err});
    }
}


const SetData = async(collection,document,data,wait,result) =>{
    wait();
    await db.collection(collection).doc(document).set(data)
        .then(()=>{
          result({"success":true});
        }).catch((err)=>{
          result({"success":false,"error":err});
        });
  }

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

export {prepareGame, SetData};