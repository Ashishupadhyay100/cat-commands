
// We used require("fs") to include the file system module
let fs = require("fs");

// parsing the command line arguments,slicing away first two elements - node and the path of script.
let cmd  = process.argv.slice(2);

(function(){
    let files = [];
    let options = [];
    
    for(let x in cmd ){
        // to filter out the options like -n,-b,-s etc.
        if(cmd[x].startsWith("-") && cmd[x].length==2){
            options.push(cmd[x]);
        }
        else{
    // if file doesn't exist then simply print msg and return
        if(!fs.existsSync(files[x])){
            console.log((cmd[x]+" does not exist"));
            return;
        }
    
     // to filter out files in files array
            files.push(cmd[x]); 
        }
    }


 // If no file found ,simply print the msg
    if(files.length<=0){
            console.log("No file exist");
            return;
     }
   
    
    let str = "";
    for(let x in files){
        str += fs.readFileSync(files[x]).toString();
    }

    str = str.split("\n");
// If -s is given ,then call for removeLargerSpaces
    if(options.includes("-s")){
        str =  removeLargerSpaces(str);
    }
// Checking if -n,-b both are present
    if(options.includes("-n") && options.includes("-b")){
       if(options.indexOf("-b")>options.indexOf("-n")){//then checking which appeared first
        // execute -n
        str = addNum(str);
       }
       else{
        // execute -b
        str = addNonEmptyNum(str);
       }
    }
    else{   //when either of them is present
       if(options.includes("-b")){
        // execute -b
        str = addNonEmptyNum(str);
        }
        else if(options.includes("-n")){
        // execute -n
        str = addNum(str);
        }

    }

    str = str.join("\n");
    console.log(str);
})();

// Function to remove all extra empty lines 
function removeLargerSpaces(arr){
    let ans = [];
    for(let i=0;i<arr.length;i++){
        if((arr[i]=="" && arr[i+1]=="")||(arr[i]=="\r" && arr[i+1]=="\r")){
    }else{
       ans.push(arr[i]);
    }
  }
return ans;
}

// Function  to add number in front of every line
function addNum(arr){
    let nArr = [];
    for(x in arr){
        let t = Number(x)+1;
        nArr[x] = t+" "+arr[x];
    }
    return nArr;
} 

// Function to add number in front of lines not having space
function addNonEmptyNum(arr){
    let lineNumber = 1;
    let nArr = [];
    for(let x in arr){
        if(arr[x]=="\r" || arr[x]==""){
            nArr[x] = arr[x];
        }
        else{
            nArr[x] = lineNumber +" "+arr[x];
            lineNumber++;
        }
    }
    return nArr;
}