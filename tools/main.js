$(window).load(function () {
    $.each(document.styleSheets, function (sheetIndex, sheet) {
        var isShow = false;
        if (sheet.href && sheet.href.indexOf('font-awesome')) {
            $.each(sheet.cssRules || sheet.rules, function (ruleIndex, rule) {
                if (rule.cssText.indexOf(".fa-glass::before") != -1) {
                    isShow = true;
                }
                if (isShow && rule.cssText.indexOf("::before") != -1) {
                    var text = rule.cssText;
                    var className = text.substr(1, text.indexOf("::before") - 1);
                    var name = className.replace(/fa-/g, '');
                    name = name.replace(/(\b[a-z](?!\s))/g, function (x) {
                        return x.toUpperCase();
                    });
                    var template = '<div><span class="icon fa {CLASS}" cssname="{NAME}" csscontent=\'{CONTENT}\'></span><br/><span>{NAME}</span></div>';
                    var classContent = text.substring(text.indexOf('{')).replace(/(content:)*;* *{*}*/g, '');
                    $("#stage").append(template.replace(/{CLASS}/g, className).replace(/{CONTENT}/g, classContent).replace(/{NAME}/g, name));
                }
            });
        }
    });

    $(document).ready(function () {
        SetIconTheme(0);
        $('.icon').click(function () {
            $(this).toggleClass('selected');
            RenderCanvas($(this).attr('csscontent'));
        });
    });
});

function SetIconBg(value) {
    $('.icon').css('background', '#' + value);
    document.getElementById('colorBg').jscolor.fromString(value);
}

function SetIconColor(value) {
    $('.icon').css('color', '#' + value);
    document.getElementById('colorFg').jscolor.fromString(value);
}
function ClearSelected()
{
    $('.icon').removeClass('selected');
}

function SetIconTheme(value) {
    switch (+value) {
        case 0:
            SetIconBg('888888');
            SetIconColor('FFFFFF');
            break;
        case 1:
            SetIconBg('C9CEBD');
            SetIconColor('64403E');
            break;
        case 2:
            SetIconBg('F2F4F3');
            SetIconColor('5E503F');
            break;
        case 3:
            SetIconBg('073B4C');
            SetIconColor('FFD166');
            break;
        case 4:
            SetIconBg('64403E');
            SetIconColor('C9CEBD');
            break;
        case 5:
            SetIconBg('5E503F');
            SetIconColor('F2F4F3');
            break;
        case 6:
            SetIconBg('FFF3E3');
            SetIconColor('99CC2D');
            break;
    }
}

function Download() {
    $('.selected').each(function(){
        RenderCanvas($(this).attr('csscontent'));
        var anchor = document.getElementById('lnkAnchor');
        downloadCanvas(anchor, $(this).attr('cssname') + '.png', document.getElementById('canvas'));
        anchor.click();
    });
}

function RenderCanvas(cssContent) {

        var canvasObj = document.getElementById('canvas');
        var context = canvasObj.getContext('2d');
        context.clearRect(0, 0, canvasObj.width, canvasObj.height);

        // Filling out the background with color and stroking it.
        context.fillStyle = "#" + $('#colorBg').val(); // Use any background color of your choice.
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();

        context.save();
        context.shadowColor ="rgba(0, 0, 0,0.5)";
        context.shadowOffsetX ="2";
        context.shadowOffsetY ="2";
        context.shadowBlur = "5";
        context.fillStyle = "#" + $('#colorFg').val();
        context.font = '55px FontAwesome';// You can use any font size of your size.
        var text = cssContent.replace(/"/g,"");
        var width = context.measureText(text).width;
        context.fillText(text, Math.floor(canvasObj.width/2 - width/2) , 80);
        context.restore();
}

function downloadCanvas(anchor, file, canvas) {
    anchor.href = canvas.toDataURL();
    anchor.download = file;
}
