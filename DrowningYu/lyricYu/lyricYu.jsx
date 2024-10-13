function applyLyricYu(link,translateFlag,input_comp_fra){
    // alert("applyLyricYu");
    // alert(link);
    // alert(translateFlag);
    // alert(input_comp_fra);
    

    // input_comp_length=parseInt(input_length.text);

    // input_comp_height=parseInt(input_height.text);

    // var flag=radiobutton1.value;
    var floder_path="";
    var flag=false;
    var type=get_type(link);
    var values = get_id(link);
    var id=values[0];
    var user_id=values[1];

    if(type===1){//单曲
        song(id,user_id,translateFlag,floder_path,input_comp_fra);
        alert("单曲合成已创建");
    }
    else if(type===2){//歌单
        alert("歌单功能已被阉割 如果想继续使用可以启动隐藏在帮助界面的老版本（老版本需要进行一些设置）");
    }
    else if(type===3){//专辑
        alert("专辑功能已被阉割 如果想继续使用可以启动隐藏在帮助界面的老版本（老版本需要进行一些设置）");
    }
    else if(type===4){//歌手
        alert("歌手功能没有做");
    }
    else if(type===0){
        alert("无效输入");
    }
}



function helpLyricYu(){
    // alert("helpLyricYu");
    var dialog = new Window("dialog");
    dialog.text = "帮助";
    dialog.orientation = "column";
    dialog.alignChildren = ["center", "top"];
    dialog.spacing = 10;
    dialog.margins = 16;

    dialog.location = [100, 100];
    var statictext6 = dialog.add("statictext", undefined, undefined, { name: "statictext6" });
    statictext6.text = "建议不要把这个对话框居中 容易挡住新弹出的窗口";

    var statictext1 = dialog.add("statictext", undefined, undefined, { name: "statictext1" });
    statictext1.text = "功能介绍：一键获取网易云歌词与翻译 自动对轴";

    var statictext2 = dialog.add("statictext", undefined, undefined, { name: "statictext2" });
    statictext2.text = "使用教程：复制一个网易云歌曲链接到指定位置 点击应用";

    var statictext3 = dialog.add("statictext", undefined, undefined, { name: "statictext3" });
    statictext3.text = "点击该按钮跳转b站的视频介绍以及演示";

    var button1 = dialog.add("button", undefined, undefined, { name: "button1" });
    button1.text = "bilibili/[AE脚本] 一键加载网易云歌词";
    button1.onClick = function () {
        var command = 'explorer https://www.bilibili.com/video/BV1uJtPe9E1Q/';
        var code = system.callSystem(command);
    }

    var group1 = dialog.add("group", undefined, { name: "group1" });
    group1.orientation = "row";
    group1.alignChildren = ["left", "center"];
    group1.spacing = 10;
    group1.margins = 0;

    var statictext4 = group1.add("statictext", undefined, undefined, { name: "statictext4" });
    statictext4.text = "如果点按钮没反应 可以粘贴该链接到浏览器打开";

    var edittext1 = group1.add('edittext {properties: {name: "edittext1"}}');
    edittext1.text = "https://www.bilibili.com/video/BV1uJtPe9E1Q/";


    var statictext5 = dialog.add("statictext", undefined, undefined, { name: "statictext5" });
    statictext5.text = "该版本为视频版本的重置阉割版 本版本不需要安装python";


    var button2 = dialog.add("button", undefined, undefined, { name: "button2" });
    button2.text = "启用老版";
    button2.onClick = function () {
        dialog.close();
        
        var currentScriptFile = File($.fileName);
        var targetScriptName = "spider163.jsx";
        var targetScriptPath = new File(currentScriptFile.path + "/" + targetScriptName);
        // alert(targetScriptPath)
        $.evalFile(targetScriptPath);
        
    }

    dialog.show();
}



function song(id,user_id,translateFlag,floder_path,input_comp_fra){

    var dataString=getData(id);
    // alert(dataString);
    var dataJson = JSON.parse(dataString);
    // alert(dataJson['lrc']['lyric']);
    var song_comp=creat_song_comp(dataJson,id,translateFlag,input_comp_fra);

}


function creat_song_comp(data,id,translateFlag,input_comp_fra){
    var comp=comp_is_exists(id);
    var lines = data['lrc']['lyric'].split('\n');
    var text_layer;

    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];

        if(line){

            text_layer=creat_text(comp,line,text_layer,[0,comp.height/2]);
        }

    }

    if(translateFlag){
        var text_layer_2;
        var lines = data['tlyric']['lyric'].split('\n');
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if(line)
                text_layer_2=creat_text(comp,line,text_layer_2,[0,comp.height/2+200]);
        }
    }
    return comp;
    function comp_is_exists(name){
        for (var i = 1; i <= app.project.numItems; i++) {
            var comp = app.project.item(i);
            if(comp.name==name){
              return comp;
            }
          }
        //   alert(input_comp_fra);
          comp=app.project.items.addComp(name, 1920, 1080, 1, 300, input_comp_fra);
          return comp;
    }
    function creat_text(comp,line,last_text,layer_position){
        var sta_t=0;
        var pattern = /\[(\d{2}):(\d{2})\.(\d{2,3})?\](.*)/;
        var match = line.match(pattern);
        if (match) {
          var sta_m = parseInt(match[1],10); 
          var sta_s = parseInt(match[2],10); 
          var sta_ms = match[3];
          var textContent = match[4];
      
          if (sta_ms.length === 2) {
            sta_t=sta_m*60+sta_s+parseInt(sta_ms,10)*0.01;
          } else if (sta_ms.length === 3) {
            sta_t=sta_m*60+sta_s+parseInt(sta_ms,10)*0.001;
          }
        } else {
          sta=0;
          textContent='Error';
        }
        sta_time=fra_to_fra(comp,sta_t);
        if(last_text){
          last_text.outPoint=sta_time;//fra_to_fra(comp,sta_t,1);
        }
        var textLayer = comp.layers.addText();
        textLayer.startTime = sta_time;
        textLayer.property("Source Text").setValue(textContent);
        textLayer.position.setValue(layer_position);
        return textLayer;
    }
    function fra_to_fra(comp,sta_t){
        sta_fra=Math.round(sta_t*comp.frameRate);
        return (sta_fra/comp.frameRate*1.0);
    }

}








function get_type(link){
    if(link.indexOf("song")!==-1){
        return 1;
    }
    else if(link.indexOf("playlist")!==-1){
        return 2;
    }
    else if(link.indexOf("album")!==-1){
        return 3;
    }
    else if(link.indexOf("artist")!==-1){
        return 4;
    }
    else{
        return 0;
    }
}

function get_id(link){
    pattern=/id=(\d+)(?:&userid=(\d+))?/;
    var match=link.match(pattern);
    var id=match[1];
    var userid=match[2] || null;
    return [id,userid];
}

function getData(songID) {
    var url = "http://music.163.com/api/song/lyric?id=" + songID + "&lv=-1&kv=-1&tv=-1";
    var scriptFile = new File($.fileName);
    var scriptFolder = scriptFile.parent;
    var tempFile = new File(scriptFolder.fullName + '/temp.json');
    system.callSystem("cmd.exe /c \"curl \"" + url + "\" -o \"" + tempFile.fsName + "\"\"");//我用了好多好多方法去获取网页内容 都是因为编码问题输出乱码 最后还是月离文档给我思路 感谢月离爹
    tempFile.open('r'); 
    var fileContent = tempFile.read(); 
    tempFile.close(); 
    return fileContent;
}



function getLyrics(dataString) {
    var lyrics = [];
    var regex = /"lyric":"(.*?)"/g; // 匹配 "lyric":"..." 格式的内容
    var match;
    // 遍历所有匹配项并提取内容
    while ((match = regex.exec(dataString)) !== null) {
        lyrics.push(match[1]); // 提取括号中的内容
    }
    return lyrics;
}
