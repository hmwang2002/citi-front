<script setup>
import backgroundImg from "@/assets/background.jpg"
import computerImg from "@/assets/computer.png"
import computerImg1 from "@/assets/computer/computer1.png"
import computerImg2 from "@/assets/computer/computer2.png"
import computerImg3 from "@/assets/computer/computer3.png"
import teamImg from "@/assets/team.jpg"

const tab = "teacher"

</script>

<template>
  <div class="main-page">
    <div class="main-page-img">
      <el-image :src="backgroundImg" style="width: 100%; height: 600px;" fit="cover"/>
      <div class="main-page-title">
        <div class="main-page-title-large-1">
          数据创造价值
        </div>
        <div class="main-page-title-large-2">
          AI引领投资
        </div>
        <div class="main-page-title-content">
          Data Creates Value, AI Leads Investment
        </div>
      </div>

    </div>
    <div class="main-page-brief">
      <div class="main-page-brief-title">
        ChatWhale股权问答平台
      </div>
      <div class="text-with-border-underline"></div>
      <div class="main-page-brief-subtitle">
        专注于股权架构分析的智能金融信息问答平台
      </div>
      <div class="main-page-brief-content">
<!--
        数据全面、及时、准确，颗粒度更细；配备强大的智能搜索、分析工具、可视化图形等功能支持在万得金融终端和Excel动态提取数据，是经济学家、策略分析师、行业研究员必备的大数据平台
-->
      </div>
    </div>
    <div class="main-page-intro">
      <div class="main-page-intro-img">
        <el-image :src="computerImg1" style="width: 400px; height: 200px" fit="contain" />
      </div>
      <div class="main-page-intro-con">
        <div class="main-page-intro-title">
          金融信息智能问答
        </div>
        <div class="main-page-intro-subtitle">
          解答金融疑云：您的全方位金融信息助手!
        </div>
        <div class="main-page-intro-content">
          ChatWhale建立了一个基于大语言模型的智能金融信息问答系统，可以通过自然语言准确理解用户意图，
        </div>
        <div class="main-page-intro-content">
          即时快速给出相关回复，为用户提供便捷快速的信息咨询服务。
        </div>
      </div>
    </div>
    <div class="main-page-intro">
      <div class="main-page-intro-con">
        <div class="main-page-intro-title">
          金融数据准确查询
        </div>
        <div class="main-page-intro-subtitle">
          洞察金融脉络：您的金融数据导航专家！
        </div>
        <div class="main-page-intro-content">
          ChatWhale整理了海量金融数据，包括Wind、Bloomberg数据库等结构化数据，以及非结构化文本如上市公司年度报告、招股书等。
        </div>
        <div class="main-page-intro-content">
          对于用户的查询需求，ChatWhale可以从数据库中准确提取出用户所需数据，无需用户手动搜索选择。
        </div>
      </div>
      <div class="main-page-intro-img">
        <el-image :src="computerImg2" style="width: 400px; height: 200px" fit="contain" />
      </div>
    </div>
    <div class="main-page-intro">
      <div class="main-page-intro-img">
        <el-image :src="computerImg3" style="width: 400px; height: 200px" fit="contain" />
      </div>
      <div class="main-page-intro-con">
        <div class="main-page-intro-title">
          股权架构识别分析
        </div>
        <div class="main-page-intro-subtitle">
          解构企业架构——您的企业深度透视专家！
        </div>
        <div class="main-page-intro-content">
          通过文本理解模块，ChatWhale能够对企业的股权架构进行识别，并且进行业务单元分类和海外实体标识。
        </div>
        <div class="main-page-intro-content">
          同时，ChatWhale还具备对股权架构的分析能力，能针对具体上市公司，提供股权分析与评价，为风险评估和控制提供重要支持。
        </div>
      </div>
    </div>
    <div class="main-page-team">
      <div class="main-page-team-title">
        关于我们
      </div>
      <div class="text-with-border-underline"></div>
      <div class="main-page-team-intro">
        <div class="main-page-team-intro-img">
          <el-image :src="teamImg" fit="fill" style="width: 400px; height: 300px"/>
        </div>
        <div class="main-page-team-intro-content">
          ChatWhale团队是一支充满活力、创造力和专业精神的团队。<br/>
          <br/>
          团队成员由南京大学本科生组成，在计算机科学、金融工程、数据挖掘和人工智能等领域拥有深厚的理论基础和实践经验。<br>
          <br/>
          团队致力于在金融信息服务领域创造突破性的解决方案，将大模型运用到金融信息查询领域。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-page{
  width: 100%;
}

.main-page-title-large-1{
  font-size: 48px;
  color: white;
  position: absolute;
  margin: -350px 0 0 100px;
}

.main-page-title-large-2{
  font-size: 48px;
  color: white;
  position: absolute;
  margin: -280px 0 0 100px;
}

.main-page-title-content{
  font-size: 24px;
  color: white;
  position: absolute;
  margin: -200px 0 0 100px;
}

.text-with-border-underline {
  border-bottom: 2px solid #1877f2; /* 下划线粗细为2px，颜色为黑色 */
  padding-bottom: 3px; /* 根据需要调整，以便在文本和下划线之间留出空间 */
  width: 40%;
  margin-left: 30%;
}

.main-page-brief-title{
  font-size: 36px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.main-page-brief-subtitle{
  font-size: 24px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page-brief-content{
  font-size: 16px;
  padding: 10px 20% 10px 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.main-page-intro{
  padding: 40px;
  display: flex;
  flex-direction: row;
}

.main-page-intro-con{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.main-page-intro-title{
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page-intro-subtitle{
  font-size: 18px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page-intro-content{
  font-size: 12px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page-team{
  align-items: center;
  justify-content: center;
}

.main-page-team-intro{
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 80%;
  height: 300px;
  margin-left: 10%;
  margin-top: 40px;
}

.main-page-team-intro-img{
  height: 300px;
}

.main-page-team-intro-content{
  align-items: center;
  justify-content: center;
  background: #EFEFEF;
  width: 100%;
  height: 300px;
  padding: 25px;
}

.main-page-team-title{
  font-size: 36px;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page-team-detail{
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-left: 10%;
  padding:20px;

}

.main-page-team-detail-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 这将在每个MemberItem之间提供等距间隔 */
}


</style>
