// 当表单发生变化的时候
$("#addCategory").on("submit", function() {
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/categories",
        data: formData,
        success: function(response) {
            location.reload();
        }
    });
    return false
})

// 用户展示
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response) {
        var html = template('categoryListTpl', { data: response });
        $('#categoryBox').html(html);
    }
});
// 为编辑按钮添加点击事件
$('#categoryBox').on("click", ".edit", function() {
        var id = $(this).attr("data-id")
        $.ajax({
            type: "get",
            url: "/categories/" + id,
            success: function(response) {
                var html = template("modifyCategoryTpl", response)
                $('#formBox').html(html);
            }
        });
    })
    // 修改后数据后提交
$('#formBox').on("submit", "#modifyCategory", function() {
        var formData = $(this).serialize();
        var id = $(this).attr("data-id")
        $.ajax({
            type: "put",
            url: "/categories/" + id,
            data: formData,
            success: function(response) {
                location.reload();
            }
        });
        return false
    })
    //删除事件
$('#categoryBox').on("click", ".delete", function() {
        if (confirm('您真的要删除吗')) {
            var id = $(this).attr("data-id")
            $.ajax({
                type: "delete",
                url: "/categories/" + id,
                success: function(response) {
                    location.reload();
                }
            });
        }
    })
    // 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');
// 当全选按钮发生改变时
selectAll.on("change", function() {
        var status = $(this).prop("checked")
        if (status) {
            deleteMany.show();
        } else {
            deleteMany.hide();
        }
        $('#categoryBox').find('input').prop('checked', status);
    })
    // 当用户前面的复选框状态发圣盖变时
$("#categoryBox").on("change", function() {
    var inputs = $("#categoryBox").find("input")
    if (inputs.length == inputs.filter(":checked").length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }
    if (inputs.filter(":checked").length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
})
deleteMany.on("click", function() {
    var ids = []
        // 获取选中的用户
    var checkedUser = $('#categoryBox').find('input').filter(':checked');
    checkedUser.each(function(index, elenemt) {
        ids.push($(elenemt).attr("data-id"))
    })
    if (confirm("您真的要删除吗")) {
        $.ajax({
            type: "delete",
            url: "/categories/" + ids.join("-"),
            success: function(response) {
                location.reload();
            }
        });
    }

})