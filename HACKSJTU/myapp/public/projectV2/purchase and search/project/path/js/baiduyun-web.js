window.onload=function(){
	// 生成文件夹
	var box=document.querySelector('.box');
	var children=[]
	var dirNum=document.querySelector('.route-right')
	var route=document.querySelector('.route-left')
	var select=document.querySelector('.kuang')
	var selectText=document.querySelector('.select-text')
	var setNew=document.querySelector('.setNew')
	var str=''
	var idnum,mb,n,PID,k
	var moveTo=document.querySelector('.sb')
	var moveList=document.querySelector('.moveList')
	var current1
	var current2
	var xs=document.querySelector('.xs')
	var sbselector=document.querySelector('.select')

	window.location.hash='grid'
	// 切换哈希值生成文件或列表
	xs.onclick=function(){
		if(window.location.hash=='#grid'){
			window.location.hash='#list'
			box.innerHTML=''
			createDirList(data)
			sbselector.innerHTML+='<span class="size1">大小</span><span class="riqi1">日期</span>'
		}else{
			window.location.hash='#grid'
			box.innerHTML=''
			createDir(data)
		}
	}


	//生成文件夹
	createDir(data)
	//生成文件夹
	function createDir(data){
			box.innerHTML=''
			for (var i = 0; i < data.length; i++) {
				if(data[i].pId==-1){
					data=data[i].child
				}
				//生成文件夹节点
				var div=document.createElement('div')
				var span=document.createElement('span')
				var is=document.createElement('i')
				span.innerHTML=data[i].name
				div.className=data[i].cl;
				span.className='dir-name'
				is.className='chose'
				is.innerHTML='✔'
				//将节点放入结构
				div.appendChild(span)
				div.appendChild(is)
				box.appendChild(div)
				div.ID=data[i].id
				div.PID=data[i].pId			
			}
		}
	//生成文件列表
	function createDirList(data){
		box.innerHTML=''
		for (var i = 0; i < data.length; i++) {
			if(data[i].pId==-1){
				data=data[i].child
			}
			//生成文件夹节点
			var div=document.createElement('div')
			div.className=data[i].cll;
			div.innerHTML='<i class="kuang1"></i><span class="pic"><img src="img/FolderType.png"></span><span class="item">'+data[i].name+'</span><span class="size">-</span><span class="riqi">'+data[i].rq+'</span>'
			box.appendChild(div)
			div.ID=data[i].id
			div.PID=data[i].pId			
		}
	}


	//已加载文件数量
	createDirNum()

	//全选功能
	select.onclick=function (){
		choseAll()
		console.log(1)
	}

	//文件夹点击事件集合
	box.onclick=function(e){
		e.preventDefault();
		mb=e.target;
		if(mb.classList.contains('dir')){
			//点击进入文件夹
			dirIn(data,idnum)
		}else if(mb.classList.contains('dir-name')){
			//重命名
			if(box.querySelectorAll('.bj').length){

			}else{
				resetName()
			}
		}else if(mb.classList.contains('chose')){
			//选中文件夹
			chose()
			deleteDir()
			move()
		}else if(mb.classList.contains('dir-list')){
			dirListIn(data,idnum)
		}else if(mb.classList.contains('kuang1')){
			chose()
			mb.innerHTML='✔'
		}else if(mb.classList.contains('item')){
			resetName()
		}
	}
	//点击进入文件夹
	function dirIn(data,idnum){
		children=[]
		idnum=mb.ID
		PID=mb.pId
		getChildren(data,idnum)
		//console.log(children)
		createDir(children)
		children=[]
		selectText.innerHTML='全选'
		select.classList.remove('all')
		//生成已加载文件数量
		createDirNum()
		//生成路径
		getRoute(data,idnum)
		//新建文件夹
		getNewDir(idnum)
		// console.log(idnum)
	}


	//点击进入文件列表
	function dirListIn(data,idnum){
		children=[]
		idnum=mb.ID
		PID=mb.pId
		getChildren(data,idnum)
		//console.log(children)
		createDirList(children)
		children=[]
		selectText.innerHTML='全选'
		select.classList.remove('all')
		//生成已加载文件数量
		createDirNum()
		//生成路径
		getRoute(data,idnum)
		//新建文件夹
		getNewDir(idnum)
		// console.log(idnum)
	}
	//点击选中文件夹,再次点击取消选中
	function chose(){
		mb.classList.toggle('bj')
		mb.parentNode.classList.toggle('active')
		n=box.querySelectorAll('.bj').length
		selectText.innerHTML='已选中'+ n+'个文件/文件夹'
		if(n<box.children.length){
			select.classList.remove('all')
		}
		if(n==box.children.length){
			select.classList.add('all')
		}
		if(n=='0'){
			selectText.innerHTML='全选'
			select.classList.remove('all')
		}
		if(mb.classList.contains('bj')){
			getDataById(data,mb.parentNode.ID).check=true
			//console.log(getDataById(data,mb.parentNode.ID).check)
		}else{
			getDataById(data,mb.parentNode.ID).check=false
			//console.log(getDataById(data,mb.parentNode.ID).check)
		}
		

	}
	//全选功能
	function choseAll(){
		select.classList.toggle('all')
		if(select.classList.contains('all')){
			for(var i=0;i<box.children.length;i++){
				box.children[i].classList.add('active')
				box.children[i].querySelector('i').classList.add('bj')
			}
			var current=box.querySelectorAll('.active')
			for(var i=0;i<current.length;i++){
				getDataById(data,current[i].ID).check=true
			}
			n=box.querySelectorAll('.bj').length
			selectText.innerHTML='已选中'+ n+'个文件/文件夹'
			deleteDir()
			move()
		}else{
			var current=box.querySelectorAll('.active')
			for(var i=0;i<current.length;i++){
				getDataById(data,current[i].ID).check=false
			}
			for(var i=0;i<box.children.length;i++){
				box.children[i].classList.remove('active')
				box.children[i].querySelector('i').classList.remove('bj')
			}
			
			selectText.innerHTML='全选'
			deleteDir()
			move()
		}
	}
	//文件夹重命名
	function resetName(e){
		var input=document.createElement('input')
		mb.parentNode.appendChild(input);
		if(window.location.hash=='#list'){
			input.className='changeName1'
		}else{
			input.className='changeName'	
		}
		
		input.value=mb.innerHTML
		input.focus()
		input.select()
		input.onblur=function(){
			if(input.value==''){
				input.style.display='none'
			}else{
				input.style.display='none'
				if(window.location.hash=='#list'){
					input.parentNode.querySelector('.item').innerHTML=input.value;
				}else{
					input.parentNode.querySelector('.dir-name').innerHTML=input.value;
				}
				//console.log(getDataById(data,mb.parentNode.ID))
				getDataById(data,mb.parentNode.ID).name=input.value;
				input.parentNode.removeChild(input)
				getRoute(data,idnum)
			}
		}
	}

	//生成路径
	function getRoute(data,idnum){
		// console.log(getDataById(data,t).check)
		//console.log(getDataByCheck(data,true))
		str=''
		var routeData=getParentDataBypid(data,idnum).reverse()
		for (var i =0 ; i<routeData.length ; i++) {
			//var a=document.createElement('a')
			//a.index=routeData[i].id
			//route.appendChild(a)
			str+='<a href="javascript:;" dhNum='+routeData[i].id+'>'+routeData[i].name+'</a>   丨   '
		}
		route.innerHTML=str

		route.onclick=function(e){
			children=[]
			console.log(e.target.getAttribute('dhNum'))
			dhNum_=e.target.getAttribute('dhNum')*1
			if(window.location.hash=='#grid'){
				createDir(getChildren(data,dhNum_))
			}else{
				createDirList(getChildren(data,dhNum_))
			}
			getRoute(data,dhNum_)
		}
	}

	//加载文件数量
	function createDirNum(){
		dirNum.innerHTML='已全部加载，共'+box.children.length+'个';
	}

		
	//新建文件夹
	getNewDir(PID)
	function getNewDir(PID){
		setNew.onclick=function(){
			var newDir={
				name: '新建文件夹', 
				id: getMaxId(data),
				pId:PID,
				cl:'dir',
				cll:'dir-list',
				rq:2017-03-23,
				check:false,
				child:[],
			}
			var children=[]
	     	if(PID>=-1){
	     		getDataById(data,PID).child.push(newDir)
	     		if(window.location.hash=='#list'){
	     			createDirList(getDataById(data,PID).child)
	     		}else{
	     			createDir(getDataById(data,PID).child)
	     		}
	     		
	     	}else{
	     		data.push(newDir)
	     		if(window.location.hash=='#list'){
	     			createDirList(data,PID)
	     		}else{
	     			createDir(data,PID)
	     		}
	     	}
		}
	}

	//删除文件夹
	function deleteDir(){
		var dele=document.querySelector('.dele')
		dele.onclick=function(){

			var deleData=box.querySelectorAll('.active')
			if(deleData.length>0){
				for(var i=0;i<deleData.length;i++){
					deleData[i].classList.remove('bj')
					box.removeChild(deleData[i])
					removeByValue(getDataById(data,deleData[i].PID).child, getDataById(data,deleData[i].ID))
					console.log(data)
				}
			}
			chose()
		}
		
	}
	//console.log(data)
			
	//文件夹的移动到
	function move(){
		//console.log(moveList)
		moveTo.onclick=function(){
			moveList.style.display='block';
			moveList.innerHTML=	 createTreeMenu(data)+'<li><a href="javascript:;" class="qd ml30 mr20">确定</a><a href="javascript:;" class="cancal">取消</a></li>'
			drap()
		}
		moveList.onclick=function(e){
			// console.log(typeof())
			if(e.target.classList.contains('treeItem')){
				for(var i=0;i<moveList.querySelectorAll('.active1').length;i++){
					moveList.querySelectorAll('.active1')[i].classList.remove('active1')
					console.log(1)
				}
				k=e.target.dataset.dhnum*1
				e.target.classList.toggle('active1')
				current1=getDataById(data,k)
				current2=getDataByCheck(data,true)
				// console.log(current2)
				for(var i=0;i<current2.length;i++){
					if(current2[i].pId==current1.id){
						alert('不能移动到本身')
						e.target.classList.remove('active1')
					}
					if(current2[i].pId==-1){
						alert('不能移动根目录')
						e.target.classList.remove('active1')
						moveList.style.display=''
					}
				}
			}
			
			
			if(e.target.classList.contains('qd')){
				//getDataById(data,k).child.push(getDataByCheck(data,true)[0])
				
				//console.log(current2)
				for(var i=0;i<current2.length;i++){
					current1.child.push(current2[i])
					removeByValue(getDataById(data,current2[i].pId).child,current2[i])
					current2[i].check=false
					current2[i].pId=k;
				}	
				createDir(current1.child)
				moveList.style.display=''
				getRoute(data,k)
				choseAll()
				//console.log(data)
			}
		}
	}

	//拖拽函数
	function drap(){
		moveList.onmousedown=function(e){
			e.preventDefault()
			var dx=e.pageX-getRect(moveList,'left')
			var dy=e.pageY-getRect(moveList,'top')
			document.onmousemove=function (e) {
				var l=e.pageX-dx
				var t=e.pageY-dy
				moveList.style.left=l+'px'
				moveList.style.top=t+'px'
			}
			document.onmouseup = function (){
	          this.onmouseup = this.onmousemove = null;
	        }
		}
	}

	//生成树状菜单
	function createTreeMenu(data){
	  var str = '';
	  for(var i=0;i<data.length;i++){
	  	str+='<li><a href="javascript:;" class="treeItem" data-dhNum="'+data[i].id+'">'+data[i].name+'</a>';
	  	str+=data[i].child?`<ul>${createTreeMenu(data[i].child)}</ul>`:'';
	  	str+='</li>'
	  }
		return str
	}

	//框选
	kuangxuan()
	function kuangxuan(){
		box.onmousedown=function(e){
			e.preventDefault()
			var dx=e.clientX
			var dy=e.clientY
			var div=document.createElement('div')
			div.className='kuangxuan'
			this.appendChild(div)
			this.onmousemove=function(e){
				var moveX=e.clientX
				var moveY=e.clientY
				var L = Math.min(moveX-getRect(box,'left'), dx-getRect(box,'left'));
		        var T = Math.min(moveY-getRect(box,'top'), dy-getRect(box,'top'));
		        var W = Math.abs(moveX - dx);
		        var H = Math.abs(moveY - dy);
		        div.style.left = L + 'px';
		        div.style.top = T + 'px';
		        div.style.width = W + 'px';
		        div.style.height = H + 'px';

		        for(var i=0;i<box.querySelectorAll('.dir').length;i++){
		        	if(duang(div,box.querySelectorAll('.dir')[i])){
		        		box.querySelectorAll('.dir')[i].classList.add('active')
		        		box.querySelectorAll('.dir')[i].querySelector('.chose').classList.add('bj')
		        		continue
		        	}
		        	if(!duang(div,box.querySelectorAll('.dir')[i])){
		        		box.querySelectorAll('.dir')[i].classList.remove('active')
		        		box.querySelectorAll('.dir')[i].querySelector('.chose').classList.remove('bj')
		        		continue
		        	}
		        	n=box.querySelectorAll('.bj').length
		        	if(n==0){
		        		continue
		        	}
					selectText.innerHTML='已选中'+ n+'个文件/文件夹'
		        }
		        if(box.querySelectorAll('.bj').length*1==box.querySelectorAll('.dir').length*1){
		        	select.classList.add('all')
		        	n=box.querySelectorAll('.bj').length
					selectText.innerHTML='已选中'+ n+'个文件/文件夹'
		        }
			}
			document.onmouseup = function (){
		        this.onmouseup = box.onmousemove = null;
		        
		        box.removeChild(div);

		    }
		}	
	}

// getMaxId    
	function getMaxId(data){
		var n = 0;
	    data.forEach(function(item, i) {
	    	if(n < item.id){
	          n = item.id;
	        }
	    });
	    return n + 1;
	}
//获取所有的子元素	
    function getChildren(data,idnum){
		for (var i = 0; i < data.length; i++) {
	      	//console.log(data[i])
	      	if(data[i].pId===idnum){
	      		children.push(data[i])
	      	}else if(data[i].child){
	      		getChildren(data[i].child,idnum)
	      	}

	      }
	     return children
	}


	//通过id获取数据
	function getDataById (data, id){
	  var item = null;
	  for(var i=0; i<data.length; i++){
	    if(data[i].id === id){
	      item = data[i];
	      break;
	    }
	    if(!item && data[i].child){
	      item = getDataById(data[i].child, id);
	      if(item){
	        break;
	      }
	    }
	  }
	  return item;
	};

	//通过check获取数据
	function getDataByCheck (data, checkV){
	  var item =[];
	  for(var i=0; i<data.length; i++){
	    if(data[i].check === checkV){
	      item.push(data[i])
	    }
	    if(data[i].child){
	      // getDataByCheck(data[i].child, checkV)
	      item=item.concat(getDataByCheck(data[i].child, checkV))
	    }

	  }
	  return item;
	};

	//通过Pid获取所有父级及本身
	function getParentDataBypid (data,idnum){
		var item=[]
		var current=getDataById(data,idnum)

			if (current) {
				item.push(current)
				item=item.concat(getParentDataBypid(data,current.pId))
			}
		
		return item
	}



	//删除数组中指定的数据
	function removeByValue(arr, val) {
	  for(var i=0; i<arr.length; i++) {
	    if(arr[i] == val) {
	      arr.splice(i, 1);
	      break
	    }
	  }
	}



	//获取元素绝对位置
	function getRect(obj, type){
      var rect = obj.getBoundingClientRect();
      switch(type){
        case 'left':
          return rect.left;
        break;
        case 'top':
          return rect.top;
        break;
        case 'right':
          return rect.right;
        break;
        case 'bottom':
          return rect.bottom;
        break;
      }
    };


	//头部用户信息悬停效果
	var nameInfo=document.querySelector('.name-info')
	var jt=document.querySelector('.jt')
	var infoList=document.querySelector('.info-list')
	nameInfo.onmouseover=function(){
		jt.innerHTML='A'
		infoList.style.display='block'
	}
	nameInfo.onmouseout=function(){
		jt.innerHTML='z'
		infoList.style.display='none'
	}


	function duang(current, target){
      var currentRect = current.getBoundingClientRect();
      var targetRect = target.getBoundingClientRect();
      var currentLeft = currentRect.left, 
          currentTop = currentRect.top,
          currentRight = currentRect.right,
          currentBottom = currentRect.bottom;
      var targetLeft = targetRect.left, 
          targetTop = targetRect.top,
          targetRight = targetRect.right,
          targetBottom = targetRect.bottom;
      return currentRight > targetLeft && currentBottom > targetTop && currentLeft < targetRight && currentTop < targetBottom;
    };
}