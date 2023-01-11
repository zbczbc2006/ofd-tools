## 源码说明
ofd格式文件浏览器渲染工具，拿了[DLTech21/ofd.js](https://github.com/DLTech21/ofd.js)项目的源码，修改了一些问题后用rollup重新打包并整理了文档。如果该工具对你有帮助，请感谢原作者；如果遇到问题，也先试下`DLTech21/ofd.js`是否复现。
## 安装与使用
```bash
npm install ofdjs --save
# or
pnpm install ofdjs --save
# or
yarn add ofdjs
``` 
```javascript
import { parseOfdDocument, renderOfd, renderOfdByScale, setPageScale, getPageScale, digestCheck } from 'ofdjs'
``` 
## 使用说明
### parseOfdDocument 解析ofd文件，renderOfd 将解析后的数据转换为dom
```javascript
  parseOfdDocument({
    ofd: file, // 类型为File 或 ArrayBuffer 或 能被get请求获取文件的 url string
    success(res) { // 解析成功回调
      const ofdObj = res[0]
      // width 为展示ofd的宽度
      const ofdDoms = renderOfd(width, ofdObj);
      // TODO：加载dom
    },
    fail(e) { // 解析失败回调
      console.error(e);
    },
  });
``` 
### getPageScale、 setPageScale 、renderOfdByScale 获取、设置缩放
放大例子
```javascript
setPageScale(++getPageScale())
const ofdDoms = renderOfdByScale(ofdObj)
// TODO：加载dom
``` 

### digestCheck 用于验证。具体用法见[DLTech21/ofd.js](https://github.com/DLTech21/ofd.js/blob/js/src/components/HelloWorld.vue#:~:text=.HashRet%20%3D-,digestCheck,-\(global.)例子

## 简单渲染例子
```javascript
import { parseOfdDocument, renderOfd } from 'ofdjs'
const [loading, setLoading] = useState(false);
const ofdview = useRef(null);
setLoading(true);
const loadOfd = {
  parseOfdDocument({
    ofd: file,
    success(res) {
      const ofdDoms = renderOfd(screenWidth, res[0]);
      displayOfdDiv(ofdDoms);
      setLoading(false);
    },
    fail(e) {
      console.error(e);
      ofdview.current.innerHTML = 'OFD文件打开失败';
      setLoading(false);
    },
  });
}
const displayOfdDiv = (divs) => {
  ofdview.current.innerHTML = '';
  for (const div of divs) {
    ofdview.current.appendChild(div);
  }
};
loadOfd();
``` 
