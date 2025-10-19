const express = require('express');
const { v4: uuidv4 } = require('uuid');
const serverSdk = require('@a2a-js/sdk/server');
const { DefaultRequestHandler, InMemoryTaskStore, RequestContext, DefaultExecutionEventBus } = serverSdk;
const expressSdk = require('@a2a-js/sdk/server/express');
const { A2AExpressApp } = expressSdk;

// 1. 定义agent的身份信息
const beijingAgentCard = {
  name: "Beijing Weather Agent",
  description: "A simple agent that provides weather information for Beijing.",
  protocolVersion: "0.3.0",
  version: "0.1.0",
  url: "http://localhost:4001/", // 北京agent服务器的公共URL
  skills: [
    { 
      id: "weather", 
      name: "Weather Query", 
      description: "Get weather information for Beijing", 
      tags: ["weather", "beijing"] 
    }
  ],
  // capabilities字段
  capabilities: {
    streaming: true,
    pushNotifications: false,
    stateTransitionHistory: true,
  },
};

// 2. 实现agent的逻辑
class BeijingWeatherExecutor {
  async execute(requestContext, eventBus) {
    // 创建直接消息响应
    const responseMessage = {
      kind: "message",
      messageId: uuidv4(),
      role: "agent",
      parts: [{ kind: "text", text: "This is the Beijing weather agent. Please use the weather skill to get weather information." }],
      contextId: requestContext.contextId,
    };

    // 发布消息并标记交互完成
    eventBus.publish(responseMessage);
    eventBus.finished();
  }
  
  // 处理天气查询技能
  async handleWeatherQuery(requestContext, eventBus) {
    try {
      // 模拟获取天气数据
      const weatherData = {
        location: 'Beijing',
        temperature: Math.floor(Math.random() * 20) + 10, // 10-30度
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
        updateTime: new Date().toLocaleString()
      };
      
      const responseMessage = {
        kind: "message",
        messageId: uuidv4(),
        role: "agent",
        parts: [{ 
          kind: "text", 
          text: JSON.stringify(weatherData, null, 2) 
        }],
        contextId: requestContext.contextId,
      };

      eventBus.publish(responseMessage);
      eventBus.finished();
    } catch (error) {
      const errorMessage = {
        kind: "message",
        messageId: uuidv4(),
        role: "agent",
        parts: [{ 
          kind: "text", 
          text: "Error getting weather information: " + error.message 
        }],
        contextId: requestContext.contextId,
      };

      eventBus.publish(errorMessage);
      eventBus.finished();
    }
  }
  
  // cancelTask对于这个简单的无状态agent不是必需的
  cancelTask = async () => {};
}

// 3. 设置和运行服务器
const agentExecutor = new BeijingWeatherExecutor();
const requestHandler = new DefaultRequestHandler(
  beijingAgentCard,
  new InMemoryTaskStore(),
  agentExecutor
);

const appBuilder = new A2AExpressApp(requestHandler);
const expressApp = appBuilder.setupRoutes(express());

// 添加自定义路由来处理天气查询
expressApp.get('/weather', async (req, res) => {
  try {
    const weatherData = {
      location: 'Beijing',
      temperature: Math.floor(Math.random() * 20) + 10, // 10-30度
      condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
      humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
      updateTime: new Date().toLocaleString()
    };
    
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get weather information' });
  }
});

expressApp.listen(4001, () => {
  console.log(`🚀 Beijing Weather Agent started on http://localhost:4001`);
});