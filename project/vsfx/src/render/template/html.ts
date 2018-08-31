const template = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="keywords" content="{##keywords##}">
    <meta name="description" content="{##description##}">
    <title>{##title##}</title>
    <script type="text/javascript" src="./js/flexible_v2.js"></script>
    <link href="../css/index.css" rel="stylesheet"></head>
</head>

<body>
<div id="app">
    <div class="sf-container">
        <header class="sf-headband"></header>
        <div class="sf-main">
            <div class="sf-left">
                <div class="sf-sidebar">
                    <div class="sf-brand">
                        <div class="sf-brand-meta">
                            <span class="sf-brand-title">天冰博客</span>
                            <span>好记性不如烂笔头</span>
                        </div>
                    </div>
                    <div class="sf-navbar">
                        <sf-left-menu></sf-left-menu>
                    </div>
                </div>
                <div class="sf-sidebar">
                    <div class="sf-author" >
                        <img :src="authorInfo.headimg || '../../../images/headimg.jpg'" >
                        <span class="sf-author-name" > {{ authorInfo.nickName }}</span>
                        <span class="sf-author-description" > {{ authorInfo.metto || '作者没有留下什么..' }}</span>
                    </div>
                </div>
                <sf-hot-article v-if="isShowArticle" :title="'热门文章'" :list="articleList"></sf-hot-article>
                <sf-hot-article v-if="isShowNote" :title="'热门短记'" :list="noteList"></sf-hot-article>
            </div>
            <div class="sf-right">
            {##content##}
            </div>
            <div style="clear:both"></div>
        </div>
        <div class="sf-footer">
            <div class="sf-footer-about">
                <div class="sf-footer-about-icons">
                    <a href="#"><img src="../../images/github.png" alt="github"/></a>
                    <a href="#"><img src="../../images/zhihu.png" alt="知乎"/></a>
                    <a href="#"><img src="../../images/juejin.png" alt="掘金"/></a>
                </div>
            </div>
            <p class="sf-footer-credit">Copyright © 2017  <strong> <a class="site-link" href="http://blog.qualc.cn/" title="天冰日记" rel="home"><span>天冰日记 - qualc </span></a></strong> - <a target="_blank" href="http://www.miibeian.gov.cn" class="external">沪ICP备16026693号 </a></p>
        </div>
    </div>
</div>
</body>

</html>`;
export default template