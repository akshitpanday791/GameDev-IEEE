import {app} from '../firebase';
import 'firebase/firestore';
const db = app.firestore();


const prepareGame = async(current_user_name,current_user_uid,wait, result) =>{
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

        var board1d = shuffle(ansarr.map(ans => {return {value : ans, state : false}})); //1 D board created
    
        //convert the 1D array to 2D board
        var board2d = [];
        while(board1d.length) board2d.push({row : board1d.splice(0,5)});
        const docref = await db.collection('gamerooms').add({
            createdby : current_user_name,
            questionset : quearr,
            answerset : ansarr,
            [current_user_uid] : board2d
        });
        await db.collection('realtimestates').doc(docref.id).set({
            questionstate : new Array(25).fill(false),
            users : [{
                id : current_user_uid,
                name : current_user_name,
                score : 0
            }]
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

const getRoom = (doc_id, wait,result) =>{
    wait();
    db.collection('gamerooms').doc(doc_id).get().then((doc) => {
        if (!doc.exists) {
            result({"success":false,"message": "Document not found"});
        } else {
            result({"success":true,"data":doc.data()});
        }
    }).catch((error) => {
        result({"success":false,"message" : error});
    });
};


export {prepareGame, SetData, getRoom};