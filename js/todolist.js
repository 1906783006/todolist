$(function() {
    load();
    //   1.按下回车键把数据存储到本地内存
    // 数据存储的格式为var todolist = [{title:xxx, done:false}]
    $("#title").on("keydown", function(event) {
        if ($(this).val() == "") {
            alert("请输入您的待办事项哦哦");
        } else {
            if (event.keyCode === 13) {
                //先读取原来的数据
                var local = getDate();
                // console.log(local);
                //追加更新数据
                local.push({ title: $(this).val(), done: false });
                //再把更新的数据存储到本地
                saveDate(local);
                //最后渲染页面
                load();
                //存储数据之后吧框里的字删除
                $(this).val("");
            }
        }
    });
    // 2.添加删除事件
    //利用事件委托
    $("ol,ul").on("click", "a", function() {
        //先获取本地存储数据
        var data = getDate();
        //更新（删除）数据
        //从第索引号为index的开始删除，删除长度为1
        var index = $(this).attr("id");
        data.splice(index, 1);
        //把新数据存储到本地内存
        saveDate(data);
        //重新渲染页面
        load();
    });
    // 3.添加修改复选框事件
    $("ol,ul").on("click", "input", function() {
        //获取本地数据
        var data = getDate();
        //根据复选框的状态修改元素的done属性
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        //把修改后的数据存储到本地存储
        saveDate(data);
        //重新渲染页面
        load();
    });
    //定义读取本地存储数据的函数
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //定义把数据存储到本地的函数
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //定义渲染页面的函数
    function load() {
        var ulcount = 0;
        var olcount = 0;
        //重新加载页面之前要把之前渲染的页面清除
        $("ol,ul").empty();
        //读取本地存储数据
        var data = getDate();
        $.each(data, function(i, n) {
            if (n.done) {
                var li = $("<li><input type='checkbox' checked='checked'/><p>" + n.title + "</p><a id='" + i + "'></a></li>");
                $("ul").prepend(li);
                ulcount++;
            } else {
                var li = $("<li><input type='checkbox' /><p>" + n.title + "</p><a id='" + i + "'></a></li>");
                $("ol").prepend(li);
                olcount++;
            }
        });
        $("#todocount").text(olcount);
        $("#donecount").text(ulcount);
    }

})