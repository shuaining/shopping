<?php if (!defined('THINK_PATH')) exit();?><div class="modal fade" id="myModal" tabindex="-1" role="dialog" 
   aria-labelledby="myModalLabel" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" 
               data-dismiss="modal" aria-hidden="true">            
            </button>
            <h4 class="modal-title" id="myModalLabel">
				添加用户
            </h4>
         </div>
         <div class="modal-body">
            <form class="form-horizontal" id="formid" >
			<input type="hidden" name="token" value="${token}"/>
			<div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">邮箱</label>
					<div class="col-sm-10">
					  <input type="email" class="form-control" id="inputEmail3" name="email" value="0"/>
					</div>
				  </div>
				 <div class="form-group">
					<label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
					<div class="col-sm-10">
					  <input type="text" class="form-control" id="inputEmail3" name="uname" id="t" value=""/>
					</div>
				  </div>
				 <div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">密码</label>
					<div class="col-sm-10">
					  <input type="password" class="form-control" id="inputPassword3" name="password" value=""/>
					</div>
				  </div>
				<div class="form-group">
					<label for="inputPassword3" class="col-sm-2 control-label">电话</label>
					<div class="col-sm-10">
					  <input type="phone" class="form-control" id="inputPassword3" name="phone" value=""/>
					</div>
				</div>
            </form>
         </div>
         <div class="modal-footer" style="text-align:center;">
            <button type="button" class="btn btn-default" 
               data-dismiss="modal">关闭
            </button>
            <button type="button" class="btn btn-primary" onclick = "checkUser()">提交</button>
         </div>
      </div>
</div>
</div>
<script>
function checkUser(){

    $.ajax({
    type : "POST",
    url : "<?php echo U('admin/Category/tianjia');?>",   
    success : function (data) {
         alert(data);  //data即为后y台返回的数据
    }
});

}

</script>
</script>