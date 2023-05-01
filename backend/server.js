const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { extractOutputFromopenAIResponse } = require("./extractOutputFromopenAIResponse");

require("dotenv").config(); // 引入 dotenv 包以加载环境变量

const app = express();

// 使用CORS中间件允许跨域请求
app.use(cors());
// 使用JSON中间件解析请求体中的JSON数据
app.use(express.json());

// 定义一个POST路由处理/api/generate请求
app.post("/api/generate", async (req, res) => {
  const { input } = req.body;

  try {
    // 调用 openAI API
    const openaiResponse = await callopenAI(input);

    // 从openAI API响应中提取预测结果
    const output = extractOutputFromopenAIResponse(openaiResponse);

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

// 调用openAI API的函数
async function callopenAI(input) {
  // 配置 axios 请求的头部，添加认证信息
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // 从环境变量中获取 API 密钥
  };

  // 根据您的需求设置 openAI API 请求参数
  const data = {
    "prompt": input,
    "max_tokens": 50, // 您可以根据需求调整此值
    "temperature": 0.7 // 您可以根据需求调整此值
  };

  try {
    // 发送请求到 openAI API
    const response = await axios.post("https://api.openai.com/v1/engines/davinci-codex/completions", data, { headers });

    // 返回 openAI API 的响应
    return response.data;
  } catch (error) {
    console.error("Error calling openAI API:", error);
    throw error;
  }
}


