import {getCurrentFormattedTime} from "../utils/Utils.ts";
import tipImf1 from '@/assets/chat/tip-img-1.png'
import tipImf2 from '@/assets/chat/tip-img-2.png'
import tipImf3 from '@/assets/chat/tip-img-3.png'
import tipImf4 from '@/assets/chat/tip-img-4.png'


export var fakeMessageList = [
    {
        content: '你好，你好你好你好！',
        time: getCurrentFormattedTime(),
        isUser: true
    },
    {
        content: '你好！很高兴和你交流。有什么我可以帮助你的吗？',
        time: getCurrentFormattedTime(),
        isUser: false
    },
    {
        content: '你好！你能告诉我你的功能和能力吗？',
        time: getCurrentFormattedTime(),
        isUser: true
    },
    {
        content: '当然！作为一个基于GPT-3.5架构的语言模型，我被设计成可以提供各种语言相关的帮助和信息',
        time: getCurrentFormattedTime(),
        isUser: false
    },
    {
        content: '你能帮我解释一下"机器学习模型"是什么意思吗？',
        time: getCurrentFormattedTime(),
        isUser: true
    },
    {
        content: '当然可以！"机器学习模型"是指一种通过机器学习算法从数据中学习和推断的数学模型。它是一种使用计算机程序来自动学习和改进的工具。机器学习模型可以根据输入数据的模式和特征进行训练，然后用于进行预测、分类、识别或决策等任务。',
        time: getCurrentFormattedTime(),
        isUser: false
    },
    {
        content: '为什么vue将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接',
        time: getCurrentFormattedTime(),
        isUser: true
    },
    {
        content: '在Vue中，响应式对象是通过Vue的响应式系统来实现的。当您将响应式对象的原始类型属性解构为本地变量或将其传递给函数时，会导致响应性连接丢失的原因是，这些操作实际上是在创建对原始值的新引用，而不是对响应式对象的引用。',
        time: getCurrentFormattedTime(),
        isUser: false
    }
]

export var fakeMessageList1 = [
    {
        "id": 0,
        "content": "你好！你能告诉我你的功能和能力吗？",
        "time": "string",
        "isUser": true
    },
    {
        "id": 1,
        "content": "当然！作为一个基于GPT-3.5架构的语言模型，我被设计成可以提供各种语言相关的帮助和信息",
        "time": "string",
        "isUser": false
    },
    {
        "id": 2,
        "content": "你能帮我解释一下'机器学习模型'是什么意思吗？",
        "time": "string",
        "isUser": true
    },
    {
        "id": 3,
        "content": "当然可以！'机器学习模型'是指一种通过机器学习算法从数据中学习和推断的数学模型。它是一种使用计算机程序来自动学习和改进的工具。机器学习模型可以根据输入数据的模式和特征进行训练，然后用于进行预测、分类、识别或决策等任务。",
        "time": "string",
        "isUser": false
    }
]

export var fakeMessageList2 = [
    {
        content: '你好！你能告诉我你的功能和能力吗？',
        time: getCurrentFormattedTime(),
        isUser: true
    },
    {
        content: '当然！作为一个基于GPT-3.5架构的语言模型，我被设计成可以提供各种语言相关的帮助和信息',
        time: getCurrentFormattedTime(),
        isUser: false
    },
    {
        content: '你能帮我解释一下"机器学习模型"是什么意思吗？',
        time: getCurrentFormattedTime(),
        isUser: true
    },
    {
        content: '当然可以！"机器学习模型"是指一种通过机器学习算法从数据中学习和推断的数学模型。它是一种使用计算机程序来自动学习和改进的工具。机器学习模型可以根据输入数据的模式和特征进行训练，然后用于进行预测、分类、识别或决策等任务。',
        time: getCurrentFormattedTime(),
        isUser: false
    }
]

export var fakeHistoryList = [
    {
        content: '嗨嗨嗨请你解释一下位操作技巧解释',
        time: getCurrentFormattedTime(),
        history_id: 1
    },
    {
        content: '后门攻击解释',
        time: getCurrentFormattedTime(),
        history_id: 2
    },
    {
        content: '位操作技巧解释',
        time: getCurrentFormattedTime(),
        history_id: 3
    }
]

export var fakeHistory = [
    {
        "historyId": 0,
        "userId": 0,
        "userName": "string",
        "historyTitle": "第一个",
        "time": "string",
        "dialogueList": [
            {
                "id": 0,
                "content": "你好！你能告诉我你的功能和能力吗？",
                "time": "string",
                "isUser": true
            },
            {
                "id": 1,
                "content": "当然！作为一个基于GPT-3.5架构的语言模型，我被设计成可以提供各种语言相关的帮助和信息",
                "time": "string",
                "isUser": false
            },
            {
                "id": 2,
                "content": "你能帮我解释一下'机器学习模型'是什么意思吗？",
                "time": "string",
                "isUser": true
            },
            {
                "id": 3,
                "content": "当然可以！'机器学习模型'是指一种通过机器学习算法从数据中学习和推断的数学模型。它是一种使用计算机程序来自动学习和改进的工具。机器学习模型可以根据输入数据的模式和特征进行训练，然后用于进行预测、分类、识别或决策等任务。",
                "time": "string",
                "isUser": false
            }
        ]
    },
    {
        "historyId": 1,
        "userId": 0,
        "userName": "string",
        "historyTitle": "第二个",
        "time": "string",
        "dialogueList": [
            {
                "id": 0,
                "content": "你好，你好你好你好！",
                "time": "string",
                "isUser": true
            },
            {
                "id": 1,
                "content": "你好！很高兴和你交流。有什么我可以帮助你的吗？",
                "time": "string",
                "isUser": false
            }
        ]
    },
    {
        "historyId": 1,
        "userId": 0,
        "userName": "string",
        "historyTitle": "第三个",
        "time": "string",
        "dialogueList": [
            {
                "id": 0,
                "content": "你能帮我解释一下'机器学习模型'是什么意思吗？",
                "time": "string",
                "isUser": true
            },
            {
                "id": 1,
                "content": "当然可以！'机器学习模型'是指一种通过机器学习算法从数据中学习和推断的数学模型。它是一种使用计算机程序来自动学习和改进的工具。机器学习模型可以根据输入数据的模式和特征进行训练，然后用于进行预测、分类、识别或决策等任务。",
                "time": "string",
                "isUser": false
            },
            {
                "id": 2,
                "content": "为什么vue将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接",
                "time": "string",
                "isUser": true
            },
            {
                "id": 3,
                "content": "在Vue中，响应式对象是通过Vue的响应式系统来实现的。当您将响应式对象的原始类型属性解构为本地变量或将其传递给函数时，会导致响应性连接丢失的原因是，这些操作实际上是在创建对原始值的新引用，而不是对响应式对象的引用。",
                "time": "string",
                "isUser": false
            }
        ]
    }
]

export var fakeDialogueTipList = [
    {
        title: "向上查询",
        content: "X 公司十大股东是哪些，他们分别持有公司多少股份？",
        img: tipImf1
    },
    {
        title: "向下查询",
        content: "X 公司主要向下控股公司所属的行业是什么？",
        img: tipImf2
    },
    {
        title: "向上分析",
        content: "X 公司的股权集中度如何，是否过于集中或分散？",
        img: tipImf3
    },
    {
        title: "向下分析",
        content: "评估向 X 公司的风险状况，财务状况、行业前景？",
        img: tipImf4
    },
]

export var fakeIndexList = [
    {
        name: "标普500",
        index: 4954.23,
        ratio: +0.23
    },
    {
        name: "黄金",
        index: 2049.6,
        ratio: -0.09
    },
    {
        name: "原油",
        index: 79.16,
        ratio: +0.73
    },
    {
        name: "EURUSD",
        index: 1.0767,
        ratio: +0.12
    },
    {
        name: "USDCNY",
        index: 7.1049,
        ratio: -0.05
    },
    {
        name: "北证50",
        index: 809.702,
        ratio: -0.58
    },
    {
        name: "恒生指数",
        index: 16081.89,
        ratio: -0.34
    },
    {
        name: "标普500",
        index: 4954.23,
        ratio: +0.23
    },
    {
        name: "黄金",
        index: 2049.6,
        ratio: -0.09
    },
    {
        name: "原油",
        index: 79.16,
        ratio: +0.73
    },
    {
        name: "EURUSD",
        index: 1.0767,
        ratio: +0.12
    },
    {
        name: "USDCNY",
        index: 7.1049,
        ratio: -0.05
    },
    {
        name: "北证50",
        index: 809.702,
        ratio: -0.58
    },
    {
        name: "恒生指数",
        index: 16081.89,
        ratio: -0.34
    }
]

export var fakeTodayRecommendList = [
    {
        content: '广州放出限购调整大招，向全国买家发大户型“房票”，有业主降价百万出货'
    },
    {
        content: '广州放出限购调整大招，向全国买家发大户型“房票”，有业主降价百万出货'
    },
    {
        content: '广州放出限购调整大招，向全国买家发大户型“房票”，有业主降价百万出货'
    },
    {
        content: '广州放出限购调整大招，向全国买家发大户型“房票”，有业主降价百万出货'
    },
    {
        content: '广州放出限购调整大招，向全国买家发大户型“房票”，有业主降价百万出货'
    }
]


export var fakeLatestNewsList = [
    {
        title: '以军与哈马斯武装人员在汗尤尼斯持续交火',
        source: '同花顺7*24财经快讯',
        time: '2024-01-27 22:58:24'
    },
    {
        title: '以军与哈马斯武装人员在汗尤尼斯持续交火',
        source: '同花顺7*24财经快讯',
        time: '2024-01-27 22:58:24'
    },
    {
        title: '以军与哈马斯武装人员在汗尤尼斯持续交火',
        source: '同花顺7*24财经快讯',
        time: '2024-01-27 22:58:24'
    },
    {
        title: '以军与哈马斯武装人员在汗尤尼斯持续交火',
        source: '同花顺7*24财经快讯',
        time: '2024-01-27 22:58:24'
    },
    {
        title: '以军与哈马斯武装人员在汗尤尼斯持续交火',
        source: '同花顺7*24财经快讯',
        time: '2024-01-27 22:58:24'
    },
    {
        title: '以军与哈马斯武装人员在汗尤尼斯持续交火',
        source: '同花顺7*24财经快讯',
        time: '2024-01-27 22:58:24'
    },
    {
        title: '以军与哈马斯武装人员在汗尤尼斯持续交火',
        source: '同花顺7*24财经快讯',
        time: '2024-01-27 22:58:24'
    }
]

