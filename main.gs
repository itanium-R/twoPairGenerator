const members = ["田中","佐藤","新田","江口","小坂","大島","浪江","土方"]; // 偶数にする（割り切るため）
const pairSize = 2;

const calcPattern = (n) => {
  if(n < 0) throw("faild to calc pattern: invalid n:"+ n);
  let rslt = 0;
  for(let i = 1; i <= n; i++) rslt += i;
  return rslt;
}

const main = (/*members, pairSize*/) => {
  const membersLen = members.length;
  const pairLenATime = membersLen / pairSize;
  const timesNum = calcPattern(membersLen - 1) / pairLenATime;
  
  let candidateList = [];
  for(let i = 0; i < membersLen; i++) { 
    for(let j = i + 1; j < membersLen; j++){
      candidateList.push([i,j]);
    }
  }
  
  let pairList = [];
  for(let i = 0; i < timesNum; i++){
    let busyList = new Array(membersLen);
    let thisTimePairList = [];
    
    for(let j = 0; j < pairLenATime; j++){
      let k = 0;
      let candidateLen = candidateList.length;
      while(k < candidateLen){
        if(busyList[candidateList[k][0]] === true || 
           busyList[candidateList[k][1]] === true ){
          k+=1;
          continue;
        }

        thisTimePairList.push(candidateList[k]);
        busyList[candidateList[k][0]] = true;
        busyList[candidateList[k][1]] = true;
        candidateList.splice(k,1);
        break;
      }
      if(k === candidateLen){
        console.log(thisTimePairList);
        candidateList.push(thisTimePairList.pop());
        busyList[candidateList[k][0]] = false;
        busyList[candidateList[k][1]] = false;
        j -= 2;
      }
    }
    pairList.push(thisTimePairList);  
  }

  for(let p1 of pairList){
    for(let p2 of p1){
      p2[0] = members[p2[0]];
      p2[1] = members[p2[1]];
    }
  }
  console.log(pairList);
  return pairList;
}
