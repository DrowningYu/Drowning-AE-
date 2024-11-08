function applyUpdate(){
    alert("需要安装python3并且网络可以登录Github");
    var scriptFile = new File($.fileName);  // 获取当前脚本文件路径
    var folderPath = scriptFile.parent.fsName;       // 获取当前脚本所在目录

    var pythonScriptPath = folderPath + "\\update.py";
    alert(pythonScriptPath);
    // 确保 Python 脚本存在b        
    var pythonScript = new File(pythonScriptPath);
    if (!pythonScript.exists) {
        alert("update.py 文件不存在！");
        return;
    }

    // 构造 cmd 命令行，/k 表示运行后不关闭 CMD 窗口
    var cmdCommand = 'cmd /k python "' + pythonScriptPath + '"';

    alert(cmdCommand);
    // 执行命令
    try {
        var data = system.callSystem(cmdCommand);
        alert(data);
    } catch (error) {
        alert("无法运行 update.py 文件：" + error.message);
    }
}
