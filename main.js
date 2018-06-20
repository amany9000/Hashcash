const crypto = require('crypto');
const moment = require('moment');
const yargs = require('yargs');
const readline = require('readline');


const r1 = readline.createInterface({
	input : process.stdin,
	output : process.stdout
})

r1.question('Enter the bits you want to generatePartialPreImage of:',(answer)=>{
	const bits = `${answer}`;

const startTime = new Date().getTime();


const argv = yargs.argv;
//.options({
//	b:{
	//	demand:true,
	//	alias:'bits',
	//	describe:'bits required for preimaging',
	//	string :false
	//}
//})


const version = '1';
const date = moment().format('MMDDYY');
const resource = argv.data;
const extension ='';



const rand = Math.floor(Math.random()*Number.MAX_VALUE)+ 10;

let count = 0;

while(count < Number.MAX_VALUE-1){

 const header = `${version}:${bits}:${date}:${resource}:${extension}:${toBase64(rand.toString())}:${toBase64(count.toString())}`;

const result = crypto.createHash('sha1').update(header).digest('hex');


	if(result.startsWith(generatePartialPreImage(bits))){


 		const endTime  = new Date().getTime();

 		const diff = endTime - startTime;
 		console.log(`Total time: ${diff/1000} seconds`);
 		console.log(header);
 		console.log(result);

 		break;
 	}


  count ++;


}

 r1.close();
});


function generatePartialPreImage(bits){

	let str = '';
	for(let i=0;i<bits;i++){
	str = str+ '0';
	}
	return str;
}






function toBase64(str){
	return Buffer(str).toString('base64');
}
