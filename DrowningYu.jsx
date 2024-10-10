//脚本制作：Drowning鱼 如果有bug可以去b站给我私信反馈 


#include "DrowningYu/loopYu/loopYu.jsx"

function mainFunction(defaultPanel) {
    function buildUI(defaultPanel) {
        var dialog = defaultPanel instanceof Panel ? defaultPanel : new Window('palette', 'DrowningYu');
        var loopYuPanel = dialog.add("panel", undefined, undefined, { name: "loopYuPanel" });
        loopYuPanel.text = "帧选择器";
        loopYuPanel.orientation = "row";
        loopYuPanel.alignChildren = ["left", "top"];
        loopYuPanel.spacing = 10;
        loopYuPanel.margins = 20;
        loopYuPanel.alignment = ["left", "top"];


        var buttonLoopYu = loopYuPanel.add("button", undefined, undefined, { name: "buttonLoopYu" });
        buttonLoopYu.text = "应用";
        // buttonLoopYu.size = [50, 10];
        buttonLoopYu.onClick = applyLoopYu;

        // 添加帮助按钮
        var buttonHelpLoopYu = loopYuPanel.add("button", undefined, undefined, { name: "buttonHelpLoopYu" });
        buttonHelpLoopYu.text = "?";
        buttonHelpLoopYu.size = [12, 12]; // 设置帮助按钮大小
        buttonHelpLoopYu.enabled = true; // 确保按钮可用

        // 点击帮助按钮时调用 help() 方法
        buttonHelpLoopYu.onClick = helpLoopYu;

        return dialog;
    }



    var myPanel = buildUI(defaultPanel);
    myPanel.layout.layout();
    if (myPanel != null && myPanel instanceof Window) {
        myPanel.show();
    }
}




mainFunction(this);//this对应AE提供的默认窗口

