const { v4: uuidv4 } = require('uuid');
const { A2AClient } = require('@a2a-js/sdk/client');

// 纽约agent的URL
const NEWYORK_AGENT_URL = 'http://localhost:4002';

// 创建纽约agent客户端
const newyorkAgentClient = A2AClient.fromCardUrl(`${NEWYORK_AGENT_URL}/.well-known/agent-card.json`);

// 模拟天气查询功能
async function getWeather() {
  // 这里可以接入真实的天气API
  // 为了演示，我们返回模拟数据
  const weatherData = {
    location: 'New York',
    temperature: Math.floor(Math.random() * 30) + 50, // 50-80度
    condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
    humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
    updateTime: new Date().toLocaleString()
  };
  
  return weatherData;
}

module.exports = {
  client: newyorkAgentClient,
  getWeather,
  url: NEWYORK_AGENT_URL
};