

 ## 介绍
 本仓库是小程序前端代码，[管理后台](https://ext.dcloud.net.cn/plugin?id=8548)需要在插件市场上购买授权。

 ## 牛云资源变现专为内容/资源下载场景设计，一站式解决内容带货、流量、资源变现难题，uniCloud云开发无需购买服务器和域名，助力每一位内容创业者。



<font color=Red size=5>
限时优惠购买本程序者
</font>
<br>
<font color=Red size=5>
1.享受免费代注册
免300元微信小程序认证费</font>
<br>
<font color=Red size=5>
2.送小程序源码领域基础资源数据，上线即可运营</font>
<br>

<br>

## `我们承诺下单的客户加企业微信远程搭建一条龙技术服务，包成功上线`


<img src="https://img-blog.csdnimg.cn/fb9e159af1394662ab838c1fa0bcb91a.jpeg"   width="500px" height="500" />

#### 技术优势
基于 uniapp + uniCloud 研发，无需购买服务器和域名，uniCloud 是 DCloud 联合阿里云、腾讯云 serverless 构建。从此不用关心服务器运维、弹性扩容、大并发承载、防DDoS攻击等，轻松应对高并发应用

## `传统小程序开通流量主要求小程序累计独立访客（UV）1000以上,本项目基于uniAD,uv=0也可以开通流量主`
详情可以[了解uniAd官网](https://uniad.dcloud.net.cn/)

## 微信扫码体验小程序

<img src="https://img-blog.csdnimg.cn/380689e6c92a48b2aeae14ea35f30f69.jpeg"   width="300px" />

## 体验管理后台
## [点击进入『后台体验地址』](https://static-7d832d8c-8573-455b-bb35-53421bef9f3e.bspapp.com)

- 账号：test
- 密码：123456



<img src="https://img-blog.csdnimg.cn/d03cc6ebe4ed4d0f8447274bd11928d3.jpeg"   width="450px" height="700" />

## 功能脑图
![在这里插入图片描述](https://img-blog.csdnimg.cn/02e014365aaa458fafe3b302fb23d7c1.png#pic_center)

## 小程序截图

<img src="https://img-blog.csdnimg.cn/5bc3d4f98df0465680a29ed7d48ecf5a.jpeg"   width="600px" height="500" />



<img src="https://img-blog.csdnimg.cn/278ddd825f1a470b93dfd37449beff9d.jpeg"   width="600px" height="500" />

## 商品推广三种方式（生成海报，图文，视频）
![在这里插入图片描述](https://img-blog.csdnimg.cn/2277e5fe671c4fe69a30804da0b9b26c.jpeg#pic_center)


## 后台截图
###### 首页数据统计
![在这里插入图片描述](https://img-blog.csdnimg.cn/35baee0fb1fa4e1f9b9e7b3b6ab59129.jpeg#pic_center)

###### 基础设置
![在这里插入图片描述](https://img-blog.csdnimg.cn/3bdfb4c9ab974aecb966b2a88c98780e.png)
###### 广告设置
![在这里插入图片描述](https://img-blog.csdnimg.cn/56d41368cf754db5a9385ef0405eb2a4.png)
###### 文章和分类管理
![在这里插入图片描述](https://img-blog.csdnimg.cn/7957d20621f149ebb4362af6a2642ace.png)
## 微信官方小商店后台管理系统
![在这里插入图片描述](https://img-blog.csdnimg.cn/b1cc0e7c5d8e41468ea818e505e1bcde.png)




<font color=Red size=5>
创作不易，请勿以差评的评论方式提问，谢谢！有任何问题欢迎qq 2214904953咨询。
</font>

<br>

## 部署指南（可以加企业微信免费帮忙部署）
#### 一、部署管理后台

 1. 请确保 [HBuilderX](https://www.dcloud.io/hbuilderx.html) 更新到最新版
 2. 打开[管理后台](https://ext.dcloud.net.cn/plugin?id=8548)项目，将插件导入HBuilderX,执行命令cnpm install`HBuilderX导入的项目带有中文，必须使用cnpm install 安装依赖` [cnpm安装依赖](https://blog.csdn.net/qq_32340877/article/details/125364934)
 3. 关联 uniCloud 服务空间（[创建 uniCloud 服务空间](https://uniapp.dcloud.io/uniCloud/quickstart.html#%E5%88%9B%E5%BB%BA%E5%92%8C%E7%BB%91%E5%AE%9A%E6%9C%8D%E5%8A%A1%E7%A9%BA%E9%97%B4)，强烈建议用优秀且免费的阿里云）
 4. 找到 `uniCloud -> cloudfunctions -> common` 云函数 `uni-config-center -> uni-id -> config.json `文件 [官方文档](https://uniapp.dcloud.net.cn/uniCloud/uni-id.html#config)
 5. 修改`config.json`配置文件里面的`mp-weixin-> weixin`你自己的小程序appid和秘钥
 6. 运行 `uniCloud -> cloudfunctions`（右键：上传所有云函数、公共模块及actions）
 7. uniCloud -> database -> db_init.json 右键 初始化云数据库 
 8. 在HBuilderX顶部菜单点击 发行 -> 网站-pc Web
 9. 在弹出的对话框中勾选将编译后的资源部署到前端网页托管
 10. 点击发行，提示服务空间未开通前端网页托管，找到下面关联的服务空间点击去开通
 11. 等待项目编译部署上传成功
 12. 使用控制台输出的域名或者[uniCloud后台](https://unicloud.dcloud.net.cn/login)选择关联的云空间操作，前端网页托管 -> 参数配置 中的 `默认域名`都可访问管理后台 
 13.  管理后台账号密码
   - admin  
   - 123456
   
#### 二、部署小程序前端
 
 1. 将本项目，导入到 HBuilderX，执行命令cnpm install`HBuilderX导入的项目带有中文，必须使用cnpm install 安装依赖` [cnpm安装依赖](https://blog.csdn.net/qq_32340877/article/details/125364934)
 2. 根目录右键创建uniCloud云开发环境，右键uniCloud目录关联到与管理后台同一个服务空间
 3. 在小程序后台，开发管理中配置服务器request合法域名：`https://api.bspapp.com`,uploadFile合法域名 `https://bsppub.oss-cn-shanghai.aliyuncs.com`
 4. 在manifest.json里面修改小程序appid为自己的 [官方文档](https://uniapp.dcloud.io/collocation/manifest.html#mp-weixin)
 5. 如要`折扣充值`和`折扣影票`插件，在小程序公众后台，设置->第三方设置->插件管理中，添加“折扣充值”和“折扣影票”插件，同时需要把`manifest.json ->  mp-weixin -> plugins`注释掉的代码放开，在管理后台开启这二个轮播图即可 (个人小程序申请不了插件可忽略)
 6. 选中小程序项目在HBuilderX顶部菜单点击运行 -> 运行到微信小程序（注意控制台选择连接云端云函数，而不是本地云函数哦）
 7. 微信开发工具上传版本并提交审核

#### 扩展可选
 1. [开通微信官方或者Dcloud uniAd流量主广告](https://blog.csdn.net/qq_32340877/article/details/125440646)

 2. [开通微信官方微信小商店插件](https://blog.csdn.net/qq_32340877/article/details/125442044)




#### 特别鸣谢
- [uview前端UI框架](https://www.uviewui.com/)
- [用云后端模板](https://www.use-cloud.com/#/home)

#### 作者相关文章

[万能节日头像助手](https://nxmin.blog.csdn.net/article/details/124525217)

[反编译获取任何微信小程序源码——看这篇就够了](https://blog.csdn.net/qq_32340877/article/details/110993362) 

[零基础搭建智能垃圾分类小程序(可做毕设，可加入流量主，赚取零花钱)](https://nxmin.blog.csdn.net/article/details/121436270)

