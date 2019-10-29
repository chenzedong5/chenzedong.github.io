import React, {Component} from 'react';
import BgImg from './img/xinliceshi52.png';
import QrImg from './img/qrcode2.jpg';
import {Icon} from 'antd-mobile';
import './index.less';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: ''
        };
        this.createMyResult = this.createMyResult.bind(this);
    }

    componentDidMount() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
       
        this.createMyResult(canvas, ctx, this.props.resultParams, BgImg, QrImg)
    }

    async createMyResult(canvas, ctx, obj, bgImgPath, qrImgPath) {
        let bg = await this.preloadImage(bgImgPath);
        let qr = await this.preloadImage(qrImgPath);

        this.convertImageToCanvas(canvas, ctx, bg);
        this.drawMyImg(ctx, {
            x: 375,
            y: 800,
            num: 6,
            r: 200,
            fillStyle: '#000',
            strokeStyle: '#000'
        }, obj);

        ctx.font = " bold 48px  -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif";
        ctx.textAlign = 'left';
        ctx.fillStyle = '#c9174b';
        ctx.fillText(obj.title, -60, -470);
        ctx.fillStyle = '#000';
        ctx.fillText('测试', 200, -470);

        ctx.drawImage(qr, -70, 1225, 186, 186);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 44px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif';
        for (let i = 0; i < obj.arr.length; i++) {
            ctx.fillText(obj.arr[i].title, -270, 570 + i * 100);
        }
        ctx.font = '500 22px Open Sans,Arial,Microsoft Yahei,微软雅黑';
        for (let i = 0; i < obj.arr.length; i++) {
            this.write_text_other_line_auto(ctx, "", "left", "#000", obj.arr[i].description, 10, 555 + i * 101, 13, 24, 0);
        }
        let imgSrc = canvas.toDataURL("image/png");
        this.setState({
            imgSrc: imgSrc
        })
    }

    preloadImage(path) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = ()=>resolve(image);
            image.onerror = reject;
            image.src = path;
        });
    };

    drawSanjiao(ctx, x1, y1, x2, y2, x3, y3, color, type) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx[type + 'Style'] = color;
        ctx.closePath();
        ctx[type]();
    };

    drawMyImg(ctx, conf, obj) {
        let x = conf && conf.x || 0;  //中心点x坐标
        let y = conf && conf.y || 0;  //中心点y坐标
        let num = conf && conf.num || 3;   //图形边的个数
        var r = conf && conf.r || 100;   //图形的半径
        var width = conf && conf.width || 5;
        var fillStyle = conf && conf.fillStyle;
        var strokeStyle = conf && conf.strokeStyle;
        ctx.translate(x, y);
        ctx.font = "500 24px Open Sans,Arial,Microsoft Yahei,微软雅黑";    //设置字体和字体大小
        ctx.direction = 'ltr';
        ctx.textAlign = 'center';
        ctx.fillStyle = fillStyle;
        for (let i = 0; i < num; i++) {
            if(obj.arr[i]){
                var textX = (r + 55) * Math.cos((2 * Math.PI * i / num) + Math.PI / 4);  // 字对的上位置
                var textY = (r + 55) * Math.sin((2 * Math.PI * i / num) + Math.PI / 4);
                var pointX = textX;
                var pointY = textY + 25;
                ctx.fillText(obj.arr[i].title, textX, textY);
                ctx.fillText(obj.arr[i].point, pointX, pointY);
            }
        }
        // 画圆形
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
        ctx.lineWidth = width;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();

        ctx.rotate(Math.PI / 4);
        ctx.beginPath();
        ctx.moveTo(r, 0);
        let six = [];
        for (let i = 0; i < num; i++) {
            var X = r * Math.cos(2 * Math.PI * i / num);
            var Y = r * Math.sin(2 * Math.PI * i / num);
            six.push([X, Y]);
            ctx.lineTo(X, Y);
        }
        ctx.closePath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = width;
        ctx.lineJoin = 'round';
        ctx.stroke();
        // 画六条射线
        for (let i = 0; i < six.length; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(six[i][0], six[i][1]);
            ctx.closePath();
            ctx.stroke();
        }

        // 画不规则多边形&不同颜色
        // 求出不同的半径 算出 坐标， 然后连线
        ctx.beginPath();
        ctx.moveTo(r, 0);
        let r0 = (obj.arr[0]&&obj.arr[0].point||0) / 100 * r;
        six.length = 0;
        ctx.moveTo(r0, 0);
        for (let i = 0; i < num; i++) {
            if(obj.arr[i]){
                let r1 = obj.arr[i].point / 100 * r;
    
                let X = r1 * Math.cos(2 * Math.PI * i / num);
                let Y = r1 * Math.sin(2 * Math.PI * i / num);
                six.push([X, Y]);
                ctx.lineTo(X, Y);
            }
        }
        ctx.closePath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = width;
        ctx.lineJoin = 'round';
        ctx.stroke();

        for (let i = 0; i < six.length; i++) {
            if (i === six.length - 1) {
                this.drawSanjiao(ctx, 0, 0, six[i][0], six[i][1], six[0][0], six[0][1], obj.arr[i].color, 'fill')
            } else {
                this.drawSanjiao(ctx, 0, 0, six[i][0], six[i][1], six[i + 1][0], six[i + 1][1], obj.arr[i].color, 'fill')
            }
        }
        for (let i = 0; i < six.length; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(six[i][0], six[i][1]);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.rotate(-Math.PI / 4);
    }

    convertImageToCanvas(canvas, ctx, image) {
        canvas.width = image.width;
        canvas.height = image.height;
        console.log(image, 226);
        console.log(image.width, image.height);
        console.log(`canvas宽：${canvas.width}, canvas高： ${canvas.height}`);
        canvas.getContext("2d").drawImage(image, 0, 0);
        ctx.drawImage(image, 0, 0);
    }

    write_text_other_line_auto(ctx, font, align, color, text, x, y, line_count, line_height, text_indent) {
        ctx.font = font;
        ctx.textAlign = align;
        ctx.fillStyle = color;
        let row_count = text.length / line_count;
        let first_row_line_count;
        let x1, y1;
        for (let i = 0; i <= row_count; i++) {
            if (i == 0) {
                ctx.fillText(text.substring(0, (line_count * (i + 1) - text_indent)), x + (text_indent * 26), y + (line_height * i));
                first_row_line_count = (line_count * (i + 1) - text_indent);
            }
            else {
                ctx.fillText(text.substring(line_count * (i - 1) + first_row_line_count, first_row_line_count + line_count * i), x, y + (line_height * i));
                y1 = y + (line_height * i);
            }
        }
        return y1;
    }

    render() {
        return (
            <div className="App" style={{width:'100%',textAlign:"center",lineHeight:'100%'}}>
               {this.state.imgSrc?<img style={{width:'100%',minHeight:'100vh'}} src={this.state.imgSrc} alt=""/>:<Icon className='icon-loading' size={'lg'} color={'#e61550'} style={{marginTop:'50%'}} type='loading'/>}
            </div>
        );
    }
}

export default App;
