import hello from "./files/hello.js"
import './files/main.css'
import './files/main.less';
import './files/main.scss';
import mainHtml from 'html-loader!./files/main.html';
import mainTpl from './files/main.tpl';

function func() {
    document.getElementById('app').innerHTML = mainHtml;

    // 传入模板中需要的参数
    document.getElementById('app-1').innerHTML = mainTpl({
        list: ['cat', 'dog']
    });

    console.log(hello());
}

window.onload = func()