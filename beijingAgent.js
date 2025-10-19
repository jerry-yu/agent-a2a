const { v4: uuidv4 } = require('uuid');
const { A2AClient } = require('@a2a-js/sdk/client');

// 北京agent的URL
const BEIJING_AGENT_URL = 'http://localhost:4001';

// 创建北京agent客户端
const beijingAgentClient = A2AClient.fromCardUrl(`${BEIJING_AGENT_URL}/.well-known/agent-card.json`);

// 模拟天气查询功能
async function getWeather() {
  // 这里可以接入真实的天气API
  // 为了演示，我们返回模拟数据
  const weatherData = {
    location: 'Beijing',
    temperature: Math.floor(Math.random() * 20) + 10, // 10-30度
    condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
    humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
    updateTime: new Date().toLocaleString()
  };
  
  return weatherData;
}

module.exports = {
  client: beijingAgentClient,
  getWeather,
  url: BEIJING_AGENT_URL
};