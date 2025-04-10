
function validNumber(obj) {
	try {
		if(!isNaN(obj.value))
			return true;
	}
	catch(e) {}
	
	return false;
}

function checkIdno(id){
	var idArray=new Array();
	idWord=new Array("a","b","c","d","e","f","g","h","j","k","l","m","n","p","q","r","s","t","u","v","x","y","w","z","i","o"); 
	//10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  
	if(id.length!=10){
		return false;
	}
	for(var i=0 ; i<10 ; i++)	
		idArray[i]=id.substring(i,i+1);	

	if(idArray[1]!=1&&idArray[1]!=2){
		return false;
	}
	idArray[0]=idArray[0].toLowerCase();
	if(idArray[0]<'a'||idArray[0]>'z'){
		return false;
	}
	for(i=0 ; i<26 ; i++){
		if(idWord[i]==idArray[0]) a=i+10; 
	}
	var x=Math.floor(a/10);
	var y=a%10;
	var sum=x*1+y*9;
	for( i=1 ; i<10 ; i++ ){
		sum+=idArray[i]*(9-i);
	}
	b=idArray[9].charCodeAt(0)-48;

	if((sum%10+b)%10==0){	
		return true;
	}
	else{
		return false;
	}
}

function checkIDocRCNumber(id){
	//瑼Ｘ頨怠�����
	if(id.length == 10 && ((id.substr(0,1)>="A" || id.substr(0,1)<="Z")) 
			&& ((id.substr(1,1)=="1") || (id.substr(1,1)=="2")) ){
		
		if (isNaN(id.substr(1,9))){
			return false;					
		}

		var head="ABCDEFGHJKLMNPQRSTUVXYWZIO";
		id = (head.indexOf(id.substring(0,1))+10) +''+ id.substr(1,9)
		s =parseInt(id.substr(0,1)) + 
		parseInt(id.substr(1,1)) * 9 + 
		parseInt(id.substr(2,1)) * 8 + 
		parseInt(id.substr(3,1)) * 7 + 			
		parseInt(id.substr(4,1)) * 6 + 
		parseInt(id.substr(5,1)) * 5 + 
		parseInt(id.substr(6,1)) * 4 + 
		parseInt(id.substr(7,1)) * 3 + 
		parseInt(id.substr(8,1)) * 2 + 
		parseInt(id.substr(9,1)) + 
		parseInt(id.substr(10,1));

		//�������
		if ((s % 10) != 0) return false;

		//頨怠����迤蝣�		
		return true;
	    
	//瑼Ｘ撅���Ⅳ
	}else if (id.length == 10 && ((id.substr(0,1)>="A" || id.substr(0,1)<="Z")) 
			&& ((id.substr(1,1)>="A") || (id.substr(1,1)<="Z")) ){
		if (isNaN(id.substr(2,8))){
			return false;					
		}
		
		var head="ABCDEFGHJKLMNPQRSTUVXYWZIO";
		id = (head.indexOf(id.substr(0,1))+10) +''+ ((head.indexOf(id.substr(1,1))+10)%10) +''+ id.substr(2,8)
		s =parseInt(id.substr(0,1)) + 
		parseInt(id.substr(1,1)) * 9 + 
		parseInt(id.substr(2,1)) * 8 + 
		parseInt(id.substr(3,1)) * 7 + 			
		parseInt(id.substr(4,1)) * 6 + 
		parseInt(id.substr(5,1)) * 5 + 
		parseInt(id.substr(6,1)) * 4 + 
		parseInt(id.substr(7,1)) * 3 + 
		parseInt(id.substr(8,1)) * 2 + 
		parseInt(id.substr(9,1)) + 
		parseInt(id.substr(10,1));

		//�������
		if ((s % 10) != 0) return false;
		//撅���Ⅳ甇�蝣�		
		return true;
	//�隞隤斤�撘�	
	}else{
		return false;
	}
}
