export function formatDate(dstr,format){
	var date={
		"M+":dstr.getMonth()+1,
		"d+":dstr.getDate(),
		"h+":dstr.getHours(),
		"m+":dstr.getMinutes(),
		"s+":dstr.getSeconds()
	}
	//需要对年份进行特殊的处理 
	if(/(y+)/i.test(format)){
		format=format.replace(RegExp.$1,dstr.getFullYear().toString().substr(4-RegExp.$1.length))
	}
	
	//月 日 时
	for(var k in date){
		if(new RegExp("("+k+")").test(format)){
			format=format.replace(RegExp.$1,RegExp.$1.length==1?date[k]:("0"+date[k]).substr(-2))
		}
	}
	return format
}