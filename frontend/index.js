import React, { useState } from "react";
import ReactDOM from "react-dom";

function App() {
  // 使用useState管理输入文本和返回结果的状态
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");

  // 当用户输入时，更新输入文本的状态
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // 当用户点击提交按钮时，发送请求到后端，并更新结果状态
  const handleSubmit = async () => {
    // 向后端API发送请求，附带用户输入的文本
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: inputText }),
    });
    // 解析返回的JSON数据
    const data = await response.json();
    // 更新结果状态
    setResponseText(data.output);
  };

  // 渲染输入框、提交按钮和结果显示区域
  return (
    <div>
      <textarea onChange={handleChange} value={inputText} />
      <button onClick={handleSubmit}>Submit</button>
      <div>{responseText}</div>
    </div>
  );
}

// 渲染React应用到DOM
ReactDOM.render(<App />, document.getElementById("root"));
