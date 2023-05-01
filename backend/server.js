const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// 使用CORS中间件允许跨域请求
app.use(cors());
// 使用JSON中间件解析请求体中的JSON数据
app.use(express.json());

// 定义一个POST路由处理/api/generate请求
app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  try {
    // 调用 OpenAI API，这里需要替换成您自己的API调用代码
    const openaiResponse = await callOpenAI(input);

    // 从OpenAI API响应中提取预测结果
    const output = extractOutputFromOpenAIResponse(openaiResponse);

    // 将预测结果作为JSON响应发送给前端
    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
});

// 启动服务器，监听指定端口
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 调用OpenAI API的示例函数
// 注意：这里是一个示例，请替换成您自己的OpenAI API调用代码
async function callOpenAI(input) {
  // 在这里调用OpenAI API，获取预测结果
  // 请参考OpenAI API文档，根据您的需求编写代码
  const response = {
    choices: [
      {
        text: "This is a sample response from the OpenAI API.",
      },
    ],
  };
  return response;
}

// 从OpenAI API响应中提取预测结果的示例函数
// 注意：这里是一个示例，请根据实际OpenAI API响应结构修改代码
function extractOutputFromOpenAIResponse(response) {
  // 提取response中的预测结果文本
  return response.choices[0].text;
}
