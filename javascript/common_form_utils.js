
function cdpTargetIdSubmit(action,id){
	$('<form action="'+action+'" method="post"></form>')
		.append('<input type="hidden" name="targetObjectId" value="'+id+'" />')
		.appendTo('body').submit();
}

function cdpTargetDeleteSubmit(action,id){
	if (!confirm('蝣箏���鞈��?'))
		return;
		
	cdpTargetIdSubmit(action,id);	
}

function cdpDynamicSubmit(action, jsonObj, target){
	var form = $('<form action="'+action+'" method="post"></form>');
	if(target){
		form.prop("target", target);
	}
	
	if(jsonObj){
		$.each(Object.keys(jsonObj), function( index, value ) {  
			  form.append('<input type="hidden" name="'+ value +'" value="'+jsonObj[value]+'" />')
		});
	}
		
	form.appendTo('body').submit();	
}

/** cdp ajax call common util**/
function cdpAjaxSubmit(e){
	
	var beforeCallBack = null,
		successCallBack = null,
		ajaxCompleteCallBack = null,
		targetObjectPrefix =null,
		postData = null,
		formURL = null;
	
	
	if(e.data){
		beforeCallBack = e.data.beforeCallBack;
		successCallBack = e.data.successCallBack;
		ajaxCompleteCallBack = e.data.ajaxCompleteCallBack;
		targetObjectPrefix = e.data.targetObjectPrefix;
	}
	
	try{
	
		if(beforeCallBack){
			beforeCallBack();
		}
		
	    postData = $(this).serialize();   
	    
	    if(targetObjectPrefix){
	    	var rep = targetObjectPrefix + "\\."; 
	    	var regex = new RegExp(rep,"g");
	    	//postData = postData.replace(/institution\./g, "targetObject.");	
	        postData = postData.replace(regex, "targetObject.")       
	    }
	       
	    formURL = $(this).attr("action");	    
	    
	}catch(err) {		
		alert("銵典�憭望��:" + (err.stack? "\n" + err.stack:err.message));
		return false;
	}
	
    $.ajax(
    {
        url : formURL,
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR)
        {   
        	var isError = ifErrorPopupMesg(data);
        	
        	if(ajaxCompleteCallBack){
    			ajaxCompleteCallBack();
    		}

        	if(!isError && successCallBack){
        		successCallBack(data);
        	}        	
        },
        error: showAjaxCommonErrorMessage,        
    });
    
    e.preventDefault(); //STOP default action
    if(e.unbind)
    	e.unbind(); //unbind. to stop multiple form submit.

	
    
}

function showAjaxCommonErrorMessage(jqXHR, textStatus, exception){
	if (jqXHR.status === 0) {
        alert('�����蝺憓�帘摰���岫��');
    } else if (jqXHR.status == 404) {
        alert('�銝蝬脤��(404)��');
    } else if (jqXHR.status == 500) {
        alert('蝟餌絞�隤�(500)��');
    } else if (exception === 'parsererror') {
        alert('鞈�撘隤�(JSON parse failed)��');
    } else if (exception === 'timeout') {
        alert('��蝺�暹���');
    } else if (exception === 'abort') {
        alert('���郊摮�葉���');
    } else {
        alert('����隤方��n' + jqXHR.responseText);
    } 
}

function ifErrorPopupMesg(result) {
	
	var errorMesgs = [];
	
	if (result.actionErrors) {
        $.each(result.actionErrors, function(index, value) { 
        	errorMesgs.push(value);
        });
	}
	
	if (result.fieldErrors) {
        $.each(result.fieldErrors, function(index, value) {
        	errorMesgs.push(value[0]);
        });
	}
	
	if(errorMesgs.length > 0) {
		if(swal){
			//憒��swal�����蝙�
			swal(errorMesgs.join("\n"),'' ,'error');
		}else{
			alert(errorMesgs.join("\n"));
		}
        
        
        return true;
    }else{
    	//alert("�銵���");
    	
    	return false;
    }
}

function initRadioButtonClickSetTextbox(){
	//�radio�銝剜���alue閮剖�hidden甈��
	$('body').on('click', '.radio_click_to_hidden', function() {
	    $(this).parent().find('input[type="text"]').first().val($(this).val());
	});
	
	//�radio hidden鋡怨身�潔蒂trigger change event�����餈撠��adio閮剖��
	$('body').on('change', '.radio_hidden', function() {
		var v = $(this).val();
		$(this).parent().find('input[type="radio"][value="'+ v +'"]').attr('checked',true);		
	});
}

var cdpCommons = {
	//���uid
	uuid:function() {  
	    function S4() {  
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
	    }  
	    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4()); 
	},

	//bind data to form
	populateForm:function(frm,prefix, data) {   
		$.each(data, function(key, value){
    	
		    var $ctrl = $('[name="'+prefix+key+'"]', frm);  
		    switch($ctrl.attr("type"))  
		    {  
		        case "text" :   
		        case "hidden":  
			        $ctrl.val(value);   
			        break;   
		        case "radio" : 
		        case "checkbox":
			        $ctrl.each(function(){
			           if($(this).attr('value') == value) {  $(this).prop("checked",true); } });   
			        break;  
		        default:
		        	$ctrl.val(String(value)); 
		    } 
		    
	    });  
	},
	
	populateHtml:function(container,prefix,data){
		$.each(data, function(key, value){
			container.find('.'+prefix+key).html(value);
		});
	},
	
	//jquery�隞園��alue頧array
	toValueArray: function ($items){
		var ids = [];
		$items.each(function(idx,value){
			ids.push($(value).val());
		});
		return ids;
	}
} 

