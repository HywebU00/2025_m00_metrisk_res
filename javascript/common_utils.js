//ArrayList

function ArrayList(){
	var args = ArrayList.arguments;
	var initialCapacity = 10;
	
	if( args!=null && args.length>0 ){
		initialCapacity = args[0];
	}
	
	var elementData = new Array(initialCapacity);
	var elementCount = 0;
	
	this.size = function(){
		return elementCount;
	}
	
	this.add = function (element) {
		ensureCapacity(elementCount + 1);
		elementData[elementCount++] = element;
		
		return true;
	}
	
	this.addElementAt = function (index, element ){
		if ( index > elementCount || index < 0 ){
			alert( "IndexOutOfBoundsException, Index: " + index + ", Size: " + elementCount );
			
			return;
		}
		
		ensureCapacity( elementCount+1 );
		
		for( var i=elementCount+1; i>index; i-- ){
			elementData[i] = elementData[i-1]
		}
		
		elementData[index] = element;
		elementCount++;
	}
	
	this.setElementAt = function (index, element ){
		if ( index > elementCount || index < 0 ){
			alert( "IndexOutOfBoundsException, Index: "+index+", Size: " + elementCount );
			
			return;
		}
		
		elementData[index] = element;
	}
	
	this.toString = function(){
		var str = "{";

		for(var i=0;i<elementCount;i++){
			if(i > 0){
				str += ",";
			}

			str += elementData[i];
		}

		str += "}";

		return str;
	}

	this.get = function(index){
		if ( index >= elementCount ) {
			alert( "ArrayIndexOutOfBoundsException, " + index + " >= " + elementCount );

			return;
		}
		
		return elementData[index];
	}
	
	this.remove = function(index){
		if ( index >= elementCount ) {
			alert( "ArrayIndexOutOfBoundsException, " + index + " >= " + elementCount );
			
			throw ( new Error( -1,"ArrayIndexOutOfBoundsException, " + index + " >= " + elementCount ) );
		}

		var oldData = elementData[index];

		for( var i=index;i<elementCount - 1;i++ ){
			elementData[i] = elementData[i+1];
		}

		elementData[elementCount - 1] = null;
		elementCount--;
		
		return oldData;
	}

	this.isEmpty = function() {
		return elementCount == 0;
	}

	this.indexOf = function(elem) {
		for ( var i=0; i < elementCount; i++ ){
			if (elementData[i]==elem){
				return i;
			}
		}

		return -1;
	}

	this.lastIndexOf = function(elem) {
		for (var i = elementCount-1; i >= 0; i--){
			if ( elementData[i]==elem ){
				return i;
			}
		}

		return -1;
	}

	this.contains = function(elem){
		return this.indexOf(elem) >= 0;
	}
	
	function ensureCapacity (minCapacity) {
		var oldCapacity = elementData.length;

		if (minCapacity > oldCapacity) {
			var oldData = elementData;
			var newCapacity = parseInt( (oldCapacity * 3)/2 + 1 );

			if (newCapacity < minCapacity){
				newCapacity = minCapacity;
			}

			elementData = new Array(newCapacity);

			for( var i=0;i<oldCapacity;i++ ){
				elementData[i] = oldData[i];
			}
		}
	}
}

//HashMap

function HashMap(){
	var size = 0;
	var entry = new Object();

	this.put = function(key, value){
		if(!this.containsKey(key)){
			size++;
		}

		entry[key] = value;
	}

	this.get = function(key){
		if(this.containsKey(key)){
			return entry[key];
		}else{
			return null;
		}
	}

	this.remove = function(key){
		if(delete entry[key]){
			size--;
		}
	}

	this.containsKey = function(key){
		return (key in entry);
	}

	this.containsValue = function(value){
		for(var prop in entry){
			if(entry[prop] == value){
				return true
			}
		}

		return false;
	}

	this.values = function(){
		var values = new Array(size);

		for(var prop in entry){
			values.push(entry[prop]);
		}

		return values;
	}

	this.keys = function(){
		var keys = new Array(size);

		for(var prop in entry){
			keys.push(prop);
		}

		return keys;
	}

	this.size = function(){
		return size;
	}
}

//閮����
function commonCalculateWorkDays(fromStr, toStr, dateFormat, holidayList){
	var from = new Date(fromStr);
	var to = new Date(toStr);

	from.format(dateFormat);
	to.format(dateFormat);

	//��絲憪�靽格迤���� javascript������0�����隞�+1靘���
	var sDayofWeek = from.getDay() + 2;
	var workdays = 0;
	  
	//靽格迤����銋���耨甇�憭靘���
	from.setDate(from.getDate() - (sDayofWeek % 7));
	workdays -= ((sDayofWeek - 2) > 0) ? sDayofWeek - 2 : 0;

	//閮�������予�  
	var totalDays = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24) + 1;

	workdays += Math.floor(totalDays / 7) * 5;    

	//靽格迤��敺擗予�
	if((totalDays % 7 - 2) > 0){
	     workdays += (totalDays % 7 - 2);  
	}
	
	//��蕪����
	for(i = 0; i < holidayList.size(); i++){
		if(holidayList.get(i) >= fromStr && holidayList.get(i) <= toStr)
			workdays--;
	}
	
	return workdays;
}

//瑼Ｘ���撘�
function commonCheckTimeFormat(field){
	if(field.value < "0000" || field.value > "2400"){
		alert("���撘隤�!");
		
		field.value = "";
	}
}

// 銴ˊ��鞎潛倏
function copyTextToClipboard(text) {
	if (window.clipboardData) {
		window.clipboardData.clearData();
		window.clipboardData.setData("Text", text);
	} else {
		if (navigator.userAgent.indexOf("Opera") != -1) {
			window.location = text;
		} else {
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager
							.enablePrivilege("UniversalXPConnect");
				} catch (e) {
					alert("\u88ab\u700f\u89bd\u5668\u62d2\u7d55\uff01\n\u8acb\u5728\u700f\u89bd\u5668\u5730\u5740\u6b04\u8f38\u5165\u2019about:config\u2019\u4e26Enter\n\u7136\u5f8c\u5c07\u2019signed.applets.codebase_principal_support\u2019\u8a2d\u7f6e\u70ba\u2019true\u2019");
				}
				var clip = Components.classes["@mozilla.org/widget/clipboard;1"]
						.createInstance(Components.interfaces.nsIClipboard);
				if (!clip) {
					return;
				}
				var trans = Components.classes["@mozilla.org/widget/transferable;1"]
						.createInstance(Components.interfaces.nsITransferable);
				if (!trans) {
					return;
				}
				trans.addDataFlavor("text/unicode");
				var str = new Object();
				var len = new Object();
				var str = Components.classes["@mozilla.org/supports-string;1"]
						.createInstance(Components.interfaces.nsISupportsString);
				var copytext = text;
				str.data = copytext;
				trans.setTransferData("text/unicode", str, copytext.length * 2);
				var clipid = Components.interfaces.nsIClipboard;
				if (!clip) {
					return false;
				}
				clip.setData(trans, null, clipid.kGlobalClipboard);
			}
		}
	}
	window.status = "\u5167\u6587\u5df2\u88ab\u8907\u88fd\u5230\u526a\u8cbc\u7c3f!Contents have copied to clipboard!";
	setTimeout("window.status=''", 3600);
	return true;
}

function IsValidInt(s) {
	var valid = false;
	
    if (s != null && s != "" && !isNaN(s) && s>=0) {
        valid = parseInt(s, 10) == s;
    }
    return valid;
}