// 从openAI API响应中提取预测结果的函数
function extractOutputFromopenAIResponse(response) {
    // 提取response中的预测结果文本
    return response.choices[0].text;
}
exports.extractOutputFromopenAIResponse = extractOutputFromopenAIResponse;
